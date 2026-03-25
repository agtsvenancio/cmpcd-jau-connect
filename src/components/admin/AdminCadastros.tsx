import { useState } from "react";
import { getCadastros, type CadastroPCD } from "@/lib/cadastroStorage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ChevronUp, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminCadastros = () => {
  const [cadastros] = useState<CadastroPCD[]>(getCadastros);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = cadastros.filter((c) =>
    [c.nomeCompleto, c.bairro, c.tipoDeficiencia.join(", "), c.cpf]
      .join(" ").toLowerCase().includes(search.toLowerCase())
  );

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
          {filtered.map((c) => (
            <div key={c.id} className="bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: "var(--card-shadow)" }}>
              <button
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
              >
                <div>
                  <p className="font-semibold text-foreground">{c.nomeCompleto}</p>
                  <p className="text-sm text-muted-foreground">{c.cpf} · {c.bairro} · {c.tipoDeficiencia.join(", ") || "—"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleDateString("pt-BR")}</span>
                  {expanded === c.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {expanded === c.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-4 pb-4 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm border-t border-border pt-4">
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
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
