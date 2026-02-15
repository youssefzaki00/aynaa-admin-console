import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import LoginPage from "@/pages/LoginPage";
import CategoriesPage from "@/pages/CategoriesPage";
import KeywordsPage from "@/pages/KeywordsPage";
import WhitelistPage from "@/pages/WhitelistPage";
import SuggestionsPage from "@/pages/SuggestionsPage";
import CustomizationPage from "@/pages/CustomizationPage";
import UninstallPage from "@/pages/UninstallPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const { isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />;
  }

  return (
    <BrowserRouter>
      <Layout onLogout={logout}>
        <Routes>
          <Route path="/" element={<CategoriesPage />} />
          <Route path="/keywords" element={<KeywordsPage />} />
          <Route path="/whitelist" element={<WhitelistPage />} />
          <Route path="/suggestions" element={<SuggestionsPage />} />
          <Route path="/customization" element={<CustomizationPage />} />
          <Route path="/uninstall" element={<UninstallPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
