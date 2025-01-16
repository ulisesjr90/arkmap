import React from 'react';
import SelectField from '../../form/SelectField';

interface LeadInformationProps {
  formData: any;
  handleChange: (section: string, field: string, value: any) => void;
}

const LeadInformation: React.FC<LeadInformationProps> = ({ formData, handleChange }) => (
  <div className="bg-gray-800 rounded-lg p-4 space-y-4">
    <div className="text-sm text-gray-400">Lead Information</div>
    <SelectField
      id="leadStatus"
      label="Status"
      value={formData.leadInfo.status}
      onChange={(e) => handleChange('leadInfo', 'status', e.target.value)}
      options={['New', 'No Answer', 'Needs Contact', 'Appointment', 'Closed', 'Service Needed', 'Not Interested']}
    />
    <SelectField
      id="leadPriority"
      label="Priority"
      value={formData.leadInfo.priority}
      onChange={(e) => handleChange('leadInfo', 'priority', e.target.value)}
      options={['High', 'Low', 'None']}
    />
    <SelectField
      id="leadSource"
      label="Source"
      value={formData.leadInfo.source}
      onChange={(e) => handleChange('leadInfo', 'source', e.target.value)}
      options={['Door Knock', 'Referral', 'Website', 'Call In', 'Other']}
    />
  </div>
);

export default LeadInformation;
