import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlusCircle, ListChecks, BarChart3, Users, Map } from 'lucide-react';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const leftItems = [
    {
      icon: PlusCircle,
      label: 'New Lead',
      path: '/new-lead',
      color: 'text-green-400 hover:text-green-300'
    },
    {
      icon: ListChecks,
      label: 'Leads',
      path: '/leads',
      color: 'text-blue-400 hover:text-blue-300'
    }
  ];

  const rightItems = [
    {
      icon: BarChart3,
      label: 'Stats',
      path: '/stats',
      color: 'text-purple-400 hover:text-purple-300'
    },
    {
      icon: Users,
      label: 'Team',
      path: '/team',
      color: 'text-yellow-400 hover:text-yellow-300'
    }
  ];

  return (
    <div className="bg-gray-800 border-t border-gray-700 p-4">
      <div className="relative flex justify-between items-center">
        {/* Left Side Navigation */}
        <div className="flex gap-8">
          {leftItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={'flex flex-col items-center ' + item.color}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Centered Map Button */}
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-8">
          <button
            onClick={() => navigate('/map')}
            className={'w-14 h-14 rounded-full bg-blue-500 flex flex-col items-center justify-center shadow-lg ' + 
              (location.pathname === '/map' ? 'ring-2 ring-blue-300' : '')}
          >
            <Map className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Right Side Navigation */}
        <div className="flex gap-8">
          {rightItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={'flex flex-col items-center ' + item.color}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;

