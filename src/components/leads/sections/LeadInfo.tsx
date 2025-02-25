import React from 'react';
import { Lead } from '../../../types/lead';

type LeadInfoProps = {
  lead: Lead;
};

export const LeadInfo: React.FC<LeadInfoProps> = ({ lead }) => (
  <div>
    <h2>Lead Information</h2>
    <p>Name: {lead.name}</p>
    <p>Status: {lead.status}</p>
    <p>Priority: {lead.priority}</p>
  </div>
);
