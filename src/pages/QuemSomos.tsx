import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Award, Building2 } from "lucide-react";

const valores = [
  { icon: Heart, titulo: "Humanização", descricao: "Tratamento digno e acolhedor para todas as pessoas." },
  { icon: Users, titulo: "Inclusão", descricao: "Garantia de participação plena na vida em sociedade." },
  { icon: Eye, titulo: "Transparência", descricao: "Atuação ética e prestação de contas à sociedade." },
  { icon: Target, titulo: "Compromisso", descricao: "Dedicação à defesa dos direitos das pessoas com deficiência." },
  { icon: Award, titulo: "Respeito", descricao: "Valorização da diversidade e das diferenças individuais." },
  { icon: Building2, titulo: "Parceria", descricao: "Trabalho conjunto com poder público e sociedade civil." },
];

const membros = [
  { nome: "Maria Silva", cargo: "Presidente", foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { nome: "João Santos", cargo: "Vice-Presidente", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { nome: "Ana Costa", cargo: "Secretária", foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
  { nome: "Carlos Oliveira", cargo: "Conselheiro", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
  { nome: "Lucia Pereira", cargo: "Conselheira", foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
  { nome: "Roberto Lima", cargo: "Conselheiro", foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
];

const QuemSomos = () => (
  <PageLayout>
    <PageHero title="Quem Somos" subtitle="Conheça a história, missão e membros do CMPCD Jaú" />

    {/* História */}
    <section className="py-20 bg-background">
      <div className="container px-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-6">Nossa História</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
            <p>O Conselho Municipal dos Direitos da Pessoa com Deficiência de Jaú (CMPCD) foi criado com o objetivo de propor, acompanhar, fiscalizar e fortalecer as políticas públicas voltadas às pessoas com deficiência no município.</p>
            <p>Vinculado à Prefeitura Municipal de Jaú e atuando em parceria com a Secretaria de Assistência e Desenvolvimento Social, o CMPCD é um órgão colegiado de caráter consultivo, deliberativo e fiscalizador.</p>
            <p>Desde sua criação, o conselho tem trabalhado incansavelmente para garantir que os direitos das pessoas com deficiência sejam respeitados e que políticas públicas efetivas sejam implementadas no município.</p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Missão, Visão, Valores */}
    <section className="py-20 bg-card">
      <div className="container px-4 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-background rounded-2xl p-8 border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
            <h3 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" aria-hidden="true" /> Missão
            </h3>
            <p className="text-muted-foreground leading-relaxed">Formular, acompanhar e fiscalizar políticas públicas que garantam os direitos das pessoas com deficiência, promovendo sua inclusão social, acessibilidade e participação plena na vida comunitária de Jaú.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-background rounded-2xl p-8 border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
            <h3 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-primary" aria-hidden="true" /> Visão
            </h3>
            <p className="text-muted-foreground leading-relaxed">Ser referência estadual na promoção dos direitos das pessoas com deficiência, contribuindo para uma sociedade verdadeiramente inclusiva, acessível e igualitária.</p>
          </motion.div>
        </div>

        <h3 className="text-2xl font-extrabold text-foreground text-center mb-8">Nossos Valores</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {valores.map((v, i) => (
            <motion.div key={v.titulo} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-background rounded-xl p-6 border border-border text-center hover:border-primary/30 transition-all" style={{ boxShadow: "var(--card-shadow)" }}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <v.icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h4 className="font-bold text-foreground mb-1">{v.titulo}</h4>
              <p className="text-sm text-muted-foreground">{v.descricao}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Organograma */}
    <section className="py-20 bg-background">
      <div className="container px-4 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">Estrutura do Conselho</h2>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="flex flex-col items-center gap-4">
          <div className="bg-primary text-primary-foreground rounded-xl px-8 py-4 font-bold text-center" style={{ boxShadow: "var(--card-shadow)" }}>
            Prefeitura Municipal de Jaú
          </div>
          <div className="w-px h-8 bg-primary/30" />
          <div className="bg-secondary text-secondary-foreground rounded-xl px-8 py-4 font-bold text-center" style={{ boxShadow: "var(--card-shadow)" }}>
            Secretaria de Assistência e Desenvolvimento Social
          </div>
          <div className="w-px h-8 bg-primary/30" />
          <div className="bg-primary text-primary-foreground rounded-xl px-8 py-4 font-bold text-center text-lg" style={{ boxShadow: "var(--card-shadow)" }}>
            CMPCD Jaú
          </div>
          <div className="w-px h-8 bg-primary/30" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Presidência", "Vice-Presidência", "Secretaria", "Conselheiros"].map((item) => (
              <div key={item} className="bg-card rounded-xl px-6 py-3 font-semibold text-foreground text-center border border-border text-sm" style={{ boxShadow: "var(--card-shadow)" }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Membros */}
    <section className="py-20 bg-card">
      <div className="container px-4 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">Membros do Conselho</h2>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {membros.map((m, i) => (
            <motion.div key={m.nome} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-background rounded-2xl p-6 border border-border text-center hover:border-primary/30 transition-all" style={{ boxShadow: "var(--card-shadow)" }}>
              <img src={m.foto} alt={`Foto de ${m.nome}`} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20" loading="lazy" />
              <h4 className="font-bold text-foreground">{m.nome}</h4>
              <p className="text-sm text-primary font-semibold">{m.cargo}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default QuemSomos;
