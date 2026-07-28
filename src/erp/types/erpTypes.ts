// ============================================================
// VENCER ERP — Core TypeScript Types
// ============================================================

// ─── Auth & Users ───────────────────────────────────────────
export interface ERPUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
}

export type UserRole = 'admin' | 'manager' | 'financial' | 'operator';

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Diretoria',
  manager: 'Gerente de Produção',
  financial: 'Financeiro',
  operator: 'Operador/Técnico',
};

// ─── Clients / CRM ──────────────────────────────────────────
export interface Client {
  id: string;
  name: string;
  company: string;
  cnpj?: string;
  cpf?: string;
  address?: string;
  phone: string;
  whatsapp?: string;
  email: string;
  instagram?: string;
  linkedin?: string;
  website?: string;
  responsible: string;
  origin: ClientOrigin;
  segment: string;
  status: ClientStatus;
  entryDate: string;
  estimatedValue: number;
  lifetimeValue: number;
  score?: ClientScore;
  scorePoints?: number;
  notes?: string;
  documents?: Attachment[];
  tags?: string[];
}

export type ClientStatus = 'active' | 'inactive' | 'lead' | 'prospect' | 'churned';
export type ClientOrigin = 'instagram' | 'referral' | 'google' | 'outbound' | 'event' | 'site' | 'other';
export type ClientScore = 'premium' | 'gold' | 'silver' | 'bronze' | 'risk';

export const CLIENT_STATUS_LABELS: Record<ClientStatus, string> = {
  active: 'Ativo',
  inactive: 'Inativo',
  lead: 'Lead',
  prospect: 'Prospect',
  churned: 'Cancelado',
};

export const CLIENT_SCORE_LABELS: Record<ClientScore, string> = {
  premium: 'Premium',
  gold: 'Ouro',
  silver: 'Prata',
  bronze: 'Bronze',
  risk: 'Risco',
};

// ─── Projects & Services ────────────────────────────────────
export type ServiceType =
  | 'podcast'
  | 'event'
  | 'course'
  | 'coverage'
  | 'content'
  | 'identity'
  | 'live'
  | 'consulting'
  | 'video'
  | 'photo'
  | 'drone';

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  podcast: 'Podcast',
  event: 'Evento',
  course: 'Curso Online',
  coverage: 'Cobertura',
  content: 'Produção de Conteúdo',
  identity: 'Identidade Visual',
  live: 'Transmissão ao Vivo',
  consulting: 'Consultoria',
  video: 'Vídeo & Edição',
  photo: 'Fotografia',
  drone: 'Drone',
};

export type ProjectStatus = 'draft' | 'negotiation' | 'approved' | 'in_progress' | 'checklist_pending' | 'completed' | 'cancelled';

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: 'Rascunho',
  negotiation: 'Em Negociação',
  approved: 'Aprovado',
  in_progress: 'Em Andamento',
  checklist_pending: 'Aguardando Checklist',
  completed: 'Concluído',
  cancelled: 'Cancelado',
};

export interface Project {
  id: string;
  clientId: string;
  title: string;
  serviceType: ServiceType;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  hoursContracted: number;
  hoursUsed: number;
  revenue: number;
  costs: ProjectCosts;
  team: TeamMember[];
  freelancers: FreelancerAllocation[];
  checklist?: PostProductionChecklist;
  incidents: Incident[];
  attachments?: Attachment[];
  notes?: string;
  nps?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCosts {
  freelancers: number;
  taxes: number;
  equipment: number;
  depreciation: number;
  energy: number;
  internet: number;
  software: number;
  fuel: number;
  food: number;
  accommodation: number;
  transport: number;
  other: number;
}

export const EMPTY_COSTS: ProjectCosts = {
  freelancers: 0,
  taxes: 0,
  equipment: 0,
  depreciation: 0,
  energy: 0,
  internet: 0,
  software: 0,
  fuel: 0,
  food: 0,
  accommodation: 0,
  transport: 0,
  other: 0,
};

// ─── Team & Freelancers ─────────────────────────────────────
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  hourlyRate: number;
  avatar?: string;
}

export interface FreelancerAllocation {
  freelancerId: string;
  name: string;
  role: string;
  hours: number;
  rate: number;
  total: number;
}

// ─── Timeline ───────────────────────────────────────────────
export type TimelineEventType =
  | 'first_contact' | 'meeting' | 'call' | 'message' | 'proposal'
  | 'contract' | 'payment' | 'project' | 'complaint' | 'rework'
  | 'incident' | 'renewal' | 'cancellation' | 'nps' | 'note';

export const TIMELINE_EVENT_LABELS: Record<TimelineEventType, string> = {
  first_contact: 'Primeiro Contato',
  meeting: 'Reunião',
  call: 'Ligação',
  message: 'Mensagem',
  proposal: 'Proposta',
  contract: 'Contrato',
  payment: 'Pagamento',
  project: 'Projeto',
  complaint: 'Reclamação',
  rework: 'Retrabalho',
  incident: 'Ocorrência',
  renewal: 'Renovação',
  cancellation: 'Cancelamento',
  nps: 'NPS / Feedback',
  note: 'Anotação',
};

export interface TimelineEvent {
  id: string;
  clientId: string;
  projectId?: string;
  type: TimelineEventType;
  date: string;
  time: string;
  responsible: string;
  description: string;
  attachments?: Attachment[];
  comments?: string[];
  automated?: boolean;
}

