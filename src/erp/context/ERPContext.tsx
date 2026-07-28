import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type {
  ERPUser, Client, Project, Transaction, TimelineEvent, Incident,
  ServiceCatalogItem, FinancialMetrics, ProductionMetrics, CommercialMetrics, QualityMetrics,
  ClientScore,
} from '../types/erpTypes';
import type { ERPMember, ERPRole } from '../types/userTypes';
import {
  MOCK_CLIENTS, MOCK_PROJECTS, MOCK_TRANSACTIONS, MOCK_TIMELINE, MOCK_INCIDENTS, SERVICE_CATALOG,
} from '../data/seedData';
import { isSupabaseConfigured, supabase, signOut as supabaseSignOut } from '../../lib/supabase';
import { useUserManagement } from '../hooks/useUserManagement';

// ─── State ───────────────────────────────────────────────────
interface ERPState {
  user: ERPUser | null;
  isAuthenticated: boolean;
  clients: Client[];
  projects: Project[];
  transactions: Transaction[];
  timeline: TimelineEvent[];
  incidents: Incident[];
  catalog: ServiceCatalogItem[];
  financialMetrics: FinancialMetrics;
  productionMetrics: ProductionMetrics;
  commercialMetrics: CommercialMetrics;
  qualityMetrics: QualityMetrics;
  loading: boolean;
  activeModule: string;
}

// ─── Actions ─────────────────────────────────────────────────
type ERPAction =
  | { type: 'SET_USER'; payload: ERPUser | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_CLIENT'; payload: Client }
  | { type: 'UPDATE_CLIENT'; payload: Client }
  | { type: 'DELETE_CLIENT'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'COMPLETE_PROJECT'; payload: string }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'ADD_TIMELINE_EVENT'; payload: TimelineEvent }
  | { type: 'ADD_INCIDENT'; payload: Incident }
  | { type: 'UPDATE_INCIDENT'; payload: Incident }
  | { type: 'SET_MODULE'; payload: string }
  | { type: 'RECALCULATE_METRICS' }
  | { type: 'INIT_DEMO' };

// ─── Helpers ─────────────────────────────────────────────────
function calculateProjectDRE(p: Project) {
  const totalCosts = Object.values(p.costs).reduce((a, b) => a + b, 0);
  const grossProfit = p.revenue - totalCosts;
  const grossMargin = p.revenue > 0 ? (grossProfit / p.revenue) * 100 : 0;
  return { totalCosts, grossProfit, grossMargin };
}

function computeClientScore(client: Client, projects: Project[], incidents: Incident[]): { score: ClientScore; points: number } {
  let points = 50;
  const clientProjects = projects.filter(p => p.clientId === client.id && p.status === 'completed');
  const clientIncidents = incidents.filter(i => i.clientId === client.id && i.category === 'client');

  // Revenue contribution
  if (client.lifetimeValue > 30000) points += 20;
  else if (client.lifetimeValue > 15000) points += 12;
  else if (client.lifetimeValue > 5000) points += 6;

  // NPS average
  const npsProjects = clientProjects.filter(p => p.nps !== undefined);
  if (npsProjects.length > 0) {
    const avgNps = npsProjects.reduce((a, p) => a + (p.nps ?? 0), 0) / npsProjects.length;
    if (avgNps >= 9) points += 15;
    else if (avgNps >= 7) points += 8;
    else if (avgNps < 6) points -= 10;
  }

  // Incidents deductions
  points -= clientIncidents.length * 5;

  // Recurrence
  if (clientProjects.length > 10) points += 10;
  else if (clientProjects.length > 5) points += 5;

  // Entry time
  const months = (Date.now() - new Date(client.entryDate).getTime()) / (1000 * 60 * 60 * 24 * 30);
  if (months > 24) points += 8;
  else if (months > 12) points += 4;

  points = Math.max(0, Math.min(100, points));

  let score: ClientScore;
  if (points >= 85) score = 'premium';
  else if (points >= 70) score = 'gold';
  else if (points >= 55) score = 'silver';
  else if (points >= 35) score = 'bronze';
  else score = 'risk';

  return { score, points };
}

