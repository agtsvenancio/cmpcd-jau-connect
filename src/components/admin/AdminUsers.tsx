import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Trash2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getUsers, createUser, deleteUser,
  roleLabels, type AdminUser,
} from "@/lib/adminAuth";

interface AdminUsersProps {
  currentUser: AdminUser;
}

const AdminUsers = ({ currentUser }: AdminUsersProps) => {
  const [users, setUsers] = useState<AdminUser[]>(getUsers);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", name: "", role: "admin_parcial" as AdminUser["role"] });
  const [error, setError] = useState("");

  const refresh = () => setUsers(getUsers());

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.password || !form.name) {
      setError("Preencha todos os campos.");
      return;
    }
    try {
      createUser(form);
      refresh();
      setForm({ username: "", password: "", name: "", role: "admin_parcial" });
      setShowForm(false);
      setError("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = (id: string) => {
    if (id === currentUser.id) return;
    deleteUser(id);
    refresh();
  };

  const isTotal = currentUser.role === "admin_total";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Gestão de Usuários</h3>
        {isTotal && (
          <Button onClick={() => setShowForm(!showForm)} className="rounded-full gap-2" size="sm">
            <UserPlus className="w-4 h-4" />
            Novo Usuário
          </Button>
        )}
      </div>

      {showForm && isTotal && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleCreate}
          className="bg-card rounded-2xl p-6 border border-border space-y-4"
          style={{ boxShadow: "var(--card-shadow)" }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Nome completo" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Nome de usuário" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <Input type="password" placeholder="Senha" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as AdminUser["role"] })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="admin_total">Admin Total</option>
              <option value="admin_parcial">Admin Parcial</option>
            </select>
          </div>
          {error && <p className="text-sm text-destructive font-medium">{error}</p>}
          <div className="flex gap-2">
            <Button type="submit" size="sm" className="rounded-full">Criar Usuário</Button>
            <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => setShowForm(false)}>Cancelar</Button>
          </div>
        </motion.form>
      )}

      <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: "var(--card-shadow)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-semibold text-foreground">Nome</th>
                <th className="text-left p-4 font-semibold text-foreground">Usuário</th>
                <th className="text-left p-4 font-semibold text-foreground">Perfil</th>
                <th className="text-left p-4 font-semibold text-foreground">Criado em</th>
                {isTotal && <th className="text-center p-4 font-semibold text-foreground">Ações</th>}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-foreground font-medium">{u.name}</td>
                  <td className="p-4 text-muted-foreground">{u.username}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                      <Shield className="w-3 h-3" />
                      {roleLabels[u.role]}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(u.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  {isTotal && (
                    <td className="p-4 text-center">
                      {u.id !== currentUser.id ? (
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(u.id)} className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">Você</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
