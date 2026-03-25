export interface AdminUser {
  id: string;
  username: string;
  password: string;
  name: string;
  role: "admin_total" | "admin_parcial";
  createdAt: string;
}

const STORAGE_KEY = "cmpcd_admin_users";
const SESSION_KEY = "cmpcd_admin_session";

const defaultUsers: AdminUser[] = [
  {
    id: "1",
    username: "admin",
    password: "admin",
    name: "Administrador",
    role: "admin_total",
    createdAt: new Date().toISOString(),
  },
];

export function getUsers(): AdminUser[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  return JSON.parse(stored);
}

function saveUsers(users: AdminUser[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function authenticate(username: string, password: string): AdminUser | null {
  const users = getUsers();
  return users.find((u) => u.username === username && u.password === password) || null;
}

export function getSession(): AdminUser | null {
  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) return null;
  return JSON.parse(stored);
}

export function setSession(user: AdminUser) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function createUser(user: Omit<AdminUser, "id" | "createdAt">): AdminUser {
  const users = getUsers();
  if (users.some((u) => u.username === user.username)) {
    throw new Error("Nome de usuário já existe.");
  }
  const newUser: AdminUser = {
    ...user,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function deleteUser(id: string) {
  const users = getUsers().filter((u) => u.id !== id);
  saveUsers(users);
}

export const roleLabels: Record<AdminUser["role"], string> = {
  admin_total: "Admin Total",
  admin_parcial: "Admin Parcial",
};
