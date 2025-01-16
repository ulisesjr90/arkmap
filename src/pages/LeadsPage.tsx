import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeads } from '../hooks/useLeads';
import SortFilter from '../components/filters/SortFilter';

const LeadsPage: React.FC = () => {
  const navigate = useNavigate();
  const { leads, loading, error } = useLeads();

  const [activeTab, setActiveTab] = useState<'sort' | 'filter' | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    priority: [] as string[],
    status: [] as string[],
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically assign colors to badges based on status
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500 text-white px-2 py-1 rounded-full w-fit text-center';
      case 'Closed':
        return 'bg-green-500 text-white px-2 py-1 rounded-full w-fit text-center';
      case 'Not Interested':
        return 'bg-red-500 text-white px-2 py-1 rounded-full w-fit text-center';
      case 'No Answer':
        return 'bg-orange-500 text-white px-2 py-1 rounded-full w-fit text-center';
      case 'Follow Up':
        return 'bg-teal-500 text-white px-2 py-1 rounded-full w-fit text-center';
      case 'Appointment':
        return 'bg-purple-500 text-white px-2 py-1 rounded-full w-fit text-center';
      default:
        return 'bg-gray-500 text-white px-2 py-1 rounded-full w-fit text-center';
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-full bg-gray-900 text-white flex items-center justify-center">
        <div className="text-blue-400">Loading leads...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-gray-900 text-white flex items-center justify-center">
        <div className="text-red-400">Error loading leads: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex flex-wrap items-center gap-4">
        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search leads by vehicle or name..."
          className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none"
        />

        {/* Sort/Filter */}
        <SortFilter
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sortField={sortField}
          setSortField={setSortField}
          filters={filters}
          setFilters={setFilters}
        />

        {/* New Lead Button */}
        <button
          onClick={() => navigate('/new-lead')}
          className="bg-blue-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-600 whitespace-nowrap"
        >
          New Lead
        </button>
      </div>

      {/* Leads List */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeads.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center text-gray-400">
            <p>No leads match your search</p>
            <button
              onClick={() => navigate('/new-lead')}
              className="mt-2 text-blue-400 text-sm"
            >
              Create a new lead
            </button>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => navigate(`/leads/${lead.id}`)}
              className="bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col space-y-2"
            >
              {/* Vehicle Info */}
              <div className="text-white font-semibold text-sm">
                {lead.vehicle.year} {lead.vehicle.make} {lead.vehicle.model}
              </div>

              {/* Address */}
              <div className="text-gray-400 text-sm">{lead.customer.address}</div>

              {/* Last Update */}
              <div className="text-gray-500 text-xs">
                Last Updated:{' '}
                {lead.updatedAt?.toDate().toLocaleDateString() || 'N/A'}
              </div>

              {/* Status */}
              <span
                className={`inline-block text-xs font-medium ${getStatusClass(
                  lead.leadInfo.status
                )}`}
              >
                {lead.leadInfo.status}
              </span>

              {/* Directions */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      lead.customer.address
                    )}`
                  );
                }}
                className="mt-2 bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded hover:bg-blue-600 w-fit"
              >
                Get Directions
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeadsPage;


