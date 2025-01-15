import React, { useState } from 'react';
import { Settings } from 'lucide-react';

const TeamPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'activity' | 'shared' | 'comments'>('activity');

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-lg">Team</div>
        <button 
          className="p-2 hover:bg-gray-700 rounded-full"
          onClick={() => console.log('Navigate to team settings')}
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-700">
        <button 
          className={'flex-1 px-4 py-2 text-sm font-medium ' +
            (activeTab === 'activity' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400')}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
        <button 
          className={'flex-1 px-4 py-2 text-sm font-medium ' +
            (activeTab === 'shared' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400')}
          onClick={() => setActiveTab('shared')}
        >
          Shared Leads
        </button>
        <button 
          className={'flex-1 px-4 py-2 text-sm font-medium ' +
            (activeTab === 'comments' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400')}
          onClick={() => setActiveTab('comments')}
        >
          Comments
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'activity' && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p>No recent activity</p>
          </div>
        )}

        {activeTab === 'shared' && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p>No shared leads</p>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p>No comments</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;

