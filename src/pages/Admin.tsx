import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const ADMIN_PASSWORD = "cmpcd2024";

const tipoDeficiencia = [
  { name: "Física", value: 2340, color: "hsl(204, 67%, 52%)" },
  { name: "Auditiva", value: 1120, color: "hsl(195, 84%, 64%)" },
  { name: "Visual", value: 980, color: "hsl(28, 87%, 62%)" },
  { name: "Intelectual", value: 1450, color: "hsl(145, 50%, 62%)" },
  { name: "Múltipla", value: 780, color: "hsl(280, 50%, 62%)" },
  { name: "TEA", value: 465, color: "hsl(0, 78%, 63%)" },
];

const faixaEtaria = [
  { faixa: "0-17", quantidade: 890 },
  { faixa: "18-29", quantidade: 1240 },
  { faixa: "30-44", quantidade: 1680 },
  { faixa: "45-59", quantidade: 1825 },
  { faixa: "60+", quantidade: 1500 },
];

const escolaridade = [
  { nivel: "Não alfab.", quantidade: 420 },
  { nivel: "Fund.", quantidade: 2100 },
  { nivel: "Médio", quantidade: 2850 },
  { nivel: "Superior", quantidade: 1340 },
  { nivel: "Pós-grad.", quantidade: 425 },
];

const bairros = [
  { bairro: "Centro", quantidade: 980 },
  { bairro: "Vila Nova", quantidade: 720 },
  { bairro: "Jd. América", quantidade: 650 },
  { bairro: "Vila Industrial", quantidade: 890 },
  { bairro: "Pq. das Flores", quantidade: 540 },
  { bairro: "São Paulo", quantidade: 760 },
  { bairro: "Outros", quantidade: 2595 },
];

const stats = [
  { label: "Total de PCDs", valor: "7.135" },
  { label: "Recebem BPC/LOAS", valor: "2.450" },
  { label: "Usam Tec. Assistiva", valor: "1.820" },
  { label: "Em entidades", valor: "1.340" },
];

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  };

  if (!authenticated) {
    return (
      <PageLayout>
        <PageHero title="Área Administrativa" subtitle="Acesso restrito aos membros do conselho" />
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
              <h2 className="text-xl font-bold text-foreground text-center mb-6">Entrar no Painel</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite a senha de acesso"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    className="pr-10"
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
                <Button type="submit" className="w-full rounded-full">
                  Acessar
                </Button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Acesso exclusivo para administradores do CMPCD Jaú.
              </p>
            </motion.div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHero title="Painel Administrativo" subtitle="Dados sociais e estatísticas do município" />

      <section className="py-16 bg-background">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-end mb-8">
            <Button variant="outline" onClick={() => setAuthenticated(false)} className="rounded-full">
              Sair do Painel
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6 text-center"
                style={{ background: "var(--hero-gradient)" }}
              >
                <span className="text-3xl md:text-4xl font-black text-primary-foreground">{s.valor}</span>
                <p className="text-sm text-primary-foreground/80 font-semibold mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
              <h3 className="text-lg font-bold text-foreground mb-4">Tipo de Deficiência</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={tipoDeficiencia} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {tipoDeficiencia.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
              <h3 className="text-lg font-bold text-foreground mb-4">Faixa Etária</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={faixaEtaria}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 88%)" />
                  <XAxis dataKey="faixa" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="quantidade" fill="hsl(204, 67%, 52%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
              <h3 className="text-lg font-bold text-foreground mb-4">Escolaridade</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={escolaridade} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 88%)" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="nivel" tick={{ fontSize: 12 }} width={80} />
                  <Tooltip />
                  <Bar dataKey="quantidade" fill="hsl(195, 84%, 64%)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
              <h3 className="text-lg font-bold text-foreground mb-4">Por Bairro/Região</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bairros}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 88%)" />
                  <XAxis dataKey="bairro" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="quantidade" fill="hsl(204, 67%, 52%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <div className="mt-12 bg-card rounded-2xl p-6 border border-border text-center" style={{ boxShadow: "var(--card-shadow)" }}>
            <p className="text-sm text-muted-foreground">
              <strong>Nota:</strong> Todos os dados são anonimizados e apresentados de forma agregada, em conformidade com a LGPD. Nenhuma informação pessoal identificável é exibida nesta página.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Admin;
