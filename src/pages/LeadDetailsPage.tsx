import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useLeads } from '../hooks/useLeads';
import TabNavigation from '../components/leadDetails/TabNavigation';
import InfoTab from '../components/leadDetails/tabs/InfoTab';
import ActivityTab from '../components/leadDetails/tabs/ActivityTab';
import ContextTab from '../components/leadDetails/tabs/ContextTab';
import LoadingSpinner from '../components/common/LoadingSpinner';

type TabType = 'info' | 'activity' | 'context';

const LeadDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getLead, updateLead, deleteLead } = useLeads();

  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLead = async () => {
      if (!id) {
        setError('Lead ID is missing');
        setLoading(false);
        return;
      }

      try {
        const leadData = await getLead(id);
        if (!leadData) {
          setError('Lead not found');
          return;
        }
        setLead(leadData);
      } catch (err) {
        setError('Error fetching lead details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id, getLead]);

  const handleCommentAdd = async (comment: string) => {
    if (!lead || !id) return;

    const update = {
      id: Date.now().toString(),
      type: 'note',
      date: new Date().toISOString(),
      user: 'Current User', // Replace with actual user
      content: comment
    };

    const updatedLead = {
      ...lead,
      updates: [...lead.updates, update]
    };

    try {
      await updateLead(id, updatedLead);
      setLead(updatedLead);
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleContactAdd = async (contactData: any) => {
    if (!lead || !id) return;

    const contact = {
      id: Date.now().toString(),
      type: 'contact',
      ...contactData,
      date: new Date().toISOString(),
      user: 'Current User' // Replace with actual user
    };

    const updatedLead = {
      ...lead,
      activity: [...lead.activity, contact]
    };

    try {
      await updateLead(id, updatedLead);
      setLead(updatedLead);
    } catch (err) {
      console.error('Error adding contact:', err);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteLead(id);
      alert('Lead deleted successfully.');
      navigate('/leads');
    } catch (err) {
      console.error('Error deleting lead:', err);
      alert('Failed to delete lead. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="h-full bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-gray-900 text-white flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="text-lg font-medium">
            {lead?.vehicle?.year} {lead?.vehicle?.make} {lead?.vehicle?.model}
          </div>
          <div className="text-sm text-gray-400">
            {lead?.customer?.name}
          </div>
        </div>
        <button 
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
              handleDelete();
            }
          }}
          className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
        >
          Delete Lead
        </button>
      </div>

      {/* Tab Navigation */}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'info' && <InfoTab lead={lead} />}
        {activeTab === 'activity' && <ActivityTab lead={lead} />}
        {activeTab === 'context' && (
          <ContextTab
            lead={lead}
            onCommentAdd={handleCommentAdd}
            onContactAdd={handleContactAdd}
          />
        )}
      </div>
    </div>
  );
};

export default LeadDetailsPage;
