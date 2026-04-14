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

function seedDemoData() {
  const demo: CadastroPCD = {
    id: "demo-001",
    createdAt: "2026-04-14T12:00:00.000Z",
    nomeCompleto: "Maria Silva Santos",
    sexo: "Feminino",
    filiacao: "João Santos e Ana Silva",
    dataNascimento: "1990-03-15",
    naturalidade: "Jaú - SP",
    cpf: "123.456.789-00",
    estadoCivil: "Solteiro(a)",
    tipoSanguineo: "O+",
    endereco: "Rua das Flores",
    numero: "123",
    bairro: "Centro",
    cidade: "Jaú",
    uf: "SP",
    cep: "17210-000",
    telefoneProprio: "(14) 99999-1234",
    telefoneRecados: "(14) 99888-5678",
    email: "maria.silva@email.com",
    possuiResponsavel: false,
    responsavelNome: "",
    responsavelTelefone: "",
    tipoDeficiencia: ["Física"],
    tipoDeficienciaOutros: "",
    cid: "G80.0",
    grauDeficiencia: "Moderado",
    dataLaudo: "2025-06-10",
    medicoNome: "Dr. Carlos Ferreira",
    medicoCRM: "CRM/SP 54321",
    usaTecnologiaAssistiva: true,
    tecnologiaAssistivaQual: "Cadeira de rodas motorizada",
    participaEntidade: true,
    entidadeQual: "APAE Jaú",
    escolaridade: "Ensino Médio Completo",
    ocupacao: "Artesã",
    recebeBPC: true,
    rendaFamiliar: "1 a 2 salários mínimos",
    composicaoFamiliar: [
      { nome: "João Santos", dataNascimento: "1960-01-20", parentesco: "Pai" },
      { nome: "Ana Silva", dataNascimento: "1962-05-10", parentesco: "Mãe" },
    ],
    docRG: "",
    docComprovante: "",
    docLaudo: "",
    consentimentoCidade: "Jaú",
    consentimentoData: "2026-04-14",
    consentimentoNome: "Maria Silva Santos",
    consentimento: true,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([demo]));
}

export function getCadastros(): CadastroPCD[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored || stored === "[]") {
    seedDemoData();
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  }
  return JSON.parse(stored);
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
