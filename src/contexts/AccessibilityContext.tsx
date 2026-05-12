import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AccessibilityState {
  fontSize: number;
  highContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  readingMode: boolean;
  speaking: boolean;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  toggleHighContrast: () => void;
  toggleGrayscale: () => void;
  toggleHighlightLinks: () => void;
  toggleReadingMode: () => void;
  toggleSpeak: () => void;
  resetAll: () => void;
}

const AccessibilityContext = createContext<AccessibilityState | null>(null);

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be inside AccessibilityProvider");
  return ctx;
};

const STORAGE_KEY = "cmpcd-a11y-prefs";

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [readingMode, setReadingMode] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // Load saved preferences
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const p = JSON.parse(raw);
      if (typeof p.fontSize === "number") setFontSize(p.fontSize);
      setHighContrast(!!p.highContrast);
      setGrayscale(!!p.grayscale);
      setHighlightLinks(!!p.highlightLinks);
      setReadingMode(!!p.readingMode);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ fontSize, highContrast, grayscale, highlightLinks, readingMode })
      );
    } catch {}
  }, [fontSize, highContrast, grayscale, highlightLinks, readingMode]);

  const increaseFontSize = () => setFontSize((s) => Math.min(s + 10, 200));
  const decreaseFontSize = () => setFontSize((s) => Math.max(s - 10, 80));
  const resetFontSize = () => setFontSize(100);
  const toggleHighContrast = () => setHighContrast((v) => !v);
  const toggleGrayscale = () => setGrayscale((v) => !v);
  const toggleHighlightLinks = () => setHighlightLinks((v) => !v);
  const toggleReadingMode = () => setReadingMode((v) => !v);

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const toggleSpeak = () => {
    if (!("speechSynthesis" in window)) {
      alert("Seu navegador não suporta leitura de tela automática.");
      return;
    }
    if (speaking) {
      stopSpeaking();
      return;
    }
    const main = document.querySelector("main") || document.body;
    const text = (main.innerText || "").replace(/\s+/g, " ").trim().slice(0, 6000);
    if (!text) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "pt-BR";
    utter.rate = 1;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
  };

  const resetAll = () => {
    setFontSize(100);
    setHighContrast(false);
    setGrayscale(false);
    setHighlightLinks(false);
    setReadingMode(false);
    stopSpeaking();
  };

  const classes = [
    highContrast && "high-contrast",
    grayscale && "a11y-grayscale",
    highlightLinks && "a11y-highlight-links",
    readingMode && "a11y-reading-mode",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        highContrast,
        grayscale,
        highlightLinks,
        readingMode,
        speaking,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        toggleHighContrast,
        toggleGrayscale,
        toggleHighlightLinks,
        toggleReadingMode,
        toggleSpeak,
        resetAll,
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:font-bold"
      >
        Pular para o conteúdo
      </a>
      <div style={{ fontSize: `${fontSize}%` }} className={classes}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};
