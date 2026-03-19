import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";

const Contato = () => (
  <PageLayout>
    <PageHero title="Contato" subtitle="Entre em contato com o CMPCD Jaú" />

    <section className="py-20 bg-background">
      <div className="container px-4 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-extrabold text-foreground mb-6">Informações de Contato</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Endereço</h3>
                  <p className="text-muted-foreground">Rua Exemplo, 123 - Centro<br />Jaú - SP, CEP 17201-000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Telefone</h3>
                  <p className="text-muted-foreground">(14) 3622-0000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">E-mail</h3>
                  <p className="text-muted-foreground">cmpcd@jau.sp.gov.br</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Horário de Atendimento</h3>
                  <p className="text-muted-foreground">Segunda a Sexta: 8h às 17h</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-foreground mb-3">Redes Sociais</h3>
              <div className="flex items-center gap-4">
                <a href="#" className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors" aria-label="Facebook">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors" aria-label="Instagram">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Mapa placeholder */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-extrabold text-foreground mb-6">Localização</h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: "var(--card-shadow)" }}>
              <iframe
                title="Localização CMPCD Jaú"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29446.43!2d-48.5581!3d-22.2964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b9c9a3a0e5e7b1%3A0x4e5e5e5e5e5e5e5e!2sJa%C3%BA%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1!5m2!1spt-BR!2sbr"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Contato;
