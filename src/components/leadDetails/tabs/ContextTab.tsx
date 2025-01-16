import React, { useState } from 'react';
import CommentList from '../sections/Comments/CommentList';
import CommentInput from '../sections/Comments/CommentInput';
import ContactList from '../sections/Contacts/ContactList';
import ContactInput from '../sections/Contacts/ContactInput';

interface ContextTabProps {
  lead: any;
  onCommentAdd: (comment: string) => void;
  onContactAdd: (contact: any) => void;
}

const ContextTab: React.FC<ContextTabProps> = ({
  lead,
  onCommentAdd,
  onContactAdd,
}) => {
  const [activeSection, setActiveSection] = useState<'comments' | 'contacts'>('contacts');

  // Filter updates to show only comments (type: 'note')
  const comments = lead.updates.filter((update: any) => update.type === 'note');
  
  // Filter activity to show only contacts
  const contacts = lead.activity.filter((item: any) => item.type === 'contact');

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {/* Section Toggle */}
      <div className="bg-gray-800 p-1 rounded-lg flex">
        <button
          onClick={() => setActiveSection('contacts')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
            activeSection === 'contacts'
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Contacts
        </button>
        <button
          onClick={() => setActiveSection('comments')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
            activeSection === 'comments'
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Comments
        </button>
      </div>

      {/* Content */}
      {activeSection === 'contacts' ? (
        <div className="space-y-4">
          <ContactInput onSubmit={onContactAdd} />
          <ContactList contacts={contacts} />
        </div>
      ) : (
        <div className="space-y-4">
          <CommentInput onSubmit={onCommentAdd} />
          <CommentList comments={comments} />
        </div>
      )}
    </div>
  );
};

export default ContextTab;