function computeMetrics(projects: Project[], transactions: Transaction[], clients: Client[], incidents: Incident[]): Pick<ERPState, 'financialMetrics' | 'productionMetrics' | 'commercialMetrics' | 'qualityMetrics'> {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const monthIncomes = transactions.filter(t =>
    t.type === 'income' && t.paidAt &&
    new Date(t.paidAt).getMonth() === thisMonth &&
    new Date(t.paidAt).getFullYear() === thisYear
  );
  const monthExpenses = transactions.filter(t =>
    t.type === 'expense' && t.paidAt &&
    new Date(t.paidAt).getMonth() === thisMonth &&
    new Date(t.paidAt).getFullYear() === thisYear
  );

  const monthRevenue = monthIncomes.reduce((a, t) => a + t.amount, 0);
  const totalCosts = monthExpenses.reduce((a, t) => a + t.amount, 0);
  const netProfit = monthRevenue - totalCosts;
  const avgMargin = monthRevenue > 0 ? (netProfit / monthRevenue) * 100 : 0;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const avgTicket = monthIncomes.length > 0 ? monthRevenue / monthIncomes.length : 0;
  const receivable = transactions.filter(t => t.type === 'income' && t.status === 'pending').reduce((a, t) => a + t.amount, 0);
  const payable = transactions.filter(t => t.type === 'expense' && t.status === 'pending').reduce((a, t) => a + t.amount, 0);
  const mrr = clients.filter(c => c.status === 'active').reduce((a, c) => a + c.estimatedValue, 0);

  const completedProjects = projects.filter(p => p.status === 'completed');
  const inProgressProjects = projects.filter(p => p.status === 'in_progress' || p.status === 'checklist_pending');
  const lateProjects = projects.filter(p => {
    if (p.status !== 'in_progress') return false;
    if (!p.endDate) return false;
    return new Date(p.endDate) < now;
  });

  const totalHoursSold = projects.reduce((a, p) => a + p.hoursContracted, 0);
  const totalHoursUsed = projects.reduce((a, p) => a + p.hoursUsed, 0);
  const studioOccupancyRate = totalHoursSold > 0 ? Math.min(100, (totalHoursUsed / totalHoursSold) * 100) : 0;

  const leads = clients.filter(c => c.status === 'lead' || c.status === 'prospect').length;
  const proposals = projects.filter(p => p.status === 'negotiation' || p.status === 'draft').length;
  const conversionRate = (leads + proposals) > 0 ? (completedProjects.length / (leads + proposals + completedProjects.length)) * 100 : 0;
  const recurringClients = clients.filter(c => projects.filter(p => p.clientId === c.id && p.status === 'completed').length > 1).length;

  const npsProjects = completedProjects.filter(p => p.nps !== undefined);
  const avgNps = npsProjects.length > 0 ? npsProjects.reduce((a, p) => a + (p.nps ?? 0), 0) / npsProjects.length : 0;
  const reworks = incidents.filter(i => i.status === 'resolved').length;

  return {
    financialMetrics: {
      monthRevenue, netProfit, totalCosts, avgMargin: Math.round(avgMargin * 10) / 10,
      activeClients, avgTicket: Math.round(avgTicket),
      mrr, arr: mrr * 12, receivable, payable,
      cashFlow: monthRevenue - totalCosts, projectedProfit: netProfit * 1.1,
    },
    productionMetrics: {
      projectsInProgress: inProgressProjects.length,
      projectsCompleted: completedProjects.length,
      projectsLate: lateProjects.length,
      hoursSold: totalHoursSold,
      hoursProduced: totalHoursUsed,
      unproductiveHours: Math.max(0, totalHoursUsed - totalHoursSold),
      studioOccupancyRate: Math.round(studioOccupancyRate),
      equipmentUtilization: 75,
      teamProductivity: 88,
    },
    commercialMetrics: {
      leads, pipeline: proposals + leads, proposals,
      conversionRate: Math.round(conversionRate), negotiationValue: leads * 5000,
      recurringClients, avgClosingDays: 12,
    },
    qualityMetrics: {
      nps: Math.round(avgNps * 10) / 10,
      avgRating: 4.3, incidents: incidents.length, reworks,
      avgResolutionTime: 2.5, satisfactionIndex: 87,
    },
  };
}

