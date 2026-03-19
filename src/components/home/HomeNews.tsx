import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { noticias } from "@/data/noticias";

const HomeNews = () => {
  const destaques = noticias.filter((n) => n.destaque).slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4">Últimas Notícias</h2>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {destaques.map((noticia, i) => (
            <motion.article key={noticia.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-background rounded-2xl border border-border overflow-hidden hover:-translate-y-1 transition-all duration-300" style={{ boxShadow: "var(--card-shadow)" }}>
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

        <div className="text-center mt-10">
          <Link to="/noticias" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
            Ver todas as notícias <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeNews;
