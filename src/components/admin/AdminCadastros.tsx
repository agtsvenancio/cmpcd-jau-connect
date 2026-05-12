import { useState, useRef } from "react";
import { getCadastros, updateCadastro, importCadastros, type CadastroPCD, type FamilyMember } from "@/lib/cadastroStorage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, ChevronDown, ChevronUp, Users, Pencil, Save, X, Download, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

function maskCPF(v: string) {
  return v.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2").slice(0, 14);
}
function maskPhone(v: string) {
  const d = v.replace(/\D/g, "");
  if (d.length <= 10) return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
}
function maskCEP(v: string) {
  return v.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);
}

const tiposDeficiencia = ["Física", "Auditiva", "Visual", "Intelectual", "Múltipla", "TEA", "Outros"];

const AdminCadastros = () => {
  const [cadastros, setCadastros] = useState<CadastroPCD[]>(getCadastros);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<CadastroPCD>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const cadastroFields: (keyof CadastroPCD)[] = [
    "nomeCompleto","sexo","filiacao","dataNascimento","naturalidade","cpf","estadoCivil","tipoSanguineo",
    "endereco","numero","bairro","cidade","uf","cep","telefoneProprio","telefoneRecados","email",
    "possuiResponsavel","responsavelNome","responsavelTelefone",
    "tipoDeficiencia","tipoDeficienciaOutros","cid","grauDeficiencia","dataLaudo","medicoNome","medicoCRM",
    "usaTecnologiaAssistiva","tecnologiaAssistivaQual","participaEntidade","entidadeQual",
    "escolaridade","ocupacao","recebeBPC","rendaFamiliar","composicaoFamiliar",
    "consentimentoCidade","consentimentoData","consentimentoNome","consentimento",
  ];

  const exportToExcel = () => {
    const rows = cadastros.map((c) => ({
      "Data Cadastro": new Date(c.createdAt).toLocaleDateString("pt-BR"),
      "Nome Completo": c.nomeCompleto,
      "CPF": c.cpf,
      "Sexo": c.sexo,
      "Filiação": c.filiacao,
      "Data de Nascimento": c.dataNascimento,
      "Naturalidade": c.naturalidade,
      "Estado Civil": c.estadoCivil,
      "Tipo Sanguíneo": c.tipoSanguineo,
      "Endereço": c.endereco,
      "Número": c.numero,
      "Bairro": c.bairro,
      "Cidade": c.cidade,
      "UF": c.uf,
      "CEP": c.cep,
      "Telefone Próprio": c.telefoneProprio,
      "Telefone Recados": c.telefoneRecados,
      "E-mail": c.email,
      "Possui Responsável": c.possuiResponsavel ? "Sim" : "Não",
      "Responsável Nome": c.responsavelNome,
      "Responsável Telefone": c.responsavelTelefone,
      "Tipo Deficiência": (c.tipoDeficiencia || []).join("; "),
      "Tipo Deficiência (Outros)": c.tipoDeficienciaOutros,
      "CID": c.cid,
      "Grau": c.grauDeficiencia,
      "Data Laudo": c.dataLaudo,
      "Médico": c.medicoNome,
      "CRM": c.medicoCRM,
      "Usa Tec. Assistiva": c.usaTecnologiaAssistiva ? "Sim" : "Não",
      "Qual Tec. Assistiva": c.tecnologiaAssistivaQual,
      "Participa Entidade": c.participaEntidade ? "Sim" : "Não",
      "Qual Entidade": c.entidadeQual,
      "Escolaridade": c.escolaridade,
      "Ocupação": c.ocupacao,
      "Recebe BPC": c.recebeBPC ? "Sim" : "Não",
      "Renda Familiar": c.rendaFamiliar,
      "Composição Familiar": (c.composicaoFamiliar || []).map((f) => `${f.nome} (${f.parentesco}, ${f.dataNascimento})`).join("; "),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cadastros PCD");
    XLSX.writeFile(wb, `cadastros-pcd-${new Date().toISOString().slice(0,10)}.xlsx`);
    toast({ title: "Exportação concluída", description: `${rows.length} cadastro(s) exportado(s).` });
  };

  const downloadTemplate = () => {
    const exemplo = [{
      "Nome Completo": "Exemplo da Silva",
      "CPF": "000.000.000-00",
      "Sexo": "Masculino",
      "Filiação": "",
      "Data de Nascimento": "1990-01-01",
      "Naturalidade": "Jaú - SP",
      "Estado Civil": "Solteiro(a)",
      "Tipo Sanguíneo": "",
      "Endereço": "Rua Exemplo",
      "Número": "100",
      "Bairro": "Centro",
      "Cidade": "Jaú",
      "UF": "SP",
      "CEP": "17200-000",
      "Telefone Próprio": "(14) 99999-0000",
      "Telefone Recados": "",
      "E-mail": "",
      "Possui Responsável": "Não",
      "Responsável Nome": "",
      "Responsável Telefone": "",
      "Tipo Deficiência": "Física; Visual",
      "Tipo Deficiência (Outros)": "",
      "CID": "",
      "Grau": "Moderado",
      "Data Laudo": "",
      "Médico": "",
      "CRM": "",
      "Usa Tec. Assistiva": "Não",
      "Qual Tec. Assistiva": "",
      "Participa Entidade": "Não",
      "Qual Entidade": "",
      "Escolaridade": "",
      "Ocupação": "",
      "Recebe BPC": "Não",
      "Renda Familiar": "",
      "Composição Familiar": "",
    }];
    const ws = XLSX.utils.json_to_sheet(exemplo);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Modelo");
    XLSX.writeFile(wb, "modelo-importacao-pcd.xlsx");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows: any[] = XLSX.utils.sheet_to_json(ws, { defval: "" });
        const sim = (v: any) => String(v).trim().toLowerCase() === "sim" || v === true;
        const items = rows
          .filter((r) => (r["Nome Completo"] || r["nomeCompleto"] || "").toString().trim())
          .map((r) => {
            const tipos = String(r["Tipo Deficiência"] || "").split(/[;,]/).map((s) => s.trim()).filter(Boolean);
            const compStr = String(r["Composição Familiar"] || "");
            const composicao: FamilyMember[] = compStr ? compStr.split(";").map((s) => {
              const m = s.trim().match(/^(.+?)\s*\((.+?),\s*(.+?)\)$/);
              return m ? { nome: m[1], parentesco: m[2], dataNascimento: m[3] } : { nome: s.trim(), parentesco: "", dataNascimento: "" };
            }).filter((f) => f.nome) : [];
            return {
              nomeCompleto: String(r["Nome Completo"] || ""),
              sexo: String(r["Sexo"] || ""),
              filiacao: String(r["Filiação"] || ""),
              dataNascimento: String(r["Data de Nascimento"] || ""),
              naturalidade: String(r["Naturalidade"] || ""),
              cpf: String(r["CPF"] || ""),
              estadoCivil: String(r["Estado Civil"] || ""),
              tipoSanguineo: String(r["Tipo Sanguíneo"] || ""),
              endereco: String(r["Endereço"] || ""),
              numero: String(r["Número"] || ""),
              bairro: String(r["Bairro"] || ""),
              cidade: String(r["Cidade"] || ""),
              uf: String(r["UF"] || ""),
              cep: String(r["CEP"] || ""),
              telefoneProprio: String(r["Telefone Próprio"] || ""),
              telefoneRecados: String(r["Telefone Recados"] || ""),
              email: String(r["E-mail"] || ""),
              possuiResponsavel: sim(r["Possui Responsável"]),
              responsavelNome: String(r["Responsável Nome"] || ""),
              responsavelTelefone: String(r["Responsável Telefone"] || ""),
              tipoDeficiencia: tipos,
              tipoDeficienciaOutros: String(r["Tipo Deficiência (Outros)"] || ""),
              cid: String(r["CID"] || ""),
              grauDeficiencia: String(r["Grau"] || ""),
              dataLaudo: String(r["Data Laudo"] || ""),
              medicoNome: String(r["Médico"] || ""),
              medicoCRM: String(r["CRM"] || ""),
              usaTecnologiaAssistiva: sim(r["Usa Tec. Assistiva"]),
              tecnologiaAssistivaQual: String(r["Qual Tec. Assistiva"] || ""),
              participaEntidade: sim(r["Participa Entidade"]),
              entidadeQual: String(r["Qual Entidade"] || ""),
              escolaridade: String(r["Escolaridade"] || ""),
              ocupacao: String(r["Ocupação"] || ""),
              recebeBPC: sim(r["Recebe BPC"]),
              rendaFamiliar: String(r["Renda Familiar"] || ""),
              composicaoFamiliar: composicao,
              docRG: "", docComprovante: "", docLaudo: "",
              consentimentoCidade: "Jaú",
              consentimentoData: new Date().toISOString().slice(0,10),
              consentimentoNome: String(r["Nome Completo"] || ""),
              consentimento: true,
            };
          });
        if (items.length === 0) {
          toast({ title: "Nenhum registro válido", description: "Verifique se a planilha tem a coluna 'Nome Completo'.", variant: "destructive" });
        } else {
          const count = importCadastros(items);
          setCadastros(getCadastros());
          toast({ title: "Importação concluída", description: `${count} cadastro(s) importado(s).` });
        }
      } catch (err) {
        toast({ title: "Erro ao importar", description: "Verifique se o arquivo é uma planilha Excel válida.", variant: "destructive" });
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsArrayBuffer(file);
  };

  const filtered = cadastros.filter((c) =>
    [c.nomeCompleto, c.bairro, c.tipoDeficiencia.join(", "), c.cpf]
      .join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (c: CadastroPCD) => {
    setEditingId(c.id);
    setEditForm({ ...c });
    if (expanded !== c.id) setExpanded(c.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (!editingId) return;
    const { id, createdAt, ...data } = editForm as CadastroPCD;
    const updated = updateCadastro(editingId, data);
    if (updated) {
      setCadastros(getCadastros());
      toast({ title: "Cadastro atualizado", description: "Os dados foram salvos com sucesso." });
    }
    setEditingId(null);
    setEditForm({});
  };

  const setField = (field: string, value: any) => setEditForm((f) => ({ ...f, [field]: value }));

  const toggleTipoEdit = (tipo: string) => {
    const current = editForm.tipoDeficiencia || [];
    setField("tipoDeficiencia", current.includes(tipo) ? current.filter((t) => t !== tipo) : [...current, tipo]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-lg font-bold text-foreground">Cadastros de PCD ({cadastros.length})</h3>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Buscar por nome, bairro, deficiência..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-card rounded-2xl p-12 border border-border text-center" style={{ boxShadow: "var(--card-shadow)" }}>
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">{cadastros.length === 0 ? "Nenhum cadastro realizado ainda." : "Nenhum resultado encontrado."}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => {
            const isEditing = editingId === c.id;
            const data = isEditing ? editForm : c;

            return (
              <div key={c.id} className="bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: "var(--card-shadow)" }}>
                <button
                  onClick={() => { if (!isEditing) setExpanded(expanded === c.id ? null : c.id); }}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-foreground">{c.nomeCompleto}</p>
                    <p className="text-sm text-muted-foreground">{c.cpf} · {c.bairro} · {c.tipoDeficiencia.join(", ") || "—"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isEditing && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); startEdit(c); }}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                    )}
                    <span className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleDateString("pt-BR")}</span>
                    {expanded === c.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {expanded === c.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-4 pb-4 border-t border-border pt-4">
                        {isEditing ? (
                          <div className="space-y-6">
                            {/* Dados do Requerente */}
                            <div>
                              <p className="font-semibold text-foreground mb-3">Dados do Requerente</p>
                              <div className="grid sm:grid-cols-2 gap-3">
                                <div className="sm:col-span-2"><Label>Nome completo</Label><Input value={data.nomeCompleto || ""} onChange={(e) => setField("nomeCompleto", e.target.value)} /></div>
                                <div><Label>Sexo</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.sexo || ""} onChange={(e) => setField("sexo", e.target.value)}><option value="">Selecione</option><option>Masculino</option><option>Feminino</option><option>Outro</option></select></div>
                                <div><Label>Filiação</Label><Input value={data.filiacao || ""} onChange={(e) => setField("filiacao", e.target.value)} /></div>
                                <div><Label>Data de nascimento</Label><Input type="date" value={data.dataNascimento || ""} onChange={(e) => setField("dataNascimento", e.target.value)} /></div>
                                <div><Label>Naturalidade</Label><Input value={data.naturalidade || ""} onChange={(e) => setField("naturalidade", e.target.value)} /></div>
                                <div><Label>CPF</Label><Input value={data.cpf || ""} onChange={(e) => setField("cpf", maskCPF(e.target.value))} /></div>
                                <div><Label>Estado civil</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.estadoCivil || ""} onChange={(e) => setField("estadoCivil", e.target.value)}><option value="">Selecione</option><option>Solteiro(a)</option><option>Casado(a)</option><option>Divorciado(a)</option><option>Viúvo(a)</option><option>União estável</option></select></div>
                                <div><Label>Tipo sanguíneo</Label><Input value={data.tipoSanguineo || ""} onChange={(e) => setField("tipoSanguineo", e.target.value)} /></div>
                                <div className="sm:col-span-2"><Label>Endereço</Label><Input value={data.endereco || ""} onChange={(e) => setField("endereco", e.target.value)} /></div>
                                <div><Label>Número</Label><Input value={data.numero || ""} onChange={(e) => setField("numero", e.target.value)} /></div>
                                <div><Label>Bairro</Label><Input value={data.bairro || ""} onChange={(e) => setField("bairro", e.target.value)} /></div>
                                <div><Label>Cidade</Label><Input value={data.cidade || ""} onChange={(e) => setField("cidade", e.target.value)} /></div>
                                <div><Label>UF</Label><Input value={data.uf || ""} onChange={(e) => setField("uf", e.target.value)} maxLength={2} /></div>
                                <div><Label>CEP</Label><Input value={data.cep || ""} onChange={(e) => setField("cep", maskCEP(e.target.value))} /></div>
                                <div><Label>Telefone próprio</Label><Input value={data.telefoneProprio || ""} onChange={(e) => setField("telefoneProprio", maskPhone(e.target.value))} /></div>
                                <div><Label>Telefone recados</Label><Input value={data.telefoneRecados || ""} onChange={(e) => setField("telefoneRecados", maskPhone(e.target.value))} /></div>
                                <div className="sm:col-span-2"><Label>E-mail</Label><Input type="email" value={data.email || ""} onChange={(e) => setField("email", e.target.value)} /></div>
                              </div>
                            </div>

                            {/* Responsável Legal */}
                            <div>
                              <p className="font-semibold text-foreground mb-3">Responsável Legal</p>
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <Checkbox checked={data.possuiResponsavel || false} onCheckedChange={(v) => setField("possuiResponsavel", !!v)} />
                                  <Label>Possui responsável legal</Label>
                                </div>
                                {data.possuiResponsavel && (
                                  <div className="grid sm:grid-cols-2 gap-3">
                                    <div><Label>Nome</Label><Input value={data.responsavelNome || ""} onChange={(e) => setField("responsavelNome", e.target.value)} /></div>
                                    <div><Label>Telefone</Label><Input value={data.responsavelTelefone || ""} onChange={(e) => setField("responsavelTelefone", maskPhone(e.target.value))} /></div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Deficiência */}
                            <div>
                              <p className="font-semibold text-foreground mb-3">Deficiência</p>
                              <div className="space-y-3">
                                <div className="flex flex-wrap gap-3">
                                  {tiposDeficiencia.map((t) => (
                                    <label key={t} className="flex items-center gap-1.5 text-sm cursor-pointer">
                                      <Checkbox checked={(data.tipoDeficiencia || []).includes(t)} onCheckedChange={() => toggleTipoEdit(t)} />
                                      {t}
                                    </label>
                                  ))}
                                </div>
                                {(data.tipoDeficiencia || []).includes("Outros") && (
                                  <div><Label>Especifique</Label><Input value={data.tipoDeficienciaOutros || ""} onChange={(e) => setField("tipoDeficienciaOutros", e.target.value)} /></div>
                                )}
                                <div className="grid sm:grid-cols-2 gap-3">
                                  <div><Label>CID</Label><Input value={data.cid || ""} onChange={(e) => setField("cid", e.target.value)} /></div>
                                  <div><Label>Grau</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.grauDeficiencia || ""} onChange={(e) => setField("grauDeficiencia", e.target.value)}><option value="">Selecione</option><option>Leve</option><option>Moderado</option><option>Grave</option></select></div>
                                  <div><Label>Data do laudo</Label><Input type="date" value={data.dataLaudo || ""} onChange={(e) => setField("dataLaudo", e.target.value)} /></div>
                                  <div><Label>Médico</Label><Input value={data.medicoNome || ""} onChange={(e) => setField("medicoNome", e.target.value)} /></div>
                                  <div><Label>CRM</Label><Input value={data.medicoCRM || ""} onChange={(e) => setField("medicoCRM", e.target.value)} /></div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Checkbox checked={data.usaTecnologiaAssistiva || false} onCheckedChange={(v) => setField("usaTecnologiaAssistiva", !!v)} />
                                  <Label>Usa tecnologia assistiva</Label>
                                </div>
                                {data.usaTecnologiaAssistiva && <div><Label>Qual?</Label><Input value={data.tecnologiaAssistivaQual || ""} onChange={(e) => setField("tecnologiaAssistivaQual", e.target.value)} /></div>}
                                <div className="flex items-center gap-2">
                                  <Checkbox checked={data.participaEntidade || false} onCheckedChange={(v) => setField("participaEntidade", !!v)} />
                                  <Label>Participa de entidade</Label>
                                </div>
                                {data.participaEntidade && <div><Label>Qual?</Label><Input value={data.entidadeQual || ""} onChange={(e) => setField("entidadeQual", e.target.value)} /></div>}
                              </div>
                            </div>

                            {/* Informações Adicionais */}
                            <div>
                              <p className="font-semibold text-foreground mb-3">Informações Adicionais</p>
                              <div className="grid sm:grid-cols-2 gap-3">
                                <div><Label>Escolaridade</Label><Input value={data.escolaridade || ""} onChange={(e) => setField("escolaridade", e.target.value)} /></div>
                                <div><Label>Ocupação</Label><Input value={data.ocupacao || ""} onChange={(e) => setField("ocupacao", e.target.value)} /></div>
                                <div className="flex items-center gap-2">
                                  <Checkbox checked={data.recebeBPC || false} onCheckedChange={(v) => setField("recebeBPC", !!v)} />
                                  <Label>Recebe BPC/LOAS</Label>
                                </div>
                                <div><Label>Renda familiar</Label><Input value={data.rendaFamiliar || ""} onChange={(e) => setField("rendaFamiliar", e.target.value)} /></div>
                              </div>
                            </div>

                            {/* Ações */}
                            <div className="flex gap-2 pt-4 border-t border-border">
                              <Button onClick={saveEdit} className="rounded-full gap-2"><Save className="w-4 h-4" />Salvar alterações</Button>
                              <Button variant="outline" onClick={cancelEdit} className="rounded-full gap-2"><X className="w-4 h-4" />Cancelar</Button>
                            </div>
                          </div>
                        ) : (
                          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                            <Detail label="Sexo" value={c.sexo} />
                            <Detail label="Filiação" value={c.filiacao} />
                            <Detail label="Data de Nascimento" value={c.dataNascimento} />
                            <Detail label="Naturalidade" value={c.naturalidade} />
                            <Detail label="Estado Civil" value={c.estadoCivil} />
                            <Detail label="Tipo Sanguíneo" value={c.tipoSanguineo} />
                            <Detail label="Endereço" value={`${c.endereco}, ${c.numero} - ${c.bairro}`} />
                            <Detail label="Cidade/UF" value={`${c.cidade}/${c.uf}`} />
                            <Detail label="CEP" value={c.cep} />
                            <Detail label="Telefone" value={c.telefoneProprio} />
                            <Detail label="Tel. Recados" value={c.telefoneRecados} />
                            <Detail label="E-mail" value={c.email} />

                            <div className="sm:col-span-2 border-t border-border pt-2 mt-2">
                              <p className="font-semibold text-foreground mb-1">Responsável Legal</p>
                            </div>
                            <Detail label="Possui" value={c.possuiResponsavel ? "Sim" : "Não"} />
                            {c.possuiResponsavel && <>
                              <Detail label="Nome" value={c.responsavelNome} />
                              <Detail label="Telefone" value={c.responsavelTelefone} />
                            </>}

                            <div className="sm:col-span-2 border-t border-border pt-2 mt-2">
                              <p className="font-semibold text-foreground mb-1">Deficiência</p>
                            </div>
                            <Detail label="Tipo" value={c.tipoDeficiencia.join(", ")} />
                            {c.tipoDeficienciaOutros && <Detail label="Outros" value={c.tipoDeficienciaOutros} />}
                            <Detail label="CID" value={c.cid} />
                            <Detail label="Grau" value={c.grauDeficiencia} />
                            <Detail label="Data Laudo" value={c.dataLaudo} />
                            <Detail label="Médico" value={c.medicoNome} />
                            <Detail label="CRM" value={c.medicoCRM} />
                            <Detail label="Tec. Assistiva" value={c.usaTecnologiaAssistiva ? `Sim - ${c.tecnologiaAssistivaQual}` : "Não"} />
                            <Detail label="Entidade" value={c.participaEntidade ? `Sim - ${c.entidadeQual}` : "Não"} />

                            <div className="sm:col-span-2 border-t border-border pt-2 mt-2">
                              <p className="font-semibold text-foreground mb-1">Informações Adicionais</p>
                            </div>
                            <Detail label="Escolaridade" value={c.escolaridade} />
                            <Detail label="Ocupação" value={c.ocupacao} />
                            <Detail label="BPC/LOAS" value={c.recebeBPC ? "Sim" : "Não"} />
                            <Detail label="Renda Familiar" value={c.rendaFamiliar} />

                            {c.composicaoFamiliar.length > 0 && <>
                              <div className="sm:col-span-2 border-t border-border pt-2 mt-2">
                                <p className="font-semibold text-foreground mb-1">Composição Familiar</p>
                              </div>
                              {c.composicaoFamiliar.map((f, i) => (
                                <Detail key={i} label={f.parentesco || "Membro"} value={`${f.nome} (${f.dataNascimento})`} />
                              ))}
                            </>}

                            <div className="sm:col-span-2 border-t border-border pt-2 mt-2">
                              <p className="font-semibold text-foreground mb-1">Documentos</p>
                            </div>
                            <Detail label="RG" value={c.docRG ? "✓ Enviado" : "—"} />
                            <Detail label="Comprovante" value={c.docComprovante ? "✓ Enviado" : "—"} />
                            <Detail label="Laudo" value={c.docLaudo ? "✓ Enviado" : "—"} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="text-muted-foreground">{label}:</span>{" "}
    <span className="text-foreground font-medium">{value || "—"}</span>
  </div>
);

export default AdminCadastros;
