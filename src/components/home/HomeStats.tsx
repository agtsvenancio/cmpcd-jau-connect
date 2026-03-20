import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, BarChart3, TrendingUp, ArrowRight } from "lucide-react";

const HomeStats = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4">Dados do Município</h2>
        <div className="w-16 h-1 bg-primary rounded-full mx-auto" />
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-4xl mx-auto rounded-3xl p-8 md:p-12 text-center" style={{ background: "var(--hero-gradient)" }}>
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div className="flex flex-col items-center">
            <Users className="w-10 h-10 text-primary-foreground/80 mb-3" aria-hidden="true" />
            <span className="text-4xl md:text-5xl font-black text-primary-foreground">7.135</span>
            <span className="text-sm text-primary-foreground/80 mt-1 font-semibold">Pessoas com deficiência</span>
          </div>
          <div className="flex flex-col items-center">
            <BarChart3 className="w-10 h-10 text-primary-foreground/80 mb-3" aria-hidden="true" />
            <span className="text-4xl md:text-5xl font-black text-primary-foreground">Jaú</span>
            <span className="text-sm text-primary-foreground/80 mt-1 font-semibold">Município</span>
          </div>
          <div className="flex flex-col items-center">
            <TrendingUp className="w-10 h-10 text-primary-foreground/80 mb-3" aria-hidden="true" />
            <span className="text-4xl md:text-5xl font-black text-primary-foreground">100%</span>
            <span className="text-sm text-primary-foreground/80 mt-1 font-semibold">Compromisso</span>
          </div>
        </div>
        <p className="text-primary-foreground/85 max-w-2xl mx-auto leading-relaxed">
          Esses dados são fundamentais para o planejamento de políticas públicas, distribuição de recursos e desenvolvimento de ações inclusivas.
        </p>
        <Link to="/admin" className="inline-flex items-center gap-2 mt-6 bg-primary-foreground text-primary font-bold px-6 py-3 rounded-full hover:shadow-lg transition-all hover:scale-105">
          Ver dados completos <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default HomeStats;
