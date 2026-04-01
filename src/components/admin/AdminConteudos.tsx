import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Save, Building2, Users, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getPresidentes, savePresidente, updatePresidente, deletePresidente,
  getMembros, saveMembro, updateMembro, deleteMembro,
  getEstrutura, saveEstruturaItem, updateEstruturaItem, deleteEstruturaItem,
  type Presidente, type MembroConselho, type EstruturaItem,
} from "@/lib/contentStorage";
import { useToast } from "@/hooks/use-toast";

const AdminConteudos = () => {
  const { toast } = useToast();

  // Presidentes
  const [presidentes, setPresidentes] = useState<Presidente[]>(() => getPresidentes().sort((a, b) => a.ordem - b.ordem));
  const [newPres, setNewPres] = useState({ nome: "", foto: "", descricao: "" });

  const addPresidente = () => {
    if (!newPres.nome || !newPres.descricao) return;
    savePresidente({ ...newPres, ordem: presidentes.length + 1 });
    setPresidentes(getPresidentes().sort((a, b) => a.ordem - b.ordem));
    setNewPres({ nome: "", foto: "", descricao: "" });
    toast({ title: "Presidente adicionado" });
  };

  const removePresidente = (id: string) => {
    deletePresidente(id);
    setPresidentes(getPresidentes().sort((a, b) => a.ordem - b.ordem));
  };

  const editPresidente = (id: string, data: Partial<Presidente>) => {
    updatePresidente(id, data);
    setPresidentes(getPresidentes().sort((a, b) => a.ordem - b.ordem));
  };

  // Membros
  const [membros, setMembros] = useState<MembroConselho[]>(() => getMembros().sort((a, b) => a.ordem - b.ordem));
  const [newMembro, setNewMembro] = useState({ nome: "", cargo: "", foto: "" });

  const addMembro = () => {
    if (!newMembro.nome || !newMembro.cargo) return;
    saveMembro({ ...newMembro, ordem: membros.length + 1 });
    setMembros(getMembros().sort((a, b) => a.ordem - b.ordem));
    setNewMembro({ nome: "", cargo: "", foto: "" });
    toast({ title: "Membro adicionado" });
  };

  const removeMembro = (id: string) => {
    deleteMembro(id);
    setMembros(getMembros().sort((a, b) => a.ordem - b.ordem));
  };

  const editMembro = (id: string, data: Partial<MembroConselho>) => {
    updateMembro(id, data);
    setMembros(getMembros().sort((a, b) => a.ordem - b.ordem));
  };

  // Estrutura
  const [estrutura, setEstrutura] = useState<EstruturaItem[]>(() => getEstrutura().sort((a, b) => a.ordem - b.ordem));
  const [newEstrutura, setNewEstrutura] = useState({ titulo: "", nivel: 0 });

  const addEstrutura = () => {
    if (!newEstrutura.titulo) return;
    saveEstruturaItem({ ...newEstrutura, ordem: estrutura.length + 1 });
    setEstrutura(getEstrutura().sort((a, b) => a.ordem - b.ordem));
    setNewEstrutura({ titulo: "", nivel: 0 });
    toast({ title: "Item adicionado" });
  };

  const removeEstrutura = (id: string) => {
    deleteEstruturaItem(id);
    setEstrutura(getEstrutura().sort((a, b) => a.ordem - b.ordem));
  };

  const editEstrutura = (id: string, data: Partial<EstruturaItem>) => {
    updateEstruturaItem(id, data);
    setEstrutura(getEstrutura().sort((a, b) => a.ordem - b.ordem));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-foreground">Gestão de Conteúdos</h3>

      <Tabs defaultValue="presidentes" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="estrutura" className="gap-2"><Building2 className="w-4 h-4" /> Estrutura</TabsTrigger>
          <TabsTrigger value="membros" className="gap-2"><Users className="w-4 h-4" /> Membros</TabsTrigger>
          <TabsTrigger value="presidentes" className="gap-2"><Crown className="w-4 h-4" /> Presidentes</TabsTrigger>
        </TabsList>

        {/* Estrutura */}
        <TabsContent value="estrutura" className="space-y-4 mt-6">
          <div className="bg-card rounded-2xl p-6 border border-border space-y-3" style={{ boxShadow: "var(--card-shadow)" }}>
            <h4 className="font-semibold text-foreground mb-2">Itens da Estrutura</h4>
            {estrutura.map((e) => (
              <div key={e.id} className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border">
                <Input value={e.titulo} onChange={(ev) => editEstrutura(e.id, { titulo: ev.target.value })} className="flex-1" />
                <select value={e.nivel} onChange={(ev) => editEstrutura(e.id, { nivel: Number(ev.target.value) })} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option value={0}>Nível 0 (Topo)</option>
                  <option value={1}>Nível 1</option>
                  <option value={2}>Nível 2</option>
                  <option value={3}>Nível 3 (Base)</option>
                </select>
                <Button variant="ghost" size="sm" onClick={() => removeEstrutura(e.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <Input placeholder="Novo item" value={newEstrutura.titulo} onChange={(e) => setNewEstrutura({ ...newEstrutura, titulo: e.target.value })} className="flex-1" />
              <select value={newEstrutura.nivel} onChange={(e) => setNewEstrutura({ ...newEstrutura, nivel: Number(e.target.value) })} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value={0}>Nível 0</option>
                <option value={1}>Nível 1</option>
                <option value={2}>Nível 2</option>
                <option value={3}>Nível 3</option>
              </select>
              <Button onClick={addEstrutura} size="sm" className="gap-2 rounded-full"><Plus className="w-4 h-4" /> Adicionar</Button>
            </div>
          </div>
        </TabsContent>

        {/* Membros */}
        <TabsContent value="membros" className="space-y-4 mt-6">
          <div className="bg-card rounded-2xl p-6 border border-border space-y-3" style={{ boxShadow: "var(--card-shadow)" }}>
            <h4 className="font-semibold text-foreground mb-2">Membros do Conselho</h4>
            {membros.map((m) => (
              <div key={m.id} className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border">
                <img src={m.foto || "/placeholder.svg"} alt={m.nome} className="w-10 h-10 rounded-full object-cover border-2 border-primary/20 shrink-0" />
                <Input value={m.nome} onChange={(e) => editMembro(m.id, { nome: e.target.value })} placeholder="Nome" className="flex-1" />
                <Input value={m.cargo} onChange={(e) => editMembro(m.id, { cargo: e.target.value })} placeholder="Cargo" className="w-36" />
                <Input value={m.foto} onChange={(e) => editMembro(m.id, { foto: e.target.value })} placeholder="URL da foto" className="w-48" />
                <Button variant="ghost" size="sm" onClick={() => removeMembro(m.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <Input placeholder="Nome" value={newMembro.nome} onChange={(e) => setNewMembro({ ...newMembro, nome: e.target.value })} className="flex-1" />
              <Input placeholder="Cargo" value={newMembro.cargo} onChange={(e) => setNewMembro({ ...newMembro, cargo: e.target.value })} className="w-36" />
              <Input placeholder="URL da foto" value={newMembro.foto} onChange={(e) => setNewMembro({ ...newMembro, foto: e.target.value })} className="w-48" />
              <Button onClick={addMembro} size="sm" className="gap-2 rounded-full"><Plus className="w-4 h-4" /> Adicionar</Button>
            </div>
          </div>
        </TabsContent>

        {/* Presidentes */}
        <TabsContent value="presidentes" className="space-y-4 mt-6">
          <div className="bg-card rounded-2xl p-6 border border-border space-y-4" style={{ boxShadow: "var(--card-shadow)" }}>
            <h4 className="font-semibold text-foreground mb-2">Histórias dos Presidentes</h4>
            {presidentes.map((p) => (
              <div key={p.id} className="p-4 bg-background rounded-xl border border-border space-y-3">
                <div className="flex items-center gap-3">
                  <img src={p.foto || "/placeholder.svg"} alt={p.nome} className="w-12 h-12 rounded-lg object-cover border-2 border-primary/20 shrink-0" />
                  <Input value={p.nome} onChange={(e) => editPresidente(p.id, { nome: e.target.value })} placeholder="Nome" className="flex-1" />
                  <Input value={p.foto} onChange={(e) => editPresidente(p.id, { foto: e.target.value })} placeholder="URL da foto" className="w-48" />
                  <Button variant="ghost" size="sm" onClick={() => removePresidente(p.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </div>
                <Textarea value={p.descricao} onChange={(e) => editPresidente(p.id, { descricao: e.target.value })} placeholder="Descrição dos feitos" rows={3} />
              </div>
            ))}
            <div className="p-4 bg-muted/30 rounded-xl border border-dashed border-border space-y-3">
              <p className="text-sm font-semibold text-muted-foreground">Novo Presidente</p>
              <div className="flex items-center gap-3">
                <Input placeholder="Nome" value={newPres.nome} onChange={(e) => setNewPres({ ...newPres, nome: e.target.value })} className="flex-1" />
                <Input placeholder="URL da foto" value={newPres.foto} onChange={(e) => setNewPres({ ...newPres, foto: e.target.value })} className="w-48" />
              </div>
              <Textarea placeholder="Descrição dos feitos" value={newPres.descricao} onChange={(e) => setNewPres({ ...newPres, descricao: e.target.value })} rows={3} />
              <Button onClick={addPresidente} size="sm" className="gap-2 rounded-full"><Plus className="w-4 h-4" /> Adicionar Presidente</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminConteudos;
