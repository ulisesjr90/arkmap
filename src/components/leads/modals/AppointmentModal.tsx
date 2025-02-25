import React, { useState } from 'react';
import { Calendar, X } from 'lucide-react';

type AppointmentModalProps = {
  onClose: () => void;
  onSave: (appointmentDetails: any) => void;
};

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ onClose, onSave }) => {
  const [details, setDetails] = useState('');

  const handleSave = () => {
    onSave(details);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <X />
        </button>
        <h2>Schedule Appointment</h2>
        <input
          type="text"
          placeholder="Appointment Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};
