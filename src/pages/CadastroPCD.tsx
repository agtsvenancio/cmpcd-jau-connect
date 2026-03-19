import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ClipboardList, ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";

const CadastroPCD = () => (
  <PageLayout>
    <PageHero title="Cadastro de PCD" subtitle="Registre-se e contribua para políticas públicas mais efetivas" />

    <section className="py-20 bg-background">
      <div className="container px-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <ClipboardList className="w-10 h-10 text-primary" aria-hidden="true" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">Formulário de Cadastro</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            O cadastro de pessoas com deficiência é fundamental para o planejamento de políticas públicas, distribuição de recursos e desenvolvimento de ações inclusivas no município de Jaú.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-card rounded-2xl p-6 border border-border text-center" style={{ boxShadow: "var(--card-shadow)" }}>
            <Shield className="w-8 h-8 text-primary mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-bold text-foreground mb-1">Dados Protegidos</h3>
            <p className="text-sm text-muted-foreground">Seus dados são protegidos conforme a LGPD</p>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border text-center" style={{ boxShadow: "var(--card-shadow)" }}>
            <Clock className="w-8 h-8 text-primary mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-bold text-foreground mb-1">~15 minutos</h3>
            <p className="text-sm text-muted-foreground">Tempo estimado para preenchimento</p>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border text-center" style={{ boxShadow: "var(--card-shadow)" }}>
            <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-bold text-foreground mb-1">Documentos</h3>
            <p className="text-sm text-muted-foreground">Tenha RG, comprovante e laudo em mãos</p>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-8 border border-border text-center" style={{ boxShadow: "var(--card-shadow)" }}>
          <h3 className="text-xl font-bold text-foreground mb-4">🚧 Formulário em breve</h3>
          <p className="text-muted-foreground mb-6">
            O formulário completo de cadastro de PCD será ativado na próxima fase, quando o sistema backend estiver configurado. O formulário incluirá todos os blocos de dados: informações pessoais, responsável legal, deficiência, dados adicionais, composição familiar, documentos e declaração de consentimento.
          </p>
          <div className="bg-primary/5 rounded-xl p-4 text-sm text-muted-foreground">
            <strong>Documentos necessários:</strong> RG, Comprovante de Residência e Laudo Médico (PDF, JPG ou PNG, máx. 5MB cada).
          </div>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);

export default CadastroPCD;
