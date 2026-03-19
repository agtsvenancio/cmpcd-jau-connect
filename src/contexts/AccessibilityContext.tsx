import { createContext, useContext, useState, ReactNode } from "react";

interface AccessibilityState {
  fontSize: number;
  highContrast: boolean;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityState | null>(null);

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be inside AccessibilityProvider");
  return ctx;
};

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  const increaseFontSize = () => setFontSize((s) => Math.min(s + 10, 150));
  const decreaseFontSize = () => setFontSize((s) => Math.max(s - 10, 80));
  const resetFontSize = () => setFontSize(100);
  const toggleHighContrast = () => setHighContrast((v) => !v);

  return (
    <AccessibilityContext.Provider value={{ fontSize, highContrast, increaseFontSize, decreaseFontSize, resetFontSize, toggleHighContrast }}>
      <div
        style={{ fontSize: `${fontSize}%` }}
        className={highContrast ? "high-contrast" : ""}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};