// ─── Checklist Pós-Produção ─────────────────────────────────
export interface PostProductionChecklist {
  id: string;
  projectId: string;
  completedAt?: string;
  completedBy?: string;
  // Operação
  equipmentWorked: boolean;
  equipmentProblem?: string;
  timeLost: number; // minutes
  issueDescription?: string;
  // Cliente
  clientLate: boolean;
  clientChangedBrief: boolean;
  clientRequestedChanges: boolean;
  clientApprovedQuickly: boolean;
  clientPunctuality: 1 | 2 | 3 | 4 | 5;
  // Estrutura
  coffee: boolean;
  water: boolean;
  internet: boolean;
  bathroom: boolean;
  ac: boolean;
  cleanliness: 1 | 2 | 3 | 4 | 5;
  organization: 1 | 2 | 3 | 4 | 5;
  // Equipe
  teamPunctuality: boolean;
  freelancerMissed: boolean;
  substitution: boolean;
  overtime: number; // hours
  teamRating: 1 | 2 | 3 | 4 | 5;
  // Produção
  rework: boolean;
  newRecording: boolean;
  productionTimeLost: number;
  corruptedFiles: boolean;
  technicalFailures: boolean;
  // Cliente Feedback
  npsScore: number; // 0-10
  clientNote: 1 | 2 | 3 | 4 | 5;
  wouldRecommend: boolean;
  wouldReturn: boolean;
  clientComments?: string;
}

// ─── Incidents ──────────────────────────────────────────────
export type IncidentCategory =
  | 'equipment' | 'client' | 'team' | 'supplier' | 'financial'
  | 'infrastructure' | 'communication' | 'deadline' | 'technology' | 'operational';

export type IncidentImpact = 'low' | 'medium' | 'high' | 'critical';
export type IncidentStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface Incident {
  id: string;
  projectId?: string;
  clientId?: string;
  description: string;
  category: IncidentCategory;
  impact: IncidentImpact;
  timeLost: number; // minutes
  financialImpact?: number;
  responsible: string;
  solution?: string;
  date: string;
  attachments?: Attachment[];
  status: IncidentStatus;
}

// ─── Financial ──────────────────────────────────────────────
export interface Transaction {
  id: string;
  projectId?: string;
  clientId?: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: string;
  dueDate?: string;
  paidAt?: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  method?: 'pix' | 'card' | 'bank_transfer' | 'cash' | 'other';
}

export interface DRE {
  projectId: string;
  revenue: number;
  totalCosts: number;
  grossProfit: number;
  grossMargin: number;
  netProfit: number;
  netMargin: number;
  breakdown: ProjectCosts;
}

// ─── Service Catalog ────────────────────────────────────────
export interface ServiceCatalogItem {
  id: string;
  name: string;
  type: ServiceType;
  basePrice: number;
  packages: ServicePackage[];
  description?: string;
  active: boolean;
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  hoursIncluded: number;
  description?: string;
}

// ─── Dashboard Metrics ──────────────────────────────────────
export interface FinancialMetrics {
  monthRevenue: number;
  netProfit: number;
  totalCosts: number;
  avgMargin: number;
  activeClients: number;
  avgTicket: number;
  mrr: number;
  arr: number;
  receivable: number;
  payable: number;
  cashFlow: number;
  projectedProfit: number;
}

export interface ProductionMetrics {
  projectsInProgress: number;
  projectsCompleted: number;
  projectsLate: number;
  hoursSold: number;
  hoursProduced: number;
  unproductiveHours: number;
  studioOccupancyRate: number;
  equipmentUtilization: number;
  teamProductivity: number;
}

export interface CommercialMetrics {
  leads: number;
  pipeline: number;
  proposals: number;
  conversionRate: number;
  negotiationValue: number;
  recurringClients: number;
  avgClosingDays: number;
}

export interface QualityMetrics {
  nps: number;
  avgRating: number;
  incidents: number;
  reworks: number;
  avgResolutionTime: number;
  satisfactionIndex: number;
}

// ─── Shared ──────────────────────────────────────────────────
export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size?: number;
  uploadedAt: string;
}

export const COST_LABELS: Record<keyof ProjectCosts, string> = {
  freelancers: 'Freelancers',
  taxes: 'Impostos',
  equipment: 'Equipamentos',
  depreciation: 'Depreciação',
  energy: 'Energia',
  internet: 'Internet',
  software: 'Softwares',
  fuel: 'Gasolina',
  food: 'Alimentação',
  accommodation: 'Hospedagem',
  transport: 'Deslocamento',
  other: 'Outros',
};

export const INCIDENT_CATEGORY_LABELS: Record<IncidentCategory, string> = {
  equipment: 'Equipamento',
  client: 'Cliente',
  team: 'Equipe',
  supplier: 'Fornecedor',
  financial: 'Financeiro',
  infrastructure: 'Infraestrutura',
  communication: 'Comunicação',
  deadline: 'Prazo',
  technology: 'Tecnologia',
  operational: 'Operacional',
};

export const INCIDENT_IMPACT_LABELS: Record<IncidentImpact, string> = {
  low: 'Baixo',
  medium: 'Médio',
  high: 'Alto',
  critical: 'Crítico',
};
