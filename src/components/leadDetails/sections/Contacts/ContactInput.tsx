import React, { useState } from 'react';
import { Phone, MessageSquare, Users } from 'lucide-react';

interface ContactInputProps {
  onSubmit: (contact: {
    type: 'call' | 'text' | 'visit';
    notes: string;
    outcome: 'Successful' | 'No Answer' | 'Rescheduled' | 'Declined';
  }) => void;
  disabled?: boolean;
}

const ContactInput: React.FC<ContactInputProps> = ({ onSubmit, disabled }) => {
  const [type, setType] = useState<'call' | 'text' | 'visit'>('call');
  const [notes, setNotes] = useState('');
  const [outcome, setOutcome] = useState<'Successful' | 'No Answer' | 'Rescheduled' | 'Declined'>('Successful');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled) {
      onSubmit({ type, notes: notes.trim(), outcome });
      setNotes('');
    }
  };

  const contactTypes = [
    { value: 'call' as const, icon: Phone, label: 'Call' },
    { value: 'text' as const, icon: MessageSquare, label: 'Text' },
    { value: 'visit' as const, icon: Users, label: 'Visit' }
  ];

  const outcomes = ['Successful', 'No Answer', 'Rescheduled', 'Declined'] as const;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Contact Type Selection */}
      <div className="flex gap-2">
        {contactTypes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setType(value)}
            disabled={disabled}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
              type === value 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            } disabled:opacity-50`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Outcome Selection */}
      <div className="grid grid-cols-2 gap-2">
        {outcomes.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setOutcome(value)}
            disabled={disabled}
            className={`px-4 py-2 rounded-lg text-sm ${
              outcome === value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            } disabled:opacity-50`}
          >
            {value}
          </button>
        ))}
      </div>

      {/* Notes */}
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add notes about the contact..."
        disabled={disabled}
        className="w-full bg-gray-800 rounded-lg px-4 py-3 text-sm resize-none min-h-[80px]
          focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={disabled}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600
          disabled:opacity-50 disabled:hover:bg-blue-500"
      >
        Add Contact
      </button>
    </form>
  );
};

export default ContactInput;