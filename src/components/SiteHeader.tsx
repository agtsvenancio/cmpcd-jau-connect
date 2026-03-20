import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Accessibility, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Iniciativas", href: "/iniciativas" },
  { label: "Notícias", href: "/noticias" },
  { label: "Transparência", href: "/transparencia" },
  { label: "Apoio", href: "/apoio" },
  { label: "Contato", href: "/contato" },
];

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-primary">
          <Accessibility className="w-7 h-7" aria-hidden="true" />
          <span>CMPCD Jaú</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-semibold transition-colors ${location.pathname === item.href ? "text-primary" : "text-foreground/70 hover:text-primary"}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/cadastro-pcd"
            className="text-sm font-bold bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
          >
            Registrar PCD
          </Link>
          <Link
            to="/admin"
            className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            Admin
          </Link>
        </nav>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-card border-b border-border overflow-hidden"
            aria-label="Menu mobile"
          >
            <div className="container flex flex-col gap-3 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-semibold transition-colors ${location.pathname === item.href ? "text-primary" : "text-foreground/70 hover:text-primary"}`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/cadastro-pcd"
                onClick={() => setOpen(false)}
                className="text-sm font-bold bg-primary text-primary-foreground px-4 py-2 rounded-full text-center hover:bg-primary/90 transition-colors mt-2"
              >
                Registrar PCD
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SiteHeader;
