import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Users, FileText, ClipboardList, LogIn } from "lucide-react";

const HeroSection = () => (
  <section
    className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    style={{ background: "var(--hero-gradient)" }}
  >
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-foreground/10" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-primary-foreground/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-foreground/5" />
    </div>

    <div className="container relative z-10 text-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="inline-flex items-center gap-2 bg-primary-foreground/15 rounded-full px-5 py-2 mb-8">
          <Heart className="w-4 h-4 text-primary-foreground" aria-hidden="true" />
          <span className="text-sm font-semibold text-primary-foreground">Inclusão, Acessibilidade e Cidadania</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight max-w-5xl mx-auto">
          Conselho Municipal dos Direitos da Pessoa com Deficiência de Jaú
        </h1>

        <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto font-medium">
          Promovendo inclusão, acessibilidade e cidadania para todas as pessoas
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/quem-somos" className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-bold px-6 py-3 rounded-full hover:shadow-lg transition-all hover:scale-105">
            <Users className="w-5 h-5" aria-hidden="true" /> Conheça o Conselho
          </Link>
          <Link to="/cadastro-pcd" className="inline-flex items-center gap-2 bg-primary-foreground/20 text-primary-foreground font-bold px-6 py-3 rounded-full hover:bg-primary-foreground/30 transition-all border border-primary-foreground/30">
            <ClipboardList className="w-5 h-5" aria-hidden="true" /> Registrar PCD
          </Link>
          <Link to="/noticias" className="inline-flex items-center gap-2 bg-primary-foreground/20 text-primary-foreground font-bold px-6 py-3 rounded-full hover:bg-primary-foreground/30 transition-all border border-primary-foreground/30">
            <FileText className="w-5 h-5" aria-hidden="true" /> Notícias
          </Link>
          <Link to="/transparencia" className="inline-flex items-center gap-2 bg-primary-foreground/20 text-primary-foreground font-bold px-6 py-3 rounded-full hover:bg-primary-foreground/30 transition-all border border-primary-foreground/30">
            <LogIn className="w-5 h-5" aria-hidden="true" /> Transparência
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