// ─── Reducer ─────────────────────────────────────────────────
function erpReducer(state: ERPState, action: ERPAction): ERPState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, isAuthenticated: !!action.payload, user: action.payload };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_MODULE':
      return { ...state, activeModule: action.payload };

    case 'INIT_DEMO': {
      const metrics = computeMetrics(MOCK_PROJECTS, MOCK_TRANSACTIONS, MOCK_CLIENTS, MOCK_INCIDENTS);
      return {
        ...state,
        clients: MOCK_CLIENTS,
        projects: MOCK_PROJECTS,
        transactions: MOCK_TRANSACTIONS,
        timeline: MOCK_TIMELINE,
        incidents: MOCK_INCIDENTS,
        catalog: SERVICE_CATALOG,
        ...metrics,
        loading: false,
      };
    }

    case 'ADD_CLIENT':
      return { ...state, clients: [...state.clients, action.payload] };

    case 'UPDATE_CLIENT': {
      const clients = state.clients.map(c => c.id === action.payload.id ? action.payload : c);
      return { ...state, clients };
    }

    case 'DELETE_CLIENT':
      return { ...state, clients: state.clients.filter(c => c.id !== action.payload) };

    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };

    case 'UPDATE_PROJECT': {
      const projects = state.projects.map(p => p.id === action.payload.id ? action.payload : p);
      const metrics = computeMetrics(projects, state.transactions, state.clients, state.incidents);
      return { ...state, projects, ...metrics };
    }

    case 'COMPLETE_PROJECT': {
      // Automation chain: Complete project → update all linked modules
      const now = new Date().toISOString();
      const projects = state.projects.map(p => {
        if (p.id !== action.payload) return p;
        return { ...p, status: 'completed' as const, endDate: now.split('T')[0], updatedAt: now };
      });

      const completedProject = projects.find(p => p.id === action.payload)!;
      const client = state.clients.find(c => c.id === completedProject?.clientId);

      // Auto-add timeline event
      const newEvent: TimelineEvent = {
        id: `tl-${Date.now()}`, clientId: completedProject.clientId, projectId: action.payload,
        type: 'project', date: now.split('T')[0], time: now.split('T')[1].substring(0, 5),
        responsible: 'Sistema', description: `Projeto "${completedProject.title}" concluído automaticamente. DRE calculado.`,
        automated: true,
      };

      // Recalculate client score
      let updatedClients = state.clients;
      if (client) {
        const { score, points } = computeClientScore(client, projects, state.incidents);
        updatedClients = state.clients.map(c =>
          c.id === client.id ? { ...c, score, scorePoints: points, lifetimeValue: c.lifetimeValue + completedProject.revenue } : c
        );
      }

      const metrics = computeMetrics(projects, state.transactions, updatedClients, state.incidents);
      return {
        ...state, projects, clients: updatedClients,
        timeline: [newEvent, ...state.timeline],
        ...metrics,
      };
    }

    case 'ADD_TRANSACTION': {
      const transactions = [...state.transactions, action.payload];
      const metrics = computeMetrics(state.projects, transactions, state.clients, state.incidents);
      return { ...state, transactions, ...metrics };
    }

    case 'ADD_TIMELINE_EVENT':
      return { ...state, timeline: [action.payload, ...state.timeline] };

    case 'ADD_INCIDENT': {
      const incidents = [...state.incidents, action.payload];
      const metrics = computeMetrics(state.projects, state.transactions, state.clients, incidents);
      return { ...state, incidents, ...metrics };
    }

    case 'UPDATE_INCIDENT': {
      const incidents = state.incidents.map(i => i.id === action.payload.id ? action.payload : i);
      return { ...state, incidents };
    }

    case 'RECALCULATE_METRICS': {
      const metrics = computeMetrics(state.projects, state.transactions, state.clients, state.incidents);
      return { ...state, ...metrics };
    }

    default:
      return state;
  }
}

// ─── Initial State ───────────────────────────────────────────
const initialMetrics: Pick<ERPState, 'financialMetrics' | 'productionMetrics' | 'commercialMetrics' | 'qualityMetrics'> = {
  financialMetrics: { monthRevenue: 0, netProfit: 0, totalCosts: 0, avgMargin: 0, activeClients: 0, avgTicket: 0, mrr: 0, arr: 0, receivable: 0, payable: 0, cashFlow: 0, projectedProfit: 0 },
  productionMetrics: { projectsInProgress: 0, projectsCompleted: 0, projectsLate: 0, hoursSold: 0, hoursProduced: 0, unproductiveHours: 0, studioOccupancyRate: 0, equipmentUtilization: 0, teamProductivity: 0 },
  commercialMetrics: { leads: 0, pipeline: 0, proposals: 0, conversionRate: 0, negotiationValue: 0, recurringClients: 0, avgClosingDays: 0 },
  qualityMetrics: { nps: 0, avgRating: 0, incidents: 0, reworks: 0, avgResolutionTime: 0, satisfactionIndex: 0 },
};

const initialState: ERPState = {
  user: null, isAuthenticated: false,
  clients: [], projects: [], transactions: [], timeline: [], incidents: [], catalog: [],
  ...initialMetrics,
  loading: true,
  activeModule: 'dashboard',
};

// ─── Context ─────────────────────────────────────────────────
interface ERPContextType {
  state: ERPState;
  dispatch: React.Dispatch<ERPAction>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  completeProject: (projectId: string) => void;
  getDREForProject: (projectId: string) => ReturnType<typeof calculateProjectDRE> | null;
}

// ─── User Management Context ─────────────────────────────────
interface UserMgmtContextType {
  members: ERPMember[];
  loading: boolean;
  pendingCount: number;
  currentUser: ERPMember | null;
  registerOrFind: ReturnType<typeof useUserManagement>['registerOrFind'];
  approveMember: ReturnType<typeof useUserManagement>['approveMember'];
  rejectMember: ReturnType<typeof useUserManagement>['rejectMember'];
  suspendMember: ReturnType<typeof useUserManagement>['suspendMember'];
  changeRole: ReturnType<typeof useUserManagement>['changeRole'];
  deleteMember: ReturnType<typeof useUserManagement>['deleteMember'];
}

