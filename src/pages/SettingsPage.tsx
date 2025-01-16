import React from 'react';
import { ChevronLeft, Bell, Map, Moon, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="text-gray-400">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-lg">Settings</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Profile Section */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Email</div>
              <button className="mt-2 px-4 py-1.5 bg-gray-800 text-blue-400 rounded-lg hover:bg-gray-700">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="p-4 space-y-6">
          {/* Notifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Bell className="w-5 h-5" />
              <div className="font-medium">Notifications</div>
            </div>
          </div>

          {/* Map Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Map className="w-5 h-5" />
              <div className="font-medium">Map Preferences</div>
            </div>
          </div>

          {/* Display */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Moon className="w-5 h-5" />
              <div className="font-medium">Display</div>
            </div>
          </div>

          {/* Help & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <HelpCircle className="w-5 h-5" />
              <div className="font-medium">Help & About</div>
            </div>
            <div className="space-y-2 pl-7">
              <button className="text-sm text-gray-400 hover:text-white">
                Contact Support
              </button>
              <div className="text-sm text-gray-500">Version 1.0.0</div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 flex justify-center">
          <button 
            onClick={handleSignOut}
            className="px-8 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;


