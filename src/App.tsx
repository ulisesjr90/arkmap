// src/App.tsx
import React from 'react';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout';
import MinimalLayout from './components/layouts/MinimalLayout';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MapPage from './pages/MapPage';
import LeadsPage from './pages/LeadsPage';
import NewLeadPage from './pages/NewLeadPage';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={user ? <Navigate to="/map" replace /> : <LoginPage />}
        />

        {/* Example protected route with MainLayout (if you still want top bar here) */}
        <Route
          path="/map"
          element={
            user ? (
              <MainLayout>
                <MapPage />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

<Route
  path="/leads"
  element={
    user ? (
      <MinimalLayout>
        <LeadsPage />
      </MinimalLayout>
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>


        {/* Another protected route (can also use MinimalLayout or MainLayout) */}
        <Route
          path="/new-lead"
          element={
            user ? (
              <MinimalLayout>
                <NewLeadPage />
              </MinimalLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all for undefined routes */}
        <Route
          path="*"
          element={<Navigate to={user ? '/map' : '/login'} replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;


