import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './components/layouts/MainLayout';
import MapPage from './pages/MapPage';
import LeadsPage from './pages/LeadsPage';
import NewLeadPage from './pages/NewLeadPage';
import StatsPage from './pages/StatsPage';
import TeamPage from './pages/TeamPage';
import SettingsPage from './pages/SettingsPage';
import LeadDetailsPage from './pages/LeadDetailsPage';
import './index.css';

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/',
    element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
    children: [
      {
        path: 'map',
        element: <MapPage />
      },
      {
        path: 'leads',
        element: <LeadsPage />
      },
      {
        path: 'leads/:id',
        element: <LeadDetailsPage />
      },
      {
        path: 'new-lead',
        element: <NewLeadPage />
      },
      {
        path: 'stats',
        element: <StatsPage />
      },
      {
        path: 'team',
        element: <TeamPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
      {
        path: '',
        element: <Navigate to="/map" replace />
      }
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
