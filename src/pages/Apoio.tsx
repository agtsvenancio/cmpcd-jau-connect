import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, HandHelping, Building2, Users, QrCode, ArrowRight } from "lucide-react";

const motivos = [
  { icon: Heart, titulo: "Impacto Real", descricao: "Seu apoio contribui diretamente para a melhoria da qualidade de vida de mais de 7 mil pessoas com deficiência em Jaú." },
  { icon: Users, titulo: "Fortalecimento Social", descricao: "Ajude a fortalecer uma rede de proteção e inclusão que beneficia famílias inteiras e a comunidade." },
  { icon: HandHelping, titulo: "Cidadania Ativa", descricao: "Ao apoiar o CMPCD, você exerce cidadania e contribui para uma sociedade mais justa e acessível." },
  { icon: Building2, titulo: "Transparência", descricao: "O conselho presta contas de todas as ações e recursos, garantindo transparência e responsabilidade." },
];

const Apoio = () => (
  <PageLayout>
    <PageHero title="Apoie o CMPCD Jaú" subtitle="Saiba como você pode contribuir para a inclusão e acessibilidade" />

    {/* Por que apoiar */}
    <section className="py-20 bg-background">
      <div className="container px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-12">Por que nos apoiar?</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {motivos.map((m, i) => (
            <motion.div key={m.titulo} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all" style={{ boxShadow: "var(--card-shadow)" }}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <m.icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{m.titulo}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.descricao}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Como apoiar */}
    <section className="py-20 bg-card">
      <div className="container px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-12">Como apoiar</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* PIX */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-background rounded-2xl p-8 border border-border text-center" style={{ boxShadow: "var(--card-shadow)" }}>
            <QrCode className="w-16 h-16 text-primary mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-foreground mb-2">Doação via PIX</h3>
            <p className="text-muted-foreground mb-4">Contribua com qualquer valor através da chave PIX do conselho.</p>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Chave PIX (CNPJ):</p>
              <p className="font-bold text-primary text-lg">00.000.000/0001-00</p>
            </div>
          </motion.div>

          {/* Outros */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-background rounded-2xl p-8 border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
            <h3 className="text-xl font-bold text-foreground mb-4">Outras Formas de Apoio</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <strong className="text-foreground">Apoio presencial:</strong>
                  <p className="text-sm text-muted-foreground">Visite nossa sede e conheça nossos projetos.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <strong className="text-foreground">Parcerias institucionais:</strong>
                  <p className="text-sm text-muted-foreground">Empresas e organizações podem firmar parcerias de apoio.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <strong className="text-foreground">Voluntariado:</strong>
                  <p className="text-sm text-muted-foreground">Contribua com seu tempo e habilidades em nossos projetos.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <Link to="/contato" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full hover:bg-primary/90 transition-colors">
            Entre em contato <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Apoio;
