import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import TopBar from './TopBar';

const ROUTES_WITHOUT_TOPBAR = ['/new-lead'];

const MainLayout: React.FC = () => {
  const location = useLocation();

  const shouldShowTopBar = !ROUTES_WITHOUT_TOPBAR.includes(location.pathname);

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {shouldShowTopBar && <TopBar />}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
