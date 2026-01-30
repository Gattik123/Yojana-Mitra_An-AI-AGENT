import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { UserProfileProvider } from "@/contexts/UserProfileContext";
import Header from "@/components/Header";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import SchemesPage from "./pages/SchemesPage";
import SchemeDetailsPage from "./pages/SchemeDetailsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <UserProfileProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/schemes" element={<SchemesPage />} />
                <Route path="/scheme/:id" element={<SchemeDetailsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </UserProfileProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
