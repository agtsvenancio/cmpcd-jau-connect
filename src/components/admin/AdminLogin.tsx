import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authenticate, setSession, type AdminUser } from "@/lib/adminAuth";

interface AdminLoginProps {
  onLogin: (user: AdminUser) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = authenticate(username, password);
    if (user) {
      setSession(user);
      onLogin(user);
    } else {
      setError("Usuário ou senha incorretos.");
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-8 border border-border"
          style={{ boxShadow: "var(--card-shadow)" }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-foreground text-center mb-6">
            Entrar no Painel
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                className="pl-10"
                aria-label="Nome de usuário"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className="pl-10 pr-10"
                aria-label="Senha de acesso"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-sm text-destructive font-medium">{error}</p>}
            <Button type="submit" className="w-full rounded-full">Acessar</Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Acesso exclusivo para administradores do CMPCD Jaú.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AdminLogin;
