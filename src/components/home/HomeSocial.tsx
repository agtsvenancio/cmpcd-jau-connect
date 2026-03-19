import { motion } from "framer-motion";
import { Instagram, Facebook, Heart, MessageCircle, Share2 } from "lucide-react";

const posts = [
  {
    id: 1,
    tipo: "instagram",
    texto: "Hoje celebramos o Dia Internacional da Pessoa com Deficiência! 💙 Seguimos firmes na luta por inclusão e acessibilidade para todos. #CMPCD #Jaú #Inclusão",
    curtidas: 142,
    comentarios: 23,
    data: "15 Mar 2025",
    imagem: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    tipo: "facebook",
    texto: "O CMPCD Jaú convida toda a população para a audiência pública sobre acessibilidade urbana. Sua voz é importante! 📢 Participe!",
    curtidas: 87,
    comentarios: 15,
    data: "12 Mar 2025",
    imagem: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    tipo: "instagram",
    texto: "Workshop de tecnologias assistivas foi um sucesso! Agradecemos a todos os participantes e parceiros. 🙏 #TecnologiaAssistiva #Acessibilidade",
    curtidas: 198,
    comentarios: 31,
    data: "08 Mar 2025",
    imagem: "https://images.unsplash.com/photo-1531746790095-e5e5da42e358?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    tipo: "facebook",
    texto: "Programa de inclusão no mercado de trabalho alcança 100 colocações! 🎉 Parabéns a todos os envolvidos nessa conquista!",
    curtidas: 256,
    comentarios: 42,
    data: "05 Mar 2025",
    imagem: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=400&fit=crop",
  },
];

const HomeSocial = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4">Redes Sociais</h2>
        <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-6" />
        <p className="text-muted-foreground">Acompanhe nossas publicações e fique por dentro das novidades</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {posts.map((post, i) => (
          <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl border border-border overflow-hidden hover:-translate-y-1 transition-all duration-300" style={{ boxShadow: "var(--card-shadow)" }}>
            <img src={post.imagem} alt="" className="w-full h-40 object-cover" loading="lazy" />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {post.tipo === "instagram" ? <Instagram className="w-4 h-4 text-primary" /> : <Facebook className="w-4 h-4 text-primary" />}
                <span className="text-xs text-muted-foreground">{post.data}</span>
              </div>
              <p className="text-sm text-foreground line-clamp-3 mb-3">{post.texto}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {post.curtidas}</span>
                <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {post.comentarios}</span>
                <Share2 className="w-3 h-3 ml-auto cursor-pointer hover:text-primary transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-10">
        <a href="#" className="inline-flex items-center gap-2 text-primary font-bold hover:underline" aria-label="Seguir no Instagram">
          <Instagram className="w-5 h-5" /> Instagram
        </a>
        <a href="#" className="inline-flex items-center gap-2 text-primary font-bold hover:underline" aria-label="Seguir no Facebook">
          <Facebook className="w-5 h-5" /> Facebook
        </a>
      </div>
    </div>
  </section>
);

export default HomeSocial;
