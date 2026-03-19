import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const tipoDeficiencia = [
  { name: "Física", value: 2340, color: "#2D9CDB" },
  { name: "Auditiva", value: 1120, color: "#56CCF2" },
  { name: "Visual", value: 980, color: "#F2994A" },
  { name: "Intelectual", value: 1450, color: "#6FCF97" },
  { name: "Múltipla", value: 780, color: "#BB6BD9" },
  { name: "TEA", value: 465, color: "#EB5757" },
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

const DadosSociais = () => (
  <PageLayout>
    <PageHero title="Dados Sociais" subtitle="Estatísticas anonimizadas sobre pessoas com deficiência em Jaú" />

    <section className="py-16 bg-background">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl p-6 text-center" style={{ background: "var(--hero-gradient)" }}>
              <span className="text-3xl md:text-4xl font-black text-primary-foreground">{s.valor}</span>
              <p className="text-sm text-primary-foreground/80 font-semibold mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tipo de Deficiência */}
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

          {/* Faixa Etária */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
            <h3 className="text-lg font-bold text-foreground mb-4">Faixa Etária</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={faixaEtaria}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 88%)" />
                <XAxis dataKey="faixa" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="quantidade" fill="hsl(204 67% 52%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Escolaridade */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
            <h3 className="text-lg font-bold text-foreground mb-4">Escolaridade</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={escolaridade} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 88%)" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="nivel" tick={{ fontSize: 12 }} width={80} />
                <Tooltip />
                <Bar dataKey="quantidade" fill="hsl(195 84% 64%)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Por Bairro */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-6 border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
            <h3 className="text-lg font-bold text-foreground mb-4">Por Bairro/Região</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bairros}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 88%)" />
                <XAxis dataKey="bairro" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="quantidade" fill="hsl(204 67% 52%)" radius={[8, 8, 0, 0]} />
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

export default DadosSociais;
