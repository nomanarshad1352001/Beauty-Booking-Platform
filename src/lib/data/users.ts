import { User } from '@/lib/types';

export const users: User[] = [
  {
    id: 'usr_001',
    email: 'admin@demo.com',
    name: 'Sophia Laurent',
    role: 'admin',
    isActive: true,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-06-15T14:30:00Z',
  },
  {
    id: 'usr_002',
    email: 'user@demo.com',
    name: 'Marcus Chen',
    role: 'manager',
    isActive: true,
    createdAt: '2024-02-20T10:15:00Z',
    updatedAt: '2024-06-10T09:00:00Z',
  },
];

/** Credential map for mock authentication */
export const credentials: Record<string, { password: string; userId: string }> = {
  'admin@demo.com': { password: 'demo1234', userId: 'usr_001' },
  'user@demo.com': { password: 'demo1234', userId: 'usr_002' },
};
