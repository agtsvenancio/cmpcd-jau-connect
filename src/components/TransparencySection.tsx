import { motion } from "framer-motion";
import { FileText, BookOpen, FolderOpen, Globe } from "lucide-react";

const items = [
  { icon: FileText, title: "Atas de reuniões", description: "Registros oficiais das reuniões do conselho." },
  { icon: BookOpen, title: "Resoluções do conselho", description: "Deliberações e normativas aprovadas." },
  { icon: FolderOpen, title: "Documentos oficiais", description: "Legislação e documentos regulatórios." },
  { icon: Globe, title: "Informações públicas", description: "Dados abertos e prestação de contas." },
];

const TransparencySection = () => (
  <section id="transparencia" className="py-20 md:py-28 bg-card">
    <div className="container px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4">
          Transparência
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mx-auto" />
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-background rounded-2xl p-6 border border-border text-center hover:border-primary/30 transition-all duration-300 cursor-pointer"
            style={{ boxShadow: "var(--card-shadow)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--card-hover-shadow)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--card-shadow)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <item.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TransparencySection;
