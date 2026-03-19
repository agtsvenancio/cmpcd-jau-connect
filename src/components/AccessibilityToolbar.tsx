import { useState } from "react";
import { Accessibility, Plus, Minus, RotateCcw, Contrast } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { motion, AnimatePresence } from "framer-motion";

const AccessibilityToolbar = () => {
  const [open, setOpen] = useState(false);
  const { increaseFontSize, decreaseFontSize, resetFontSize, toggleHighContrast, fontSize, highContrast } = useAccessibility();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-3 bg-card border border-border rounded-xl p-3 shadow-lg flex flex-col gap-2 min-w-[180px]"
          >
            <p className="text-xs font-bold text-foreground mb-1">Acessibilidade</p>
            <button onClick={increaseFontSize} className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors p-1 rounded" aria-label="Aumentar fonte">
              <Plus className="w-4 h-4" /> Aumentar fonte
            </button>
            <button onClick={decreaseFontSize} className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors p-1 rounded" aria-label="Diminuir fonte">
              <Minus className="w-4 h-4" /> Diminuir fonte
            </button>
            <button onClick={resetFontSize} className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors p-1 rounded" aria-label="Resetar fonte">
              <RotateCcw className="w-4 h-4" /> Fonte padrão ({fontSize}%)
            </button>
            <button onClick={toggleHighContrast} className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors p-1 rounded" aria-label="Alto contraste">
              <Contrast className="w-4 h-4" /> {highContrast ? "Contraste normal" : "Alto contraste"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        aria-label="Opções de acessibilidade"
      >
        <Accessibility className="w-7 h-7" />
      </button>
    </div>
  );
};

export default AccessibilityToolbar;
