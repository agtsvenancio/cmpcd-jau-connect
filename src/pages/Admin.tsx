import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, ClipboardList } from "lucide-react";
import { getSession, clearSession, type AdminUser, roleLabels } from "@/lib/adminAuth";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminCadastros from "@/components/admin/AdminCadastros";

const Admin = () => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [tab, setTab] = useState<"dashboard" | "cadastros" | "users">("dashboard");

  useEffect(() => {
    const session = getSession();
    if (session) setUser(session);
  }, []);

  const handleLogout = () => {
    clearSession();
    setUser(null);
  };

  if (!user) {
    return (
      <PageLayout>
        <PageHero title="Área Administrativa" subtitle="Acesso restrito aos membros do conselho" />
        <AdminLogin onLogin={setUser} />
      </PageLayout>
    );
  }

  const isTotal = user.role === "admin_total";

  return (
    <PageLayout>
      <PageHero title="Painel Administrativo" subtitle="Dados sociais e estatísticas do município" />
      <section className="py-16 bg-background">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Olá, <strong className="text-foreground">{user.name}</strong> · {roleLabels[user.role]}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant={tab === "dashboard" ? "default" : "outline"} size="sm" className="rounded-full gap-2" onClick={() => setTab("dashboard")}>
                <BarChart3 className="w-4 h-4" /> Dashboard
              </Button>
              {isTotal && (
                <>
                  <Button variant={tab === "cadastros" ? "default" : "outline"} size="sm" className="rounded-full gap-2" onClick={() => setTab("cadastros")}>
                    <ClipboardList className="w-4 h-4" /> Cadastrados
                  </Button>
                  <Button variant={tab === "users" ? "default" : "outline"} size="sm" className="rounded-full gap-2" onClick={() => setTab("users")}>
                    <Users className="w-4 h-4" /> Usuários
                  </Button>
                </>
              )}
              <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full">Sair</Button>
            </div>
          </div>

          {tab === "dashboard" && <AdminDashboard />}
          {tab === "cadastros" && isTotal && <AdminCadastros />}
          {tab === "users" && isTotal && <AdminUsers currentUser={user} />}
        </div>
      </section>
    </PageLayout>
  );
};

export default Admin;
