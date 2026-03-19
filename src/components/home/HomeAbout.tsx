import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Users, ArrowRight } from "lucide-react";

const HomeAbout = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4">Sobre o Conselho</h2>
        <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-6" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-8 border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
          <Shield className="w-10 h-10 text-primary mb-4" aria-hidden="true" />
          <h3 className="text-lg font-bold text-foreground mb-3">O que é o CMPCD?</h3>
          <p className="text-muted-foreground leading-relaxed">
            O CMPCD Jaú é um órgão colegiado de caráter consultivo, deliberativo e fiscalizador, responsável pela formulação e acompanhamento de políticas públicas voltadas às pessoas com deficiência. Atua em parceria com a Prefeitura Municipal e a Secretaria de Assistência e Desenvolvimento Social.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-8 border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
          <Users className="w-10 h-10 text-primary mb-4" aria-hidden="true" />
          <h3 className="text-lg font-bold text-foreground mb-3">Nossa Missão</h3>
          <p className="text-muted-foreground leading-relaxed">
            Garantir direitos, promover inclusão social e contribuir para a construção de uma sociedade mais acessível e igualitária. Trabalhamos para que cada pessoa com deficiência tenha voz ativa e participação plena na vida comunitária.
          </p>
        </motion.div>
      </div>

      <div className="text-center mt-10">
        <Link to="/quem-somos" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
          Saiba mais sobre nós <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default HomeAbout;
