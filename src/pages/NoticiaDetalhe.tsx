import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { noticias } from "@/data/noticias";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";

const NoticiaDetalhe = () => {
  const { id } = useParams();
  const noticia = noticias.find((n) => n.id === id);

  if (!noticia) {
    return (
      <PageLayout>
        <div className="py-32 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Notícia não encontrada</h1>
          <Link to="/noticias" className="text-primary font-bold hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Voltar para notícias
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <article>
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img src={noticia.imagem} alt={noticia.titulo} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 container">
            <span className="inline-block text-xs font-bold text-primary-foreground bg-primary px-3 py-1 rounded-full mb-3">{noticia.categoria}</span>
            <h1 className="text-2xl md:text-4xl font-black text-primary-foreground max-w-3xl">{noticia.titulo}</h1>
          </div>
        </div>

        <div className="container px-4 max-w-3xl mx-auto py-12">
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 border-b border-border pb-6">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(noticia.data).toLocaleDateString("pt-BR")}</span>
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> {noticia.autor}</span>
            <span className="flex items-center gap-1"><Tag className="w-4 h-4" /> {noticia.categoria}</span>
          </div>

          <div className="prose prose-lg max-w-none text-foreground">
            {noticia.conteudo.split("\n\n").map((p, i) => (
              <p key={i} className="mb-4 leading-relaxed text-muted-foreground">{p}</p>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-border">
            <Link to="/noticias" className="text-primary font-bold hover:underline inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Voltar para notícias
            </Link>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default NoticiaDetalhe;