const UserMgmtContext = createContext<UserMgmtContextType | null>(null);

const ERPContext = createContext<ERPContextType | null>(null);

export function ERPProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(erpReducer, initialState);
  const userMgmt = useUserManagement();
  const [currentMember, setCurrentMember] = React.useState<ERPMember | null>(null);

  useEffect(() => {
    async function init() {
      dispatch({ type: 'INIT_DEMO' });

      if (isSupabaseConfigured && supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const su = session.user;
          const member = await userMgmt.registerOrFind({
            id: su.id,
            name: su.user_metadata?.full_name || su.email || 'Usuário',
            email: su.email || '',
            avatar: su.user_metadata?.avatar_url,
          });
          setCurrentMember(member);
          if (member.status === 'approved' && member.role) {
            dispatch({
              type: 'SET_USER',
              payload: {
                id: su.id,
                name: su.user_metadata?.full_name || su.email || 'Usuário',
                email: su.email || '',
                avatar: su.user_metadata?.avatar_url,
                role: member.role as ERPUser['role'],
                createdAt: su.created_at,
              },
            });
          }
        } else {
          dispatch({ type: 'SET_USER', payload: null });
        }
        supabase.auth.onAuthStateChange(async (_event, session) => {
          if (session?.user) {
            const su = session.user;
            const member = await userMgmt.registerOrFind({
              id: su.id,
              name: su.user_metadata?.full_name || su.email || 'Usuário',
              email: su.email || '',
              avatar: su.user_metadata?.avatar_url,
            });
            setCurrentMember(member);
            if (member.status === 'approved' && member.role) {
              dispatch({
                type: 'SET_USER',
                payload: {
                  id: su.id,
                  name: su.user_metadata?.full_name || su.email || 'Usuário',
                  email: su.email || '',
                  avatar: su.user_metadata?.avatar_url,
                  role: member.role as ERPUser['role'],
                  createdAt: su.created_at,
                },
              });
            }
          } else {
            setCurrentMember(null);
            dispatch({ type: 'SET_USER', payload: null });
          }
        });
      } else {
        // No active Supabase session — user starts at login screen
        dispatch({ type: 'SET_USER', payload: null });
      }
    }
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-sync currentMember when members list changes (after approval)
  useEffect(() => {
    if (!state.user) return;
    const found = userMgmt.members.find(m => m.id === state.user?.id || m.email === state.user?.email);
    if (found) setCurrentMember(found);
  }, [userMgmt.members, state.user]);

  const signIn = useCallback(async () => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/erp` } });
      if (error) console.error(error);
    } else {
      const member = await userMgmt.registerOrFind({ id: 'demo', name: 'Admin Vencer', email: 'vencerhub@gmail.com' });
      setCurrentMember(member);
      dispatch({ type: 'SET_USER', payload: { id: 'demo', name: 'Admin Vencer', email: 'vencerhub@gmail.com', role: 'admin', createdAt: new Date().toISOString() } });
    }
  }, [userMgmt]);

  const signOutFn = useCallback(async () => {
    await supabaseSignOut();
    setCurrentMember(null);
    dispatch({ type: 'SET_USER', payload: null });
  }, []);

  const completeProject = useCallback((projectId: string) => {
    dispatch({ type: 'COMPLETE_PROJECT', payload: projectId });
  }, []);

  const getDREForProject = useCallback((projectId: string) => {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return null;
    return calculateProjectDRE(project);
  }, [state.projects]);

  return (
    <UserMgmtContext.Provider value={{
      members: userMgmt.members,
      loading: userMgmt.loading,
      pendingCount: userMgmt.pendingCount,
      currentUser: currentMember,
      registerOrFind: userMgmt.registerOrFind,
      approveMember: userMgmt.approveMember,
      rejectMember: userMgmt.rejectMember,
      suspendMember: userMgmt.suspendMember,
      changeRole: userMgmt.changeRole,
      deleteMember: userMgmt.deleteMember,
    }}>
      <ERPContext.Provider value={{ state, dispatch, signIn, signOut: signOutFn, completeProject, getDREForProject }}>
        {children}
      </ERPContext.Provider>
    </UserMgmtContext.Provider>
  );
}

export function useERP() {
  const ctx = useContext(ERPContext);
  if (!ctx) throw new Error('useERP must be used inside ERPProvider');
  return ctx;
}

export function useUserMgmt() {
  const ctx = useContext(UserMgmtContext);
  if (!ctx) throw new Error('useUserMgmt must be used inside ERPProvider');
  return ctx;
}
