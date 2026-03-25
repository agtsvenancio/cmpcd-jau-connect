

## Plan: Formulario PCD completo + Reestruturacao do Admin

### Resumo

Duas mudancas principais:
1. **Formulario de Cadastro PCD** -- implementar o formulario completo baseado no documento oficial da Prefeitura de Jahu, com todos os 7 blocos de campos
2. **Admin simplificado para 2 perfis** -- "Admin Total" (dashboard + lista de cadastrados + gestao de usuarios) e "Admin Parcial" (somente dashboard)

---

### 1. Formulario de Cadastro PCD (`src/pages/CadastroPCD.tsx`)

Substituir o placeholder atual por um formulario funcional com os blocos do documento oficial:

**Bloco 1 -- Dados do Requerente:** Nome completo, Sexo, Filiacao, Data de nascimento, Naturalidade, CPF (com mascara), Estado civil, Tipo sanguineo, Endereco, Numero, Bairro, Cidade, UF, CEP (com mascara), Telefone proprio (com mascara), Telefone para recados, E-mail

**Bloco 2 -- Responsavel Legal/Cuidador:** Nome completo, Telefone (condicional, so aparece se marcar "possui responsavel")

**Bloco 3 -- Informacoes sobre a Deficiencia:** Tipo de deficiencia (checkboxes: Fisica, Auditiva, Visual, Intelectual, Multipla, TEA, Outros + campo descritivo), CID, Grau (Leve/Moderado/Grave), Data do laudo, Medico, CRM, Usa tecnologia assistiva (Sim/Nao + qual), Participa de entidade (Sim/Nao + qual)

**Bloco 4 -- Informacoes Adicionais:** Escolaridade (radio), Ocupacao (radio: Trabalhador/Estudante/Aposentado), Recebe BPC/LOAS (Sim/Nao), Renda familiar (radio)

**Bloco 5 -- Composicao Familiar:** Lista dinamica com botao "Adicionar pessoa" -- campos: Nome, Data de nascimento, Parentesco

**Bloco 6 -- Documentos:** Upload de RG, Comprovante de residencia, Laudo medico (PDF/JPG/PNG, max 5MB). Salvos em localStorage temporariamente como base64.

**Bloco 7 -- Declaracao e Consentimento:** Texto legal, campos Cidade/Data, nome do assinante, checkbox obrigatorio de consentimento.

Os dados serao salvos em `localStorage` (chave `cmpcd_cadastros`) ate o backend ser ativado. Validacao com mascaras de CPF/CEP/telefone e campos obrigatorios.

---

### 2. Reestruturacao do Admin

**Simplificar roles para 2 tipos:**

- `admin_total` -- ve Dashboard + Lista de Cadastrados (com todos os dados) + Gestao de Usuarios
- `admin_parcial` -- ve somente o Dashboard

**Arquivos afetados:**

- **`src/lib/adminAuth.ts`** -- Mudar roles para `"admin_total" | "admin_parcial"`. Usuario padrao: `admin`/`admin` como `admin_total`.

- **`src/pages/Admin.tsx`** -- 3 abas: Dashboard, Cadastrados (so admin_total), Usuarios (so admin_total). Admin parcial ve apenas Dashboard.

- **`src/components/admin/AdminCadastros.tsx`** (novo) -- Tabela com todos os PCDs cadastrados, mostrando todos os campos. Busca e filtro por nome/bairro/tipo de deficiencia. Botao para expandir e ver detalhes completos de cada cadastro.

- **`src/components/admin/AdminUsers.tsx`** -- Atualizar para usar os 2 novos roles.

---

### Arquivos a criar/modificar

| Arquivo | Acao |
|---|---|
| `src/pages/CadastroPCD.tsx` | Reescrever com formulario completo |
| `src/lib/adminAuth.ts` | Simplificar para 2 roles |
| `src/lib/cadastroStorage.ts` | Novo -- CRUD de cadastros em localStorage |
| `src/pages/Admin.tsx` | Adicionar aba "Cadastrados" |
| `src/components/admin/AdminCadastros.tsx` | Novo -- lista de cadastrados |
| `src/components/admin/AdminUsers.tsx` | Atualizar roles |

