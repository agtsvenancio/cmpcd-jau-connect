import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const HeroSection = () => (
  <section
    id="inicio"
    className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
    style={{ background: "var(--hero-gradient)" }}
  >
    {/* Decorative circles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-foreground/10" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-primary-foreground/10" />
    </div>

    <div className="container relative z-10 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-flex items-center gap-2 bg-primary-foreground/15 rounded-full px-5 py-2 mb-8">
          <Heart className="w-4 h-4 text-primary-foreground" />
          <span className="text-sm font-semibold text-primary-foreground">Inclusão e Cidadania</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight max-w-4xl mx-auto">
          Conselho Municipal da Pessoa com Deficiência de Jaú
        </h1>

        <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto font-medium">
          Promovendo inclusão, acessibilidade e cidadania
        </p>

        <a
          href="#sobre"
          className="mt-10 inline-block bg-primary-foreground text-primary font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all hover:scale-105"
        >
          Conheça o Conselho
        </a>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
