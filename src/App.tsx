import { Toaster } from "@/ui/toaster";
import { Toaster as Sonner } from "@/ui/sonner";
import { TooltipProvider } from "@/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import LoginPage from "@/pages/LoginPage";
import CategoriesPage from "@/pages/CategoriesPage";
import KeywordsPage from "@/pages/KeywordsPage";
import SitesPage from "@/pages/SitesPage";
import ExcludedAppsPage from "@/pages/ExcludedAppsPage";
import AppsPage from "@/pages/AppsPage";
import RequestsPage from "@/pages/RequestsPage";
import NotFound from "@/pages/NotFound";
import { DialogProvider } from "@/lib/dialog-context";
import DialogHost from "@/components/DialogHost";

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
    <DialogProvider>
      <BrowserRouter>
        <Layout onLogout={logout}>
          <Routes>
            <Route path="/" element={<CategoriesPage />} />
            <Route path="/keywords" element={<KeywordsPage />} />
            <Route path="/sites" element={<SitesPage />} />
            <Route path="/excluded-apps" element={<ExcludedAppsPage />} />
            <Route path="/apps" element={<AppsPage />} />
            <Route path="/requests" element={<RequestsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <DialogHost />
      </BrowserRouter>
    </DialogProvider>
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
