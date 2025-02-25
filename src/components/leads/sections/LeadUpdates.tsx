import React from 'react';

type Update = {
  date: string;
  content: string;
};

type LeadUpdatesProps = {
  updates: Update[];
};

export const LeadUpdates: React.FC<LeadUpdatesProps> = ({ updates }) => (
  <div>
    <h2>Lead Updates</h2>
    <ul>
      {updates.map((update, index) => (
        <li key={index}>
          <strong>{update.date}:</strong> {update.content}
        </li>
      ))}
    </ul>
  </div>
);
