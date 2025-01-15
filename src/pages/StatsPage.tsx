import React, { useState } from 'react';

const StatsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'year'>('today');
  const timeRanges: ('today' | 'week' | 'month' | 'year')[] = ['today', 'week', 'month', 'year'];

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col">
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-lg">Performance Stats</div>
        <div className="bg-gray-700 rounded-lg flex">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={'px-3 py-1 text-sm capitalize ' + 
                (timeRange === range ? 'bg-blue-500 rounded-lg' : '')}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Doors Knocked</div>
          <div className="text-2xl font-bold">-</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Active Leads</div>
          <div className="text-2xl font-bold">-</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Contact Rate</div>
          <div className="text-2xl font-bold">-</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Conversion Rate</div>
          <div className="text-2xl font-bold">-</div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="bg-gray-800 rounded-lg p-4 h-full">
          <div className="text-sm text-gray-400 mb-4">Conversion Funnel</div>
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p>No data available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;

