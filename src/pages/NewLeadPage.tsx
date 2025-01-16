import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useLeads } from '../hooks/useLeads';
import VehicleInformation from '../components/newLead/sections/VehicleInformation';
import CustomerInformation from '../components/newLead/sections/CustomerInformation';
import InsuranceInformation from '../components/newLead/sections/InsuranceInformation';
import LeadInformation from '../components/newLead/sections/LeadInformation';
import AppointmentInformation from '../components/newLead/sections/AppointmentInformation';

const NewLeadPage = () => {
  const navigate = useNavigate();
  const { addLead } = useLeads();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    vehicle: {
      year: '',
      make: '',
      model: '',
      trim: '',
      color: '',
      plate: '',
      vin: ''
    },
    customer: {
      name: '',
      phone: '',
      email: '',
      address: ''
    },
    insurance: {
      carrier: '',
      policyNumber: '',
      deductible: '',
      rentalCoverage: false
    },
    leadInfo: {
      status: 'New',
      priority: 'Low',
      source: 'Door Knock'
    },
    appointment: {
      create: false,
      date: '',
      type: 'Initial Consultation',
      notes: ''
    }
  });

  const [suggestions, setSuggestions] = useState({
    make: [],
    model: [],
    trim: [],
    color: [],
    carrier: []
  });

  const handleChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCurrentLocation = async () => {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBbVGXiDjNsA74RmR-gIjHOia43l7SHHmk`
      );
      
      const data = await response.json();
      if (data.results[0]) {
        handleChange('customer', 'address', data.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customer.name && !formData.vehicle.make) {
      setError('Please fill in either customer name or vehicle make');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const leadData = {
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
        appointments: formData.appointment.create ? [{
          id: Date.now().toString(),
          date: new Date(formData.appointment.date).toISOString(),
          type: formData.appointment.type,
          status: 'Scheduled',
          notes: formData.appointment.notes
        }] : [],
        activity: [{
          id: Date.now().toString(),
          type: 'contact',
          method: 'Visit',
          date: new Date().toISOString(),
          user: 'Current User',
          notes: 'Lead created',
          outcome: 'Successful'
        }],
        updates: []
      };

      await addLead(leadData);
      navigate('/leads');
    } catch (error) {
      console.error('Error creating lead:', error);
      setError('Failed to create lead. Please try again.');
    } finally {
      setIsSubmitting(false);
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
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)} 
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-lg font-medium">New Lead</div>
        </div>

        <div className="flex-1 flex justify-end max-w-[160px]">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed w-full"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 text-red-400 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="flex-1 overflow-auto">
        <form onSubmit={handleSubmit} className="p-4 space-y-6 max-w-2xl mx-auto pb-20">
          <VehicleInformation
            formData={formData}
            handleChange={handleChange}
            suggestions={suggestions}
            onSuggestionSelect={(section, field, value) => handleChange(section, field, value)}
          />

          <CustomerInformation
            formData={formData}
            handleChange={handleChange}
            useCurrentLocation={handleCurrentLocation}
          />

          <InsuranceInformation
            formData={formData}
            handleChange={handleChange}
            suggestions={suggestions}
            onSuggestionSelect={(section, field, value) => handleChange(section, field, value)}
          />

          <LeadInformation
            formData={formData}
            handleChange={handleChange}
          />

          <AppointmentInformation
            formData={formData}
            handleChange={handleChange}
          />
        </form>
      </div>
    </div>
  );
};

export default NewLeadPage;