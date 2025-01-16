import React from 'react';
import { Phone, MessageSquare, Users } from 'lucide-react';

interface Contact {
  id: string;
  date: string;
  type: 'call' | 'text' | 'visit';
  user: string;
  notes: string;
  outcome: 'Successful' | 'No Answer' | 'Rescheduled' | 'Declined';
}

interface ContactListProps {
  contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  const getIcon = (type: Contact['type']) => {
    switch (type) {
      case 'call':
        return <Phone className="w-5 h-5" />;
      case 'text':
        return <MessageSquare className="w-5 h-5" />;
      case 'visit':
        return <Users className="w-5 h-5" />;
    }
  };

  const getOutcomeColor = (outcome: Contact['outcome']) => {
    switch (outcome) {
      case 'Successful':
        return 'text-green-400';
      case 'No Answer':
        return 'text-yellow-400';
      case 'Rescheduled':
        return 'text-blue-400';
      case 'Declined':
        return 'text-red-400';
    }
  };

  if (contacts.length === 0) {
    return (
      <div className="text-center text-gray-400 py-4">
        No contacts recorded
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <div key={contact.id} className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-gray-400 mt-1">
              {getIcon(contact.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium capitalize">{contact.type}</div>
                  <div className="text-sm text-gray-400">
                    {new Date(contact.date).toLocaleString()}
                  </div>
                </div>
                <span className={`text-sm font-medium ${getOutcomeColor(contact.outcome)}`}>
                  {contact.outcome}
                </span>
              </div>
              {contact.notes && (
                <div className="text-gray-300 mt-2 text-sm">
                  {contact.notes}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
