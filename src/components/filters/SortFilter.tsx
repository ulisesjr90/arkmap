import React from 'react';

interface SortFilterProps {
  activeTab: 'sort' | 'filter' | null;
  setActiveTab: (tab: 'sort' | 'filter' | null) => void;
  sortField: string | null;
  setSortField: (field: string | null) => void;
  filters: {
    priority: string[];
    status: string[];
  };
  setFilters: React.Dispatch<React.SetStateAction<{ priority: string[]; status: string[] }>>;
}

const SortFilter: React.FC<SortFilterProps> = ({
  activeTab,
  setActiveTab,
  sortField,
  setSortField,
  filters,
  setFilters,
}) => {
  return (
    <div className="bg-gray-800 p-3 space-y-2">
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab(activeTab === 'sort' ? null : 'sort')}
          className={`px-4 py-2 text-sm rounded ${
            activeTab === 'sort' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          Sort
        </button>
        <button
          onClick={() => setActiveTab(activeTab === 'filter' ? null : 'filter')}
          className={`px-4 py-2 text-sm rounded ${
            activeTab === 'filter' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          Filter
        </button>
      </div>

      {activeTab === 'sort' && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {['Name', 'Last Update', 'Status'].map((option) => (
            <button
              key={option}
              onClick={() => setSortField(option.toLowerCase())}
              className={`px-4 py-2 rounded bg-gray-700 text-sm ${
                sortField === option.toLowerCase() ? 'bg-blue-500 text-white' : 'text-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {activeTab === 'filter' && (
        <div className="mt-2 space-y-3">
          <div>
            <div className="text-xs text-gray-400 mb-1">Priority</div>
            <div className="flex gap-2">
              {['High', 'Medium', 'Low'].map((priority) => (
                <button
                  key={priority}
                  onClick={() =>
                    filters.priority.includes(priority)
                      ? setFilters((prev) => ({
                          ...prev,
                          priority: prev.priority.filter((p) => p !== priority),
                        }))
                      : setFilters((prev) => ({
                          ...prev,
                          priority: [...prev.priority, priority],
                        }))
                  }
                  className={`px-3 py-1 rounded bg-gray-700 text-sm ${
                    filters.priority.includes(priority) ? 'bg-blue-500 text-white' : 'text-gray-300'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-400 mb-1">Status</div>
            <div className="flex gap-2">
              {['New', 'Appointment', 'Closed', 'Not Interested'].map((status) => (
                <button
                  key={status}
                  onClick={() =>
                    filters.status.includes(status)
                      ? setFilters((prev) => ({
                          ...prev,
                          status: prev.status.filter((s) => s !== status),
                        }))
                      : setFilters((prev) => ({
                          ...prev,
                          status: [...prev.status, status],
                        }))
                  }
                  className={`px-3 py-1 rounded bg-gray-700 text-sm ${
                    filters.status.includes(status) ? 'bg-blue-500 text-white' : 'text-gray-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortFilter;


