import React from 'react';
import { Phone, MessageSquare, MapPin } from 'lucide-react';

type LeadActionsProps = {
  onCall: () => void;
  onMessage: () => void;
  onDirections: () => void;
};

export const LeadActions: React.FC<LeadActionsProps> = ({ onCall, onMessage, onDirections }) => (
  <div className="actions-container">
    <button onClick={onCall} className="action-button">
      <Phone /> Call
    </button>
    <button onClick={onMessage} className="action-button">
      <MessageSquare /> Message
    </button>
    <button onClick={onDirections} className="action-button">
      <MapPin /> Directions
    </button>
  </div>
);
