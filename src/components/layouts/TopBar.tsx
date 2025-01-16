import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';

interface TopBarProps {
  showHeader?: boolean;
  showSettingsIcon?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  showHeader = true,
  showSettingsIcon = true,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center">
      {showHeader && (
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          ARK MAP
        </div>
      )}
      {showSettingsIcon && (
        <button
          onClick={() => navigate('/settings')}
          className="p-2 hover:bg-gray-700 rounded-full"
        >
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default TopBar;
