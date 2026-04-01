export interface Presidente {
  id: string;
  nome: string;
  foto: string;
  descricao: string;
  ordem: number;
}

export interface MembroConselho {
  id: string;
  nome: string;
  cargo: string;
  foto: string;
  ordem: number;
}

export interface EstruturaItem {
  id: string;
  titulo: string;
  nivel: number; // 0 = topo, 1, 2...
  ordem: number;
}

const PRESIDENTES_KEY = "cmpcd_presidentes";
const MEMBROS_KEY = "cmpcd_membros";
const ESTRUTURA_KEY = "cmpcd_estrutura";

const defaultPresidentes: Presidente[] = [
  { id: "1", nome: "José Antônio Ferreira", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", descricao: "Primeiro presidente do CMPCD Jaú. Responsável pela fundação do conselho e implementação das primeiras políticas de acessibilidade no município.", ordem: 1 },
  { id: "2", nome: "Marta Regina Souza", foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", descricao: "Ampliou parcerias com entidades assistenciais e criou programas de capacitação profissional para pessoas com deficiência.", ordem: 2 },
  { id: "3", nome: "Ricardo Almeida Santos", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", descricao: "Liderou a implementação do cadastro municipal de PCDs e fortaleceu a fiscalização de acessibilidade em espaços públicos.", ordem: 3 },
];

const defaultMembros: MembroConselho[] = [
  { id: "1", nome: "Maria Silva", cargo: "Presidente", foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", ordem: 1 },
  { id: "2", nome: "João Santos", cargo: "Vice-Presidente", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", ordem: 2 },
  { id: "3", nome: "Ana Costa", cargo: "Secretária", foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", ordem: 3 },
  { id: "4", nome: "Carlos Oliveira", cargo: "Conselheiro", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", ordem: 4 },
  { id: "5", nome: "Lucia Pereira", cargo: "Conselheira", foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face", ordem: 5 },
  { id: "6", nome: "Roberto Lima", cargo: "Conselheiro", foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face", ordem: 6 },
];

const defaultEstrutura: EstruturaItem[] = [
  { id: "1", titulo: "Prefeitura Municipal de Jaú", nivel: 0, ordem: 1 },
  { id: "2", titulo: "Secretaria de Assistência e Desenvolvimento Social", nivel: 1, ordem: 2 },
  { id: "3", titulo: "CMPCD Jaú", nivel: 2, ordem: 3 },
  { id: "4", titulo: "Presidência", nivel: 3, ordem: 4 },
  { id: "5", titulo: "Vice-Presidência", nivel: 3, ordem: 5 },
  { id: "6", titulo: "Secretaria", nivel: 3, ordem: 6 },
  { id: "7", titulo: "Conselheiros", nivel: 3, ordem: 7 },
];

function getOrInit<T>(key: string, defaults: T[]): T[] {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaults));
    return defaults;
  }
  return JSON.parse(stored);
}

function save<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Presidentes
export const getPresidentes = () => getOrInit(PRESIDENTES_KEY, defaultPresidentes);
export function savePresidente(p: Omit<Presidente, "id">): Presidente {
  const list = getPresidentes();
  const item = { ...p, id: crypto.randomUUID() };
  list.push(item);
  save(PRESIDENTES_KEY, list);
  return item;
}
export function updatePresidente(id: string, data: Partial<Presidente>) {
  const list = getPresidentes().map((p) => (p.id === id ? { ...p, ...data } : p));
  save(PRESIDENTES_KEY, list);
}
export function deletePresidente(id: string) {
  save(PRESIDENTES_KEY, getPresidentes().filter((p) => p.id !== id));
}

// Membros
export const getMembros = () => getOrInit(MEMBROS_KEY, defaultMembros);
export function saveMembro(m: Omit<MembroConselho, "id">): MembroConselho {
  const list = getMembros();
  const item = { ...m, id: crypto.randomUUID() };
  list.push(item);
  save(MEMBROS_KEY, list);
  return item;
}
export function updateMembro(id: string, data: Partial<MembroConselho>) {
  const list = getMembros().map((m) => (m.id === id ? { ...m, ...data } : m));
  save(MEMBROS_KEY, list);
}
export function deleteMembro(id: string) {
  save(MEMBROS_KEY, getMembros().filter((m) => m.id !== id));
}

// Estrutura
export const getEstrutura = () => getOrInit(ESTRUTURA_KEY, defaultEstrutura);
export function saveEstruturaItem(item: Omit<EstruturaItem, "id">): EstruturaItem {
  const list = getEstrutura();
  const newItem = { ...item, id: crypto.randomUUID() };
  list.push(newItem);
  save(ESTRUTURA_KEY, list);
  return newItem;
}
export function updateEstruturaItem(id: string, data: Partial<EstruturaItem>) {
  const list = getEstrutura().map((e) => (e.id === id ? { ...e, ...data } : e));
  save(ESTRUTURA_KEY, list);
}
export function deleteEstruturaItem(id: string) {
  save(ESTRUTURA_KEY, getEstrutura().filter((e) => e.id !== id));
}
