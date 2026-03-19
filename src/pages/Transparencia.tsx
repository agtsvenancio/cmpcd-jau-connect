import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { FileText, BookOpen, FolderOpen, Globe, Download, Calendar, Users, Phone, Mail, MapPin } from "lucide-react";

const documentos = [
  { tipo: "Ata", titulo: "Ata da Reunião Ordinária - Março 2025", data: "2025-03-15", arquivo: "#" },
  { tipo: "Ata", titulo: "Ata da Reunião Extraordinária - Fevereiro 2025", data: "2025-02-20", arquivo: "#" },
  { tipo: "Ata", titulo: "Ata da Reunião Ordinária - Janeiro 2025", data: "2025-01-18", arquivo: "#" },
  { tipo: "Resolução", titulo: "Resolução nº 05/2025 - Normas de Acessibilidade", data: "2025-03-01", arquivo: "#" },
  { tipo: "Resolução", titulo: "Resolução nº 04/2025 - Programa de Inclusão", data: "2025-02-15", arquivo: "#" },
  { tipo: "Documento", titulo: "Regimento Interno do CMPCD", data: "2024-06-01", arquivo: "#" },
  { tipo: "Documento", titulo: "Lei de Criação do Conselho", data: "2020-01-15", arquivo: "#" },
  { tipo: "Informe", titulo: "Relatório Anual de Atividades 2024", data: "2025-01-30", arquivo: "#" },
  { tipo: "Informe", titulo: "Calendário de Reuniões 2025", data: "2025-01-05", arquivo: "#" },
];

const tipoIcons: Record<string, typeof FileText> = {
  Ata: FileText,
  Resolução: BookOpen,
  Documento: FolderOpen,
  Informe: Globe,
};

const conselheiros = [
  { nome: "Maria Silva", representacao: "Poder Público - Assistência Social", mandato: "2024-2026" },
  { nome: "João Santos", representacao: "Poder Público - Saúde", mandato: "2024-2026" },
  { nome: "Ana Costa", representacao: "Sociedade Civil - APAE", mandato: "2024-2026" },
  { nome: "Carlos Oliveira", representacao: "Sociedade Civil - AMAE", mandato: "2024-2026" },
  { nome: "Lucia Pereira", representacao: "Poder Público - Educação", mandato: "2024-2026" },
  { nome: "Roberto Lima", representacao: "Sociedade Civil - CISC", mandato: "2024-2026" },
];

const Transparencia = () => (
  <PageLayout>
    <PageHero title="Transparência" subtitle="Acesso a documentos, atas, resoluções e informações públicas do conselho" />

    {/* Documentos */}
    <section className="py-16 bg-background">
      <div className="container px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-extrabold text-foreground mb-8">Documentos e Publicações</h2>

        <div className="space-y-4">
          {documentos.map((doc, i) => {
            const Icon = tipoIcons[doc.tipo] || FileText;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border hover:border-primary/30 transition-all" style={{ boxShadow: "var(--card-shadow)" }}>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-primary">{doc.tipo}</span>
                  <h3 className="font-semibold text-foreground text-sm truncate">{doc.titulo}</h3>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {new Date(doc.data).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <a href={doc.arquivo} className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors" aria-label={`Baixar ${doc.titulo}`}>
                  <Download className="w-5 h-5" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Conselheiros */}
    <section className="py-16 bg-card">
      <div className="container px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-extrabold text-foreground mb-8 flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" aria-hidden="true" /> Conselheiros
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {conselheiros.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-background rounded-xl p-5 border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
              <h4 className="font-bold text-foreground">{c.nome}</h4>
              <p className="text-sm text-muted-foreground mt-1">{c.representacao}</p>
              <p className="text-xs text-primary font-semibold mt-2">Mandato: {c.mandato}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Contato institucional */}
    <section className="py-16 bg-background">
      <div className="container px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-extrabold text-foreground mb-8">Informações Institucionais</h2>
        <div className="bg-card rounded-2xl p-8 border border-border space-y-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary shrink-0" aria-hidden="true" /><span className="text-foreground">Rua Exemplo, 123 - Centro, Jaú - SP, CEP 17201-000</span></div>
          <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary shrink-0" aria-hidden="true" /><span className="text-foreground">(14) 3622-0000</span></div>
          <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary shrink-0" aria-hidden="true" /><span className="text-foreground">cmpcd@jau.sp.gov.br</span></div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Transparencia;
