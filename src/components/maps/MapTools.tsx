import React from 'react';
import { ChevronLeft, ChevronRight, PenLine, Trash2, PlayCircle, CheckCircle } from 'lucide-react';

interface Route {
  id: string;
  name: string;
  status: 'planned' | 'in-progress' | 'completed';
  dateCreated: Date;
}

interface MapToolsProps {
  isVisible: boolean;
  onToggle: () => void;
  onStartDrawing: () => void;
  isDrawing: boolean;
  routes?: Route[];
  onRouteStatusChange?: (routeId: string, status: Route['status']) => void;
  onRouteDelete?: (routeId: string) => void;
}

const MapTools: React.FC<MapToolsProps> = ({ 
  isVisible, 
  onToggle, 
  onStartDrawing,
  isDrawing,
  routes = [],
  onRouteStatusChange,
  onRouteDelete
}) => {
  const getStatusColor = (status: Route['status']) => {
    switch(status) {
      case 'planned': return 'text-gray-400';
      case 'in-progress': return 'text-blue-400';
      case 'completed': return 'text-green-400';
    }
  };

  return (
    <div 
      className={`absolute left-0 top-20 z-10 transition-transform duration-300 ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className="absolute right-0 top-0 translate-x-full bg-gray-800 p-2 rounded-r-lg shadow-lg"
      >
        {isVisible ? <ChevronLeft /> : <ChevronRight />}
      </button>

      {/* Tools Panel */}
      <div className="bg-gray-800 p-4 rounded-r-lg shadow-lg w-64">
        <h3 className="text-sm font-medium mb-4">Route Planning Tools</h3>
        
        {/* Drawing Tool */}
        <div className="space-y-4">
          <button
            onClick={onStartDrawing}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm w-full ${
              isDrawing 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <PenLine className="w-4 h-4" />
            {isDrawing ? 'Finish Drawing' : 'Draw Route'}
          </button>

          {/* Routes List */}
          {routes.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs text-gray-400">Saved Routes</h4>
              {routes.map(route => (
                <div 
                  key={route.id} 
                  className="bg-gray-700 rounded-lg p-2"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{route.name}</span>
                    <div className="flex items-center gap-1">
                      {/* Status Toggle */}
                      {route.status !== 'completed' && (
                        <button
                          onClick={() => onRouteStatusChange?.(route.id, 
                            route.status === 'planned' ? 'in-progress' : 'completed'
                          )}
                          className="p-1 hover:bg-gray-600 rounded"
                        >
                          {route.status === 'planned' ? 
                            <PlayCircle className="w-4 h-4 text-blue-400" /> : 
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          }
                        </button>
                      )}
                      {/* Delete Button */}
                      <button
                        onClick={() => onRouteDelete?.(route.id)}
                        className="p-1 hover:bg-gray-600 rounded text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className={`text-xs ${getStatusColor(route.status)}`}>
                    {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapTools;
