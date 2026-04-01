export interface FamilyMember {
  nome: string;
  dataNascimento: string;
  parentesco: string;
}

export interface CadastroPCD {
  id: string;
  createdAt: string;

  // Bloco 1 - Dados do Requerente
  nomeCompleto: string;
  sexo: string;
  filiacao: string;
  dataNascimento: string;
  naturalidade: string;
  cpf: string;
  estadoCivil: string;
  tipoSanguineo: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  telefoneProprio: string;
  telefoneRecados: string;
  email: string;

  // Bloco 2 - Responsável Legal
  possuiResponsavel: boolean;
  responsavelNome: string;
  responsavelTelefone: string;

  // Bloco 3 - Deficiência
  tipoDeficiencia: string[];
  tipoDeficienciaOutros: string;
  cid: string;
  grauDeficiencia: string;
  dataLaudo: string;
  medicoNome: string;
  medicoCRM: string;
  usaTecnologiaAssistiva: boolean;
  tecnologiaAssistivaQual: string;
  participaEntidade: boolean;
  entidadeQual: string;

  // Bloco 4 - Informações Adicionais
  escolaridade: string;
  ocupacao: string;
  recebeBPC: boolean;
  rendaFamiliar: string;

  // Bloco 5 - Composição Familiar
  composicaoFamiliar: FamilyMember[];

  // Bloco 6 - Documentos (base64)
  docRG: string;
  docComprovante: string;
  docLaudo: string;

  // Bloco 7 - Declaração
  consentimentoCidade: string;
  consentimentoData: string;
  consentimentoNome: string;
  consentimento: boolean;
}

const STORAGE_KEY = "cmpcd_cadastros";

export function getCadastros(): CadastroPCD[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCadastro(cadastro: Omit<CadastroPCD, "id" | "createdAt">): CadastroPCD {
  const cadastros = getCadastros();
  const newCadastro: CadastroPCD = {
    ...cadastro,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  cadastros.push(newCadastro);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cadastros));
  return newCadastro;
}

export function updateCadastro(id: string, data: Partial<Omit<CadastroPCD, "id" | "createdAt">>): CadastroPCD | null {
  const cadastros = getCadastros();
  const index = cadastros.findIndex((c) => c.id === id);
  if (index === -1) return null;
  cadastros[index] = { ...cadastros[index], ...data };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cadastros));
  return cadastros[index];
}

export function deleteCadastro(id: string) {
  const cadastros = getCadastros().filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cadastros));
}
