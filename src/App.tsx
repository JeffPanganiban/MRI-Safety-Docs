import { Suspense } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Dashboard from "./components/pages/dashboard";
import Success from "./components/pages/success";
import Home from "./components/pages/home";
import { AuthProvider, useAuth } from "../supabase/auth";
import { Toaster } from "./components/ui/toaster";
import { LoadingScreen, LoadingSpinner } from "./components/ui/loading-spinner";
import LandingPage from "./components/pages/landing";
import ComingSoonPage from "./components/pages/ComingSoonPage";
import AppLayout from "./components/layout/AppLayout";
import DevicesPage from "./components/device/DevicesPage";
import DeviceDetail from "./components/device/DeviceDetail";
import DeviceSearchResults from "./components/device/DeviceSearchResults";
import DeviceListingPage from "./components/device/DeviceListingPage";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ComingSoonPage />} />
        <Route path="/app" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/success" element={<Success />} />

        {/* MRI Safety Database Routes */}
        <Route path="/devices" element={<AppLayout />}>
          <Route index element={<DeviceListingPage />} />
          <Route path=":id" element={<DeviceDetail />} />
        </Route>

        <Route path="/categories" element={<AppLayout />}>
          <Route
            index
            element={<div>Categories List Page (To be implemented)</div>}
          />
          <Route
            path=":id"
            element={<div>Category Detail Page (To be implemented)</div>}
          />
        </Route>

        <Route path="/manufacturers" element={<AppLayout />}>
          <Route
            index
            element={<div>Manufacturers List Page (To be implemented)</div>}
          />
          <Route
            path=":id"
            element={<div>Manufacturer Detail Page (To be implemented)</div>}
          />
        </Route>

        <Route path="/search" element={<AppLayout />}>
          <Route index element={<DeviceSearchResults />} />
        </Route>

        {/* Allow Tempo to capture routes before the catchall */}
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}

        {/* Catchall route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </>
  );
}

import { isSupabaseConfigured } from "../supabase/supabase";

function App() {
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-4 text-2xl font-bold">Configuration Error</h1>
        <p className="mb-6">
          Supabase environment variables are not properly configured.
        </p>
        <p className="text-sm text-muted-foreground">
          Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in
          your environment.
        </p>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Suspense fallback={<LoadingScreen text="Loading application..." />}>
        <AppRoutes />
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
