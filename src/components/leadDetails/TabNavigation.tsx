import React from 'react';
import { Info, Activity, MessageCircle } from 'lucide-react';

type TabType = 'info' | 'activity' | 'context';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'info' as const,
      label: 'Information',
      icon: Info
    },
    {
      id: 'activity' as const,
      label: 'Activity',
      icon: Activity
    },
    {
      id: 'context' as const,
      label: 'Context',
      icon: MessageCircle
    }
  ];

  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="flex">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'text-blue-400 border-blue-400'
                : 'text-gray-400 border-transparent hover:text-gray-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;