import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CaseProvider } from "@/contexts/CaseContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { DisclaimerModal } from "@/components/disclaimer/DisclaimerModal";
import NewCase from "./pages/NewCase";
import PostOpCase from "./pages/PostOpCase";
import References from "./pages/References";
import Settings from "./pages/Settings";
import Install from "./pages/Install";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <CaseProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <DisclaimerModal />
            <BrowserRouter>
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Navigate to="/new-case" replace />} />
                  <Route path="/new-case" element={<NewCase />} />
                  <Route path="/post-op-case" element={<PostOpCase />} />
                  <Route path="/references" element={<References />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/install" element={<Install />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
            </BrowserRouter>
          </TooltipProvider>
        </CaseProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
