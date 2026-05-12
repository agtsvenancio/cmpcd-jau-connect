import { useState } from "react";
import { Accessibility, Plus, Minus, RotateCcw, Contrast, Volume2, VolumeX, Link2, Droplet, BookOpen } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { motion, AnimatePresence } from "framer-motion";

const AccessibilityToolbar = () => {
  const [open, setOpen] = useState(false);
  const a = useAccessibility();

  const Btn = ({ onClick, icon: Icon, label, active }: any) => (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-2 text-sm transition-colors p-2 rounded ${active ? "bg-primary text-primary-foreground font-bold" : "text-foreground hover:bg-muted"}`}
    >
      <Icon className="w-4 h-4 shrink-0" /> <span>{label}</span>
    </button>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-3 bg-card border border-border rounded-xl p-3 shadow-lg flex flex-col gap-1 min-w-[240px] max-h-[80vh] overflow-y-auto"
            role="dialog"
            aria-label="Opções de acessibilidade"
          >
            <p className="text-xs font-bold text-foreground mb-1 px-2 pt-1">Acessibilidade</p>

            <Btn onClick={a.increaseFontSize} icon={Plus} label="Aumentar fonte" />
            <Btn onClick={a.decreaseFontSize} icon={Minus} label="Diminuir fonte" />
            <Btn onClick={a.resetFontSize} icon={RotateCcw} label={`Fonte padrão (${a.fontSize}%)`} />

            <div className="h-px bg-border my-1" />

            <Btn onClick={a.toggleHighContrast} icon={Contrast} label="Alto contraste" active={a.highContrast} />
            <Btn onClick={a.toggleGrayscale} icon={Droplet} label="Escala de cinza" active={a.grayscale} />
            <Btn onClick={a.toggleHighlightLinks} icon={Link2} label="Destacar links" active={a.highlightLinks} />
            <Btn onClick={a.toggleReadingMode} icon={BookOpen} label="Modo leitura" active={a.readingMode} />

            <div className="h-px bg-border my-1" />

            <Btn
              onClick={a.toggleSpeak}
              icon={a.speaking ? VolumeX : Volume2}
              label={a.speaking ? "Parar leitura" : "Ler página"}
              active={a.speaking}
            />

            <div className="h-px bg-border my-1" />

            <button
              onClick={a.resetAll}
              className="text-xs text-muted-foreground hover:text-primary transition-colors p-2 rounded text-left"
            >
              Restaurar padrões
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-primary/40"
        aria-label="Opções de acessibilidade"
        aria-expanded={open}
      >
        <Accessibility className="w-7 h-7" />
      </button>
    </div>
  );
};

export default AccessibilityToolbar;
