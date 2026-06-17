import { create } from 'zustand';
import { User } from '@/lib/types';
import { users, credentials } from '@/lib/data/users';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  initialize: () => void;
}

const AUTH_STORAGE_KEY = 'solve_auth_user';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (email: string, password: string) => {
    const cred = credentials[email];
    if (!cred || cred.password !== password) {
      return { success: false, error: 'Invalid email or password' };
    }
    const user = users.find((u) => u.id === cred.userId);
    if (!user) {
      return { success: false, error: 'User account not found' };
    }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    set({ user, isAuthenticated: true });
    return { success: true };
  },

  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    set({ user: null, isAuthenticated: false });
  },

  initialize: () => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const user = JSON.parse(stored) as User;
        set({ user, isAuthenticated: true });
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  },
}));
