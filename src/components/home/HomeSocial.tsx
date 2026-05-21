import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const HomeSocial = () => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
      scriptRef.current = script;
    }
    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, []);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4">
            Redes Sociais
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-6" />
          <p className="text-muted-foreground">
            Acompanhe nossas publicações e fique por dentro das novidades
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div
            className="elfsight-app-3564448c-7ae1-4065-af6d-d33ed8489e3e"
            data-elfsight-app-lazy
          />
        </div>
      </div>
    </section>
  );
};

export default HomeSocial;
