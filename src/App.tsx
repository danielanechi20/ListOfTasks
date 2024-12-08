import AuthenticationPage from "@/components/pages/AuthenticationPage";
import { Toaster } from "@/components/ui/sonner";
import { Routes, Route } from "react-router-dom";

import Home from "@/components/pages/Home";
import Landing from "@/components/pages/Landing";

import { ThemeProvider } from "@/components/theme-provider";
import SettingsLayout from "@/components/pages/SettingsLayout";
import RequireAuth from "@/components/RequireAuth";
import Profile from "@/components/pages/Profile";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/app"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route path="/app">
          <Route element={<SettingsLayout />}>
            <Route
              path="settings"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
          </Route>
        </Route>

        <Route
          path="/auth"
          element={
            <main className="mx-auto container flex flex-col items-center justify-center min-h-screen">
              <AuthenticationPage />
            </main>
          }
        />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
