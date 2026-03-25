import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { saveCadastro, type FamilyMember } from "@/lib/cadastroStorage";
import { ClipboardList, Plus, Trash2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function maskCPF(v: string) {
  return v.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2").slice(0, 14);
}
function maskCEP(v: string) {
  return v.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);
}
function maskPhone(v: string) {
  const d = v.replace(/\D/g, "");
  if (d.length <= 10) return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
}

const tiposDeficiencia = ["Física", "Auditiva", "Visual", "Intelectual", "Múltipla", "TEA", "Outros"];
const escolaridades = ["Não alfabetizado", "Ensino Fundamental Incompleto", "Ensino Fundamental Completo", "Ensino Médio Incompleto", "Ensino Médio Completo", "Ensino Superior Incompleto", "Ensino Superior Completo", "Pós-graduação"];
const ocupacoes = ["Trabalhador(a)", "Estudante", "Aposentado(a)", "Desempregado(a)", "Do lar"];
const rendas = ["Até 1 salário mínimo", "1 a 2 salários mínimos", "2 a 3 salários mínimos", "3 a 5 salários mínimos", "Acima de 5 salários mínimos"];

const initialForm = {
  nomeCompleto: "", sexo: "", filiacao: "", dataNascimento: "", naturalidade: "",
  cpf: "", estadoCivil: "", tipoSanguineo: "", endereco: "", numero: "",
  bairro: "", cidade: "Jaú", uf: "SP", cep: "", telefoneProprio: "",
  telefoneRecados: "", email: "",
  possuiResponsavel: false, responsavelNome: "", responsavelTelefone: "",
  tipoDeficiencia: [] as string[], tipoDeficienciaOutros: "", cid: "",
  grauDeficiencia: "", dataLaudo: "", medicoNome: "", medicoCRM: "",
  usaTecnologiaAssistiva: false, tecnologiaAssistivaQual: "",
  participaEntidade: false, entidadeQual: "",
  escolaridade: "", ocupacao: "", recebeBPC: false, rendaFamiliar: "",
  composicaoFamiliar: [] as FamilyMember[],
  docRG: "", docComprovante: "", docLaudo: "",
  consentimentoCidade: "Jaú", consentimentoData: new Date().toISOString().split("T")[0],
  consentimentoNome: "", consentimento: false,
};

