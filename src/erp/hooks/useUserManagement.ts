import { useState, useEffect, useCallback } from 'react';
import type { ERPMember, ERPRole } from '../types/userTypes';
import { ADMIN_MASTER_EMAIL, MEMBERS_STORAGE_KEY } from '../types/userTypes';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

// ─── Supabase helpers (graceful degradation to localStorage) ─
async function loadMembersFromSupabase(): Promise<ERPMember[] | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase.from('erp_members').select('*');
    if (error) return null;
    return data as ERPMember[];
  } catch {
    return null;
  }
}

async function saveMemberToSupabase(member: ERPMember): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase.from('erp_members').upsert(member);
    return !error;
  } catch {
    return false;
  }
}

// ─── LocalStorage fallback ────────────────────────────────────
function loadFromStorage(): ERPMember[] {
  try {
    const raw = localStorage.getItem(MEMBERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(members: ERPMember[]) {
  try {
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(members));
  } catch {}
}

// ─── Hook ─────────────────────────────────────────────────────
export function useUserManagement() {
  const [members, setMembers] = useState<ERPMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const remote = await loadMembersFromSupabase();
      if (remote !== null) {
        setMembers(remote);
        saveToStorage(remote);
      } else {
        setMembers(loadFromStorage());
      }
      setLoading(false);
    }
    load();
  }, []);

  const persistMembers = useCallback((updated: ERPMember[]) => {
    setMembers(updated);
    saveToStorage(updated);
  }, []);

  // Register or find a user after Google login
  const registerOrFind = useCallback(async (user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }): Promise<ERPMember> => {
    const current = loadFromStorage();

    // Admin master: always approved with admin role
    const isAdminMaster = user.email.toLowerCase() === ADMIN_MASTER_EMAIL.toLowerCase();

    const existing = current.find(m => m.id === user.id || m.email === user.email);
    if (existing) {
      // Update name/avatar if changed
      const updated = { ...existing, name: user.name, avatar: user.avatar };
      if (isAdminMaster && existing.status !== 'approved') {
        updated.status = 'approved';
        updated.role = 'admin';
      }
      const newList = current.map(m => m.id === existing.id ? updated : m);
      persistMembers(newList);
      saveMemberToSupabase(updated);
      return updated;
    }

    // New member
    const newMember: ERPMember = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      status: isAdminMaster ? 'approved' : 'pending',
      role: isAdminMaster ? 'admin' : undefined,
      requestedAt: new Date().toISOString(),
      approvedAt: isAdminMaster ? new Date().toISOString() : undefined,
      approvedBy: isAdminMaster ? 'Sistema' : undefined,
    };

    const newList = [...current, newMember];
    persistMembers(newList);
    saveMemberToSupabase(newMember);
    return newMember;
  }, [persistMembers]);

  const approveMember = useCallback((memberId: string, role: ERPRole, approverName: string, notes?: string) => {
    const updated = members.map(m => {
      if (m.id !== memberId) return m;
      const approved: ERPMember = {
        ...m,
        status: 'approved',
        role,
        approvedAt: new Date().toISOString(),
        approvedBy: approverName,
        notes,
      };
      saveMemberToSupabase(approved);
      return approved;
    });
    persistMembers(updated);
  }, [members, persistMembers]);

  const rejectMember = useCallback((memberId: string, notes?: string) => {
    const updated = members.map(m => {
      if (m.id !== memberId) return m;
      const rejected: ERPMember = { ...m, status: 'rejected', notes };
      saveMemberToSupabase(rejected);
      return rejected;
    });
    persistMembers(updated);
  }, [members, persistMembers]);

  const suspendMember = useCallback((memberId: string) => {
    const updated = members.map(m => {
      if (m.id !== memberId) return m;
      const suspended: ERPMember = { ...m, status: 'suspended' };
      saveMemberToSupabase(suspended);
      return suspended;
    });
    persistMembers(updated);
  }, [members, persistMembers]);

  const changeRole = useCallback((memberId: string, role: ERPRole) => {
    const updated = members.map(m => {
      if (m.id !== memberId) return m;
      const changed: ERPMember = { ...m, role };
      saveMemberToSupabase(changed);
      return changed;
    });
    persistMembers(updated);
  }, [members, persistMembers]);

  const deleteMember = useCallback(async (memberId: string) => {
    const updated = members.filter(m => m.id !== memberId);
    persistMembers(updated);
    if (isSupabaseConfigured && supabase) {
      await supabase.from('erp_members').delete().eq('id', memberId);
    }
  }, [members, persistMembers]);

  const getMember = useCallback((id: string) => members.find(m => m.id === id), [members]);

  const pendingCount = members.filter(m => m.status === 'pending').length;

  return {
    members, loading, pendingCount,
    registerOrFind, approveMember, rejectMember, suspendMember, changeRole, deleteMember, getMember,
  };
}
