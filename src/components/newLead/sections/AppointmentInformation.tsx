import React from 'react';
import InputField from '../../form/InputField';
import TextAreaField from '../../form/TextAreaField';
import CheckboxField from '../../form/CheckboxField';
import SelectField from '../../form/SelectField';

interface AppointmentInformationProps {
  formData: any;
  handleChange: (section: string, field: string, value: any) => void;
}

const AppointmentInformation: React.FC<AppointmentInformationProps> = ({ formData, handleChange }) => (
  <div className="bg-gray-800 rounded-lg p-4 space-y-4">
    <CheckboxField
      id="createAppointment"
      label="Create Appointment"
      checked={formData.appointment.create}
      onChange={(e) => handleChange('appointment', 'create', e.target.checked)}
    />
    {formData.appointment.create && (
      <div className="space-y-4">
        <InputField
          id="appointmentDate"
          label="Date"
          placeholder="Appointment Date"
          value={formData.appointment.date}
          onChange={(e) => handleChange('appointment', 'date', e.target.value)}
          type="date"
        />
        <SelectField
          id="appointmentType"
          label="Type"
          value={formData.appointment.type}
          onChange={(e) => handleChange('appointment', 'type', e.target.value)}
          options={[
            'Initial Consultation',
            'Follow-Up',
            'Drop Off', 
            'Service Appointment',
          ]}
        />
        <TextAreaField
          id="appointmentNotes"
          label="Notes"
          placeholder="Additional Notes"
          value={formData.appointment.notes}
          onChange={(e) => handleChange('appointment', 'notes', e.target.value)}
        />
      </div>
    )}
  </div>
);

export default AppointmentInformation;
