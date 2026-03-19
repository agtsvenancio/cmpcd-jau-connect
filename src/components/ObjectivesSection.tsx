import { motion } from "framer-motion";
import { Target, Eye, Scale, HandHelping } from "lucide-react";

const objectives = [
  { icon: HandHelping, title: "Promover a inclusão social", description: "Desenvolver ações que garantam a participação plena das pessoas com deficiência na vida em comunidade." },
  { icon: Eye, title: "Fiscalizar políticas públicas", description: "Acompanhar e monitorar a implementação de políticas voltadas à acessibilidade e inclusão." },
  { icon: Scale, title: "Garantir direitos", description: "Assegurar que os direitos das pessoas com deficiência sejam respeitados e cumpridos." },
  { icon: Target, title: "Apoiar a Assistência Social", description: "Colaborar com a Secretaria de Assistência Social em ações inclusivas e de desenvolvimento." },
];

const ObjectivesSection = () => (
  <section id="objetivos" className="py-20 md:py-28 bg-card">
    <div className="container px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4">
          Nossos Objetivos
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-6" />
        <p className="text-muted-foreground text-lg">
          Desenvolver e apoiar políticas públicas que garantam a inclusão e qualidade de vida das pessoas com deficiência.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {objectives.map((obj, i) => (
          <motion.div
            key={obj.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="group bg-background rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300"
            style={{ boxShadow: "var(--card-shadow)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--card-hover-shadow)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--card-shadow)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <obj.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-2">{obj.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{obj.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ObjectivesSection;
