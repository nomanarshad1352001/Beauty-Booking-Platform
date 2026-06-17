import { create } from 'zustand';
import { Toast, ToastType } from '@/lib/types';

interface ToastState {
  toasts: Toast[];
  addToast: (type: ToastType, title: string, description?: string) => void;
  removeToast: (id: string) => void;
}

let toastCounter = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  addToast: (type, title, description) => {
    const id = `toast_${++toastCounter}`;
    const toast: Toast = { id, type, title, description };

    set((state) => ({ toasts: [...state.toasts, toast] }));

    // Auto-remove after 4 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