const CadastroPCD = () => {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const set = (field: string, value: any) => setForm((f) => ({ ...f, [field]: value }));

  const toggleTipo = (tipo: string) => {
    setForm((f) => ({
      ...f,
      tipoDeficiencia: f.tipoDeficiencia.includes(tipo)
        ? f.tipoDeficiencia.filter((t) => t !== tipo)
        : [...f.tipoDeficiencia, tipo],
    }));
  };

  const addFamilyMember = () => set("composicaoFamiliar", [...form.composicaoFamiliar, { nome: "", dataNascimento: "", parentesco: "" }]);
  const removeFamilyMember = (i: number) => set("composicaoFamiliar", form.composicaoFamiliar.filter((_, idx) => idx !== i));
  const updateFamilyMember = (i: number, field: keyof FamilyMember, value: string) => {
    const updated = [...form.composicaoFamiliar];
    updated[i] = { ...updated[i], [field]: value };
    set("composicaoFamiliar", updated);
  };

  const handleFile = (field: string, file: File | null) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Arquivo muito grande", description: "Máximo 5MB permitido.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => set(field, reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!form.nomeCompleto || !form.cpf || !form.dataNascimento) {
      toast({ title: "Campos obrigatórios", description: "Preencha nome, CPF e data de nascimento.", variant: "destructive" });
      return;
    }
    if (!form.consentimento) {
      toast({ title: "Consentimento obrigatório", description: "Marque o termo de consentimento LGPD.", variant: "destructive" });
      return;
    }
    saveCadastro(form);
    setSubmitted(true);
    toast({ title: "Cadastro realizado!", description: "Seus dados foram salvos com sucesso." });
  };

  if (submitted) {
    return (
      <PageLayout>
        <PageHero title="Cadastro de PCD" subtitle="Registre-se e contribua para políticas públicas mais efetivas" />
        <section className="py-20 bg-background">
          <div className="container px-4 max-w-2xl mx-auto text-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-extrabold text-foreground mb-4">Cadastro Enviado!</h2>
              <p className="text-muted-foreground mb-8">Obrigado, {form.nomeCompleto}. Seus dados foram registrados com sucesso.</p>
              <Button onClick={() => { setForm(initialForm); setStep(0); setSubmitted(false); }} className="rounded-full">Novo Cadastro</Button>
            </motion.div>
          </div>
        </section>
      </PageLayout>
    );
  }

  const steps = [
    "Dados do Requerente",
    "Responsável Legal",
    "Deficiência",
    "Informações Adicionais",
    "Composição Familiar",
    "Documentos",
    "Declaração e Consentimento",
  ];

  const fieldClass = "bg-background";

  return (
    <PageLayout>
      <PageHero title="Cadastro de PCD" subtitle="Registre-se e contribua para políticas públicas mais efetivas" />
      <section className="py-12 bg-background">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-1 mb-8 flex-wrap">
            {steps.map((s, i) => (
              <button key={i} onClick={() => setStep(i)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                {i + 1}. {s}
              </button>
            ))}
          </div>

          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-2xl p-6 md:p-8 border border-border space-y-5" style={{ boxShadow: "var(--card-shadow)" }}>
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" />
              {steps[step]}
            </h3>

            {step === 0 && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><Label>Nome completo *</Label><Input className={fieldClass} value={form.nomeCompleto} onChange={(e) => set("nomeCompleto", e.target.value)} /></div>
                <div><Label>Sexo</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.sexo} onChange={(e) => set("sexo", e.target.value)}><option value="">Selecione</option><option>Masculino</option><option>Feminino</option><option>Outro</option></select></div>
                <div><Label>Filiação</Label><Input className={fieldClass} value={form.filiacao} onChange={(e) => set("filiacao", e.target.value)} /></div>
                <div><Label>Data de nascimento *</Label><Input type="date" className={fieldClass} value={form.dataNascimento} onChange={(e) => set("dataNascimento", e.target.value)} /></div>
                <div><Label>Naturalidade</Label><Input className={fieldClass} value={form.naturalidade} onChange={(e) => set("naturalidade", e.target.value)} /></div>
                <div><Label>CPF *</Label><Input className={fieldClass} value={form.cpf} onChange={(e) => set("cpf", maskCPF(e.target.value))} placeholder="000.000.000-00" /></div>
                <div><Label>Estado civil</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.estadoCivil} onChange={(e) => set("estadoCivil", e.target.value)}><option value="">Selecione</option><option>Solteiro(a)</option><option>Casado(a)</option><option>Divorciado(a)</option><option>Viúvo(a)</option><option>União estável</option></select></div>
                <div><Label>Tipo sanguíneo</Label><Input className={fieldClass} value={form.tipoSanguineo} onChange={(e) => set("tipoSanguineo", e.target.value)} /></div>
                <div className="sm:col-span-2"><Label>Endereço</Label><Input className={fieldClass} value={form.endereco} onChange={(e) => set("endereco", e.target.value)} /></div>
                <div><Label>Número</Label><Input className={fieldClass} value={form.numero} onChange={(e) => set("numero", e.target.value)} /></div>
                <div><Label>Bairro</Label><Input className={fieldClass} value={form.bairro} onChange={(e) => set("bairro", e.target.value)} /></div>
                <div><Label>Cidade</Label><Input className={fieldClass} value={form.cidade} onChange={(e) => set("cidade", e.target.value)} /></div>
                <div><Label>UF</Label><Input className={fieldClass} value={form.uf} onChange={(e) => set("uf", e.target.value)} maxLength={2} /></div>
                <div><Label>CEP</Label><Input className={fieldClass} value={form.cep} onChange={(e) => set("cep", maskCEP(e.target.value))} placeholder="00000-000" /></div>
                <div><Label>Telefone próprio</Label><Input className={fieldClass} value={form.telefoneProprio} onChange={(e) => set("telefoneProprio", maskPhone(e.target.value))} placeholder="(00) 00000-0000" /></div>
                <div><Label>Telefone para recados</Label><Input className={fieldClass} value={form.telefoneRecados} onChange={(e) => set("telefoneRecados", maskPhone(e.target.value))} /></div>
                <div className="sm:col-span-2"><Label>E-mail</Label><Input type="email" className={fieldClass} value={form.email} onChange={(e) => set("email", e.target.value)} /></div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox checked={form.possuiResponsavel} onCheckedChange={(v) => set("possuiResponsavel", !!v)} id="resp" />
                  <Label htmlFor="resp">Possui responsável legal / cuidador</Label>
                </div>
                {form.possuiResponsavel && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><Label>Nome do responsável</Label><Input className={fieldClass} value={form.responsavelNome} onChange={(e) => set("responsavelNome", e.target.value)} /></div>
                    <div><Label>Telefone do responsável</Label><Input className={fieldClass} value={form.responsavelTelefone} onChange={(e) => set("responsavelTelefone", maskPhone(e.target.value))} /></div>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Tipo de deficiência</Label>
                  <div className="flex flex-wrap gap-3">
                    {tiposDeficiencia.map((t) => (
                      <label key={t} className="flex items-center gap-1.5 text-sm cursor-pointer">
                        <Checkbox checked={form.tipoDeficiencia.includes(t)} onCheckedChange={() => toggleTipo(t)} />
                        {t}
                      </label>
                    ))}
                  </div>
                </div>
                {form.tipoDeficiencia.includes("Outros") && (
                  <div><Label>Especifique</Label><Input className={fieldClass} value={form.tipoDeficienciaOutros} onChange={(e) => set("tipoDeficienciaOutros", e.target.value)} /></div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label>CID</Label><Input className={fieldClass} value={form.cid} onChange={(e) => set("cid", e.target.value)} /></div>
                  <div><Label>Grau</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.grauDeficiencia} onChange={(e) => set("grauDeficiencia", e.target.value)}><option value="">Selecione</option><option>Leve</option><option>Moderado</option><option>Grave</option></select></div>
                  <div><Label>Data do laudo</Label><Input type="date" className={fieldClass} value={form.dataLaudo} onChange={(e) => set("dataLaudo", e.target.value)} /></div>
                  <div><Label>Médico</Label><Input className={fieldClass} value={form.medicoNome} onChange={(e) => set("medicoNome", e.target.value)} /></div>
                  <div><Label>CRM</Label><Input className={fieldClass} value={form.medicoCRM} onChange={(e) => set("medicoCRM", e.target.value)} /></div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={form.usaTecnologiaAssistiva} onCheckedChange={(v) => set("usaTecnologiaAssistiva", !!v)} id="tech" />
                  <Label htmlFor="tech">Usa tecnologia assistiva</Label>
                </div>
                {form.usaTecnologiaAssistiva && <div><Label>Qual?</Label><Input className={fieldClass} value={form.tecnologiaAssistivaQual} onChange={(e) => set("tecnologiaAssistivaQual", e.target.value)} /></div>}
                <div className="flex items-center gap-2">
                  <Checkbox checked={form.participaEntidade} onCheckedChange={(v) => set("participaEntidade", !!v)} id="ent" />
                  <Label htmlFor="ent">Participa de entidade</Label>
                </div>
                {form.participaEntidade && <div><Label>Qual?</Label><Input className={fieldClass} value={form.entidadeQual} onChange={(e) => set("entidadeQual", e.target.value)} /></div>}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div><Label>Escolaridade</Label>
                  <div className="space-y-1 mt-1">{escolaridades.map((e) => (
                    <label key={e} className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" name="escolaridade" checked={form.escolaridade === e} onChange={() => set("escolaridade", e)} className="accent-primary" />{e}</label>
                  ))}</div>
                </div>
                <div><Label>Ocupação</Label>
                  <div className="space-y-1 mt-1">{ocupacoes.map((o) => (
                    <label key={o} className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" name="ocupacao" checked={form.ocupacao === o} onChange={() => set("ocupacao", o)} className="accent-primary" />{o}</label>
                  ))}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={form.recebeBPC} onCheckedChange={(v) => set("recebeBPC", !!v)} id="bpc" />
                  <Label htmlFor="bpc">Recebe BPC/LOAS</Label>
                </div>
                <div><Label>Renda familiar</Label>
                  <div className="space-y-1 mt-1">{rendas.map((r) => (
                    <label key={r} className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" name="renda" checked={form.rendaFamiliar === r} onChange={() => set("rendaFamiliar", r)} className="accent-primary" />{r}</label>
                  ))}</div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Adicione os membros da família que residem no mesmo domicílio.</p>
                {form.composicaoFamiliar.map((m, i) => (
                  <div key={i} className="grid sm:grid-cols-4 gap-3 items-end bg-muted/30 rounded-xl p-3">
                    <div><Label>Nome</Label><Input className={fieldClass} value={m.nome} onChange={(e) => updateFamilyMember(i, "nome", e.target.value)} /></div>
                    <div><Label>Nascimento</Label><Input type="date" className={fieldClass} value={m.dataNascimento} onChange={(e) => updateFamilyMember(i, "dataNascimento", e.target.value)} /></div>
                    <div><Label>Parentesco</Label><Input className={fieldClass} value={m.parentesco} onChange={(e) => updateFamilyMember(i, "parentesco", e.target.value)} /></div>
                    <Button variant="ghost" size="sm" onClick={() => removeFamilyMember(i)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addFamilyMember} className="rounded-full gap-2"><Plus className="w-4 h-4" />Adicionar membro</Button>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Envie cópias dos documentos (PDF, JPG ou PNG, máx. 5MB cada).</p>
                <div><Label>RG</Label><Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFile("docRG", e.target.files?.[0] || null)} />{form.docRG && <span className="text-xs text-primary">✓ Arquivo carregado</span>}</div>
                <div><Label>Comprovante de Residência</Label><Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFile("docComprovante", e.target.files?.[0] || null)} />{form.docComprovante && <span className="text-xs text-primary">✓ Arquivo carregado</span>}</div>
                <div><Label>Laudo Médico</Label><Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFile("docLaudo", e.target.files?.[0] || null)} />{form.docLaudo && <span className="text-xs text-primary">✓ Arquivo carregado</span>}</div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <div className="bg-muted/30 rounded-xl p-4 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground mb-2">Declaração e Consentimento (LGPD)</p>
                  <p>Declaro, para os devidos fins, que as informações acima prestadas são verdadeiras e assumo a inteira responsabilidade pelas mesmas. Autorizo o Conselho Municipal da Pessoa com Deficiência de Jaú a utilizar os dados fornecidos neste cadastro exclusivamente para fins de planejamento, implementação e monitoramento de políticas públicas voltadas à pessoa com deficiência, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label>Cidade</Label><Input className={fieldClass} value={form.consentimentoCidade} onChange={(e) => set("consentimentoCidade", e.target.value)} /></div>
                  <div><Label>Data</Label><Input type="date" className={fieldClass} value={form.consentimentoData} onChange={(e) => set("consentimentoData", e.target.value)} /></div>
                  <div className="sm:col-span-2"><Label>Nome do declarante</Label><Input className={fieldClass} value={form.consentimentoNome} onChange={(e) => set("consentimentoNome", e.target.value)} /></div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={form.consentimento} onCheckedChange={(v) => set("consentimento", !!v)} id="consent" />
                  <Label htmlFor="consent" className="text-sm">Li e concordo com os termos acima *</Label>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="rounded-full">Anterior</Button>
              {step < 6 ? (
                <Button onClick={() => setStep(step + 1)} className="rounded-full">Próximo</Button>
              ) : (
                <Button onClick={handleSubmit} className="rounded-full gap-2"><CheckCircle className="w-4 h-4" />Enviar Cadastro</Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CadastroPCD;
