import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Search } from "lucide-react";
import { noticias, categorias } from "@/data/noticias";

const Noticias = () => {
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");

  const filtradas = noticias.filter((n) => {
    const matchBusca = n.titulo.toLowerCase().includes(busca.toLowerCase()) || n.resumo.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoriaAtiva === "Todas" || n.categoria === categoriaAtiva;
    return matchBusca && matchCategoria;
  });

  return (
    <PageLayout>
      <PageHero title="Notícias" subtitle="Fique por dentro das ações e novidades do CMPCD Jaú" />

      <section className="py-16 bg-background">
        <div className="container px-4 max-w-6xl mx-auto">
          {/* Busca e filtros */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                placeholder="Buscar notícias..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Buscar notícias"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoriaAtiva(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${categoriaAtiva === cat ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border hover:border-primary/30"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtradas.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Nenhuma notícia encontrada.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtradas.map((noticia, i) => (
                <motion.article key={noticia.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl border border-border overflow-hidden hover:-translate-y-1 transition-all duration-300" style={{ boxShadow: "var(--card-shadow)" }}>
                  <img src={noticia.imagem} alt={noticia.titulo} className="w-full h-48 object-cover" loading="lazy" />
                  <div className="p-6">
                    <span className="inline-block text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">{noticia.categoria}</span>
                    <h3 className="font-bold text-foreground mb-2 line-clamp-2">{noticia.titulo}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{noticia.resumo}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" aria-hidden="true" /> {new Date(noticia.data).toLocaleDateString("pt-BR")}
                      </span>
                      <Link to={`/noticias/${noticia.id}`} className="text-sm text-primary font-bold hover:underline inline-flex items-center gap-1">
                        Ler mais <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Noticias;
