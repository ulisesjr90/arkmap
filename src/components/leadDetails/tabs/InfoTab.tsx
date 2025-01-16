import React from 'react';
import { useLeads } from '../../../hooks/useLeads';
import VehicleInformation from '../../newLead/sections/VehicleInformation';
import CustomerInformation from '../../newLead/sections/CustomerInformation';
import InsuranceInformation from '../../newLead/sections/InsuranceInformation';
import LeadInformation from '../../newLead/sections/LeadInformation';
import AppointmentInformation from '../../newLead/sections/AppointmentInformation';

interface InfoTabProps {
  lead: any;
}

const InfoTab: React.FC<InfoTabProps> = ({ lead }) => {
  const { updateLead } = useLeads();

  const handleChange = async (section: string, field: string, value: any) => {
    const updatedLead = {
      ...lead,
      [section]: {
        ...lead[section],
        [field]: value
      },
      updatedAt: new Date()
    };

    try {
      await updateLead(lead.id, updatedLead);
    } catch (error) {
      console.error('Error updating lead:', error);
      // You might want to add some error handling UI here
    }
  };

  const useCurrentLocation = async () => {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.VITE_GOOGLE_MAPS_API_KEY}`
      );

      const data = await response.json();
      if (data.results[0]) {
        handleChange('customer', 'address', data.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="space-y-6">
        <VehicleInformation
          formData={lead}
          handleChange={handleChange}
          suggestions={{
            make: [],
            model: [],
            trim: [],
            color: []
          }}
          onSuggestionSelect={(section, field, value) => handleChange(section, field, value)}
        />

        <CustomerInformation
          formData={lead}
          handleChange={handleChange}
          useCurrentLocation={useCurrentLocation}
        />

        <InsuranceInformation
          formData={lead}
          handleChange={handleChange}
          suggestions={{
            carrier: []
          }}
          onSuggestionSelect={(section, field, value) => handleChange(section, field, value)}
        />

        <LeadInformation
          formData={lead}
          handleChange={handleChange}
        />

        <AppointmentInformation
          formData={lead}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default InfoTab;
