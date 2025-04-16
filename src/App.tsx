import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import { AuthProvider } from "./contexts/AuthContext";
import InventoryProvider from "./contexts/InventoryContext";
import SettingsProvider from "./contexts/settingsContext";
import AuthPages from "./pages/Auth/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <InventoryProvider>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={<AppLayout />}
                >
                  <Route
                    index
                    element={<Dashboard />}
                  />
                  <Route
                    path="inventory"
                    element={<Inventory />}
                  />
                  <Route
                    path="categories"
                    element={<Categories />}
                  />
                  <Route
                    path="orders"
                    element={<Orders />}
                  />
                  <Route
                    path="reports"
                    element={<Reports />}
                  />
                  <Route
                    path="settings"
                    element={<Settings />}
                  />
                </Route>

                <Route
                  path="/auth"
                  element={<AuthPages />}
                />
                <Route
                  path="*"
                  element={<NotFound />}
                />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </InventoryProvider>
    </SettingsProvider>
  </QueryClientProvider>
);

export default App;
