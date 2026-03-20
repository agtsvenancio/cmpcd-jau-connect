import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import QuemSomos from "./pages/QuemSomos";
import Iniciativas from "./pages/Iniciativas";
import Admin from "./pages/Admin";
import Noticias from "./pages/Noticias";
import NoticiaDetalhe from "./pages/NoticiaDetalhe";
import Transparencia from "./pages/Transparencia";
import Apoio from "./pages/Apoio";
import Contato from "./pages/Contato";
import CadastroPCD from "./pages/CadastroPCD";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/iniciativas" element={<Iniciativas />} />
            <Route path="/dados-sociais" element={<DadosSociais />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/noticias/:id" element={<NoticiaDetalhe />} />
            <Route path="/transparencia" element={<Transparencia />} />
            <Route path="/apoio" element={<Apoio />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/cadastro-pcd" element={<CadastroPCD />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
