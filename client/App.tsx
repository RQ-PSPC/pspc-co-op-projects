import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages";
import Documentation from "./pages/documentation";
import EnvironmentRequest from "./pages/environment-request"
import Anastasia from "./pages/anastasia";
import Umair from "./pages/umair";
import NotFound from "./pages/NotFound";
import { QueryCreator } from "./pages/query-creator";

const queryClient = new QueryClient();

const rawBase = import.meta.env.BASE_URL;
const basename = rawBase === "/" ? "/" : rawBase.replace(/\/$/, "");

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/environment-request" element={<EnvironmentRequest />} />
          <Route path="/anastasia" element={<Anastasia/>} />
          <Route path="/umair" element={<Umair/>} />
          <Route path="/query-creator" element={<QueryCreator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
