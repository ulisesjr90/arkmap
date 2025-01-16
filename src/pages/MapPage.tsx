import React, { useState } from 'react';
import MapComponent from '../components/maps/MapComponent';
import { Map, Activity, Route } from 'lucide-react';

const MapPage: React.FC = () => {
  const [view, setView] = useState('heatmap');
  const [dateFilter, setDateFilter] = useState('today');

  const views = [
    { id: 'heatmap', label: 'Heat Map', icon: Activity, color: 'text-orange-400' },
    { id: 'planning', label: 'Planning', icon: Map, color: 'text-blue-400' },
    { id: 'completed', label: 'Completed', icon: Route, color: 'text-green-400' }
  ];

  return (
    <div className="h-full flex-1 relative">
      {/* View Toggle */}
      <div className="absolute top-4 left-4 z-10 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex p-1 gap-1">
          {views.map(({ id, label, icon: Icon, color }) => (
            <button 
              key={id}
              onClick={() => setView(id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors ${
                view === id 
                  ? `bg-gray-700 ${color}` 
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Date Filter */}
      <div className="absolute top-4 right-4 z-10 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex p-1 gap-1">
          <button 
            onClick={() => setDateFilter('today')}
            className={`px-3 py-1 text-sm rounded-md ${
              dateFilter === 'today' ? 'bg-gray-700 text-blue-400' : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            Today
          </button>
          <button 
            onClick={() => setDateFilter('week')}
            className={`px-3 py-1 text-sm rounded-md ${
              dateFilter === 'week' ? 'bg-gray-700 text-blue-400' : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            Week
          </button>
          <button 
            onClick={() => setDateFilter('month')}
            className={`px-3 py-1 text-sm rounded-md ${
              dateFilter === 'month' ? 'bg-gray-700 text-blue-400' : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            Month
          </button>
          <button 
            onClick={() => setDateFilter('custom')}
            className={`px-3 py-1 text-sm rounded-md ${
              dateFilter === 'custom' ? 'bg-gray-700 text-blue-400' : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            Custom
          </button>
        </div>
      </div>

      <MapComponent view={view as 'heatmap' | 'planning' | 'completed'} dateFilter={dateFilter} />
    </div>
  );
};

export default MapPage;

