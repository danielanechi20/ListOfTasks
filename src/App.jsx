import AuthenticationPage from "@/components/pages/AuthenticationPage";
import { Toaster } from "@/components/ui/sonner";
import { Routes, Route } from "react-router-dom";

import Home from "@/components/pages/Home";
import Landing from "@/components/pages/Landing";

import { ThemeProvider } from "@/components/theme-provider";
import RequireAuth from "@/components/RequireAuth";

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
