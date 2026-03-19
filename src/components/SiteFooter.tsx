import { Accessibility } from "lucide-react";

const SiteFooter = () => (
  <footer className="py-10 text-center" style={{ background: "var(--hero-gradient)" }}>
    <div className="container px-4">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Accessibility className="w-5 h-5 text-primary-foreground" />
        <span className="font-bold text-primary-foreground">CMPCD Jaú</span>
      </div>
      <p className="text-primary-foreground/80 text-sm">
        Conselho Municipal da Pessoa com Deficiência
      </p>
      <p className="text-primary-foreground/60 text-sm mt-1">
        Parceria com a Secretaria de Assistência e Desenvolvimento Social
      </p>
      <p className="text-primary-foreground/40 text-xs mt-6">
        © {new Date().getFullYear()} CMPCD Jaú — Todos os direitos reservados
      </p>
    </div>
  </footer>
);

export default SiteFooter;
