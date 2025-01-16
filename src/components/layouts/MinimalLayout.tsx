// src/components/layouts/MinimalLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav'; 

const MinimalLayout: React.FC = () => {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

export default MinimalLayout;


