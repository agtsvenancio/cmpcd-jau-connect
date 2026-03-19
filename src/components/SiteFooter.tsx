import { Link } from "react-router-dom";
import { Accessibility, Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const SiteFooter = () => (
  <footer className="py-12" style={{ background: "var(--hero-gradient)" }}>
    <div className="container px-4">
      <div className="grid md:grid-cols-3 gap-10 mb-10">
        {/* About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Accessibility className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
            <span className="font-extrabold text-lg text-primary-foreground">CMPCD Jaú</span>
          </div>
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            Conselho Municipal dos Direitos da Pessoa com Deficiência de Jaú. Parceria com a Secretaria de Assistência e Desenvolvimento Social.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold text-primary-foreground mb-4">Links Úteis</h3>
          <nav className="flex flex-col gap-2" aria-label="Links do rodapé">
            <Link to="/quem-somos" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Quem Somos</Link>
            <Link to="/transparencia" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Transparência</Link>
            <Link to="/noticias" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Notícias</Link>
            <Link to="/cadastro-pcd" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Registrar PCD</Link>
            <Link to="/contato" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contato</Link>
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-primary-foreground mb-4">Contato</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Rua Exemplo, 123 - Centro, Jaú - SP</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>(14) 3622-0000</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>cmpcd@jau.sp.gov.br</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 pt-6 text-center">
        <p className="text-primary-foreground/60 text-xs">
          © {new Date().getFullYear()} CMPCD Jaú — Conselho Municipal dos Direitos da Pessoa com Deficiência. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
