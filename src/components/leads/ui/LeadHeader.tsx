import React from 'react';
import { Lead } from '../../../types/lead';

type LeadHeaderProps = {
  lead: Lead;
  onDelete: () => void;
};

export const LeadHeader: React.FC<LeadHeaderProps> = ({ lead, onDelete }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">{lead.name}</h1>
      <button
        onClick={onDelete}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
      >
        Delete
      </button>
    </header>
  );
};
