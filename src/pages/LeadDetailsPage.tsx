import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLeads } from '../hooks/useLeads';
import { Lead } from '../types/lead';

// Import our new components
import { LeadInfo } from '../components/leads/sections/LeadInfo';
import { LeadAppointments } from '../components/leads/sections/LeadAppointments';
import { LeadTimeline } from '../components/leads/sections/LeadTimeline';
import { LeadUpdates } from '../components/leads/sections/LeadUpdates';
import { LeadHeader } from '../components/leads/ui/LeadHeader';
import { LeadActions } from '../components/leads/ui/LeadActions';
import { AppointmentModal, DeleteConfirmModal } from '../components/leads/modals';

type TabType = 'info' | 'appointments' | 'timeline' | 'updates';

const LeadDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { leads, updateLead, deleteLead } = useLeads();
  
  // State management
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const lead = leads.find(l => l.id === id);

  if (!lead) {
    return (
      <div className="h-full bg-gray-900 text-white flex items-center justify-center">
        <div className="text-gray-400">Lead not found</div>
      </div>
    );
  }

  // Action handlers
  const handleDelete = async () => {
    try {
      await deleteLead(id!);
      navigate('/leads');
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const handleAddUpdate = async (content: string, type: 'note' | 'important') => {
    try {
      await updateLead(id!, {
        updates: [
          ...lead.updates,
          {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            user: 'Current User', // Replace with actual user
            content,
            type
          }
        ]
      });
    } catch (error) {
      console.error('Error adding update:', error);
    }
  };

  const handleScheduleAppointment = async (appointmentData: any) => {
    try {
      const date = new Date(`${appointmentData.date}T${appointmentData.time}`);
      await updateLead(id!, {
        appointments: [
          ...lead.appointments,
          {
            id: Date.now().toString(),
            date: date.toISOString(),
            type: appointmentData.type,
            status: 'Scheduled',
            notes: appointmentData.notes
          }
        ]
      });
      setShowAppointmentModal(false);
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${lead.customer.phone}`;
  };

  const handleMessage = () => {
    window.location.href = `sms:${lead.customer.phone}`;
  };

  const handleDirections = () => {
    const address = encodeURIComponent(
      `${lead.customer.address.street}, ${lead.customer.address.city}, ${lead.customer.address.state} ${lead.customer.address.zip}`
    );
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`);
  };

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col">
      <LeadHeader 
        lead={lead}
        onDelete={() => setShowDeleteModal(true)}
      />
      
      <LeadActions 
        lead={lead}
        onCall={handleCall}
        onMessage={handleMessage}
        onDirections={handleDirections}
      />

      <div className="flex border-b border-gray-700">
        {(['info', 'appointments', 'timeline', 'updates'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab 
                ? 'text-blue-400 border-b-2 border-blue-400' 
                : 'text-gray-400'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'info' && <LeadInfo lead={lead} />}
        {activeTab === 'appointments' && (
          <LeadAppointments 
            lead={lead}
            onSchedule={() => setShowAppointmentModal(true)}
          />
        )}
        {activeTab === 'timeline' && <LeadTimeline lead={lead} />}
        {activeTab === 'updates' && (
          <LeadUpdates 
            lead={lead}
            onAddUpdate={handleAddUpdate}
          />
        )}
      </div>

      <AppointmentModal 
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        onSubmit={handleScheduleAppointment}
      />

      <DeleteConfirmModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default LeadDetailsPage;
