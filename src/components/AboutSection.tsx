import { motion } from "framer-motion";
import { Shield, Users } from "lucide-react";

const AboutSection = () => (
  <section id="sobre" className="py-20 md:py-28 bg-background">
    <div className="container px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4">
          Sobre o Conselho
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card rounded-2xl p-8 border border-border"
          style={{ boxShadow: "var(--card-shadow)" }}
        >
          <Shield className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-lg font-bold text-foreground mb-3">O que é o CMPCD?</h3>
          <p className="text-muted-foreground leading-relaxed">
            O CMPCD Jaú é um órgão colegiado de caráter consultivo, deliberativo e fiscalizador,
            responsável pela formulação e acompanhamento de políticas públicas voltadas às pessoas
            com deficiência.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-2xl p-8 border border-border"
          style={{ boxShadow: "var(--card-shadow)" }}
        >
          <Users className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-lg font-bold text-foreground mb-3">Nossa Missão</h3>
          <p className="text-muted-foreground leading-relaxed">
            Seu objetivo é garantir direitos, promover inclusão social e contribuir para a
            construção de uma sociedade mais acessível e igualitária.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
