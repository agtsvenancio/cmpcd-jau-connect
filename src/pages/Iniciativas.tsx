import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Stethoscope, Briefcase, Users, GraduationCap, Building2, Bus, Palette, Shield } from "lucide-react";

const areas = [
  { icon: Stethoscope, titulo: "Saúde e Reabilitação", descricao: "Acompanhamento de políticas de saúde, acesso a tratamentos, reabilitação e fornecimento de órteses e próteses para pessoas com deficiência.", cor: "bg-red-500/10 text-red-600" },
  { icon: Briefcase, titulo: "Inclusão no Mercado de Trabalho", descricao: "Fomento a programas de capacitação profissional, cotas de emprego e apoio à empregabilidade de pessoas com deficiência.", cor: "bg-blue-500/10 text-blue-600" },
  { icon: Users, titulo: "Apoio às Famílias", descricao: "Suporte e orientação para familiares de pessoas com deficiência, promovendo redes de apoio e informação sobre direitos e serviços.", cor: "bg-green-500/10 text-green-600" },
  { icon: GraduationCap, titulo: "Educação Inclusiva", descricao: "Fiscalização e apoio à implementação de políticas de educação inclusiva nas escolas municipais, garantindo acesso e permanência.", cor: "bg-yellow-500/10 text-yellow-600" },
  { icon: Building2, titulo: "Acessibilidade Urbana", descricao: "Monitoramento e proposição de melhorias na infraestrutura urbana: rampas, calçadas, sinalização tátil e espaços públicos acessíveis.", cor: "bg-purple-500/10 text-purple-600" },
  { icon: Bus, titulo: "Transporte Acessível", descricao: "Acompanhamento das condições do transporte público adaptado e proposição de melhorias para garantir mobilidade a todos.", cor: "bg-orange-500/10 text-orange-600" },
  { icon: Palette, titulo: "Cultura, Esporte e Lazer", descricao: "Promoção de atividades culturais, esportivas e de lazer inclusivas, garantindo acesso e participação de pessoas com deficiência.", cor: "bg-pink-500/10 text-pink-600" },
  { icon: Shield, titulo: "Defesa de Direitos", descricao: "Atuação na garantia dos direitos previstos na legislação, combate à discriminação e promoção da igualdade de oportunidades.", cor: "bg-cyan-500/10 text-cyan-600" },
];

const Iniciativas = () => (
  <PageLayout>
    <PageHero title="Iniciativas e Atuação" subtitle="Conheça as áreas em que o CMPCD Jaú trabalha pela inclusão" />

    <section className="py-20 bg-background">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, i) => (
            <motion.div key={area.titulo} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:-translate-y-1 transition-all duration-300" style={{ boxShadow: "var(--card-shadow)" }}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${area.cor}`}>
                <area.icon className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{area.titulo}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{area.descricao}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-card">
      <div className="container px-4 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-6">Como Atuamos</h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">O CMPCD Jaú atua de forma integrada com o poder público municipal, entidades da sociedade civil e organizações parceiras como APAE, AMAE e CISC. Nossa atuação se dá por meio de:</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-8 text-left">
            {["Reuniões ordinárias e extraordinárias", "Audiências públicas", "Visitas técnicas e fiscalizações", "Participação em conferências e fóruns", "Elaboração de resoluções e pareceres", "Parcerias institucionais", "Campanhas de conscientização", "Encaminhamento de demandas ao poder público"].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-background rounded-xl p-4 border border-border">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-foreground font-medium">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);

export default Iniciativas;
