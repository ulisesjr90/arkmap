export interface Lead {
  id: string;
  owner: {
    id: string;
    name: string;
    assigned_at: string;
  };
  status: 'New' | 'No Answer' | 'Needs Contact' | 'Appointment' | 'Closed' | 'Service Needed' | 'Not Interested';
  priority: 'High' | 'Low' | 'None';
  source: 'Door Knock' | 'Referral' | 'Website' | 'Call In' | 'Other';
  created_at: string;
  updated_at: string;
  shared_with: Array<{
    user_id: string;
    shared_at: string;
    shared_by: string;
  }>;
  customer: {
    name: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    notes: string;
  };
  appointments: Array<{
    id: string;
    date: string;
    type: 'Initial Consultation' | 'Follow-up' | 'Pickup' | 'Drop Off' | 'Service';
    status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No Show';
    notes: string;
  }>;
  activity: Array<{
    id: string;
    type: 'contact' | 'update' | 'share' | 'status_change';
    method: 'Call' | 'Visit' | 'Text' | 'Email';
    date: string;
    user: string;
    notes: string;
    outcome: 'Successful' | 'No Answer' | 'Rescheduled' | 'Declined';
  }>;
  updates: Array<{
    id: string;
    date: string;
    user: string;
    content: string;
    type: 'note' | 'important' | 'status_change';
  }>;
}