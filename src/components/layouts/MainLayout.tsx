import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import TopBar from './TopBar';

const MainLayout: React.FC = () => {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      <TopBar />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

export default MainLayout;

