import React, { useState } from 'react';
import { ChevronLeft, Camera, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firestore"; 
import { useAuth } from '../contexts/AuthContext';

interface NewLeadForm {
  vehicle: {
    year: string;
    make: string;
    model: string;
    trim: string;
    color: string;
    vin: string;
    plate: string;
  };
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  insurance: {
    carrier: string;
    policyNumber: string;
    deductible: string;
    rentalCoverage: boolean;
  };
  appointment: {
    create: boolean; 
    date: string;
    type: string;
    status: string;
    notes: string;
  };
  leadInfo: {
    status: string;
    priority: string;
    source: string;
  };
}

const NewLeadPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const [formData, setFormData] = useState<NewLeadForm>({
    vehicle: {
      year: '',
      make: '',
      model: '',
      trim: '',
      color: '',
      vin: '',
      plate: '',
    },
    customer: {
      name: '',
      phone: '',
      email: '',
      address: '',
    },
    insurance: {
      carrier: '',
      policyNumber: '',
      deductible: '',
      rentalCoverage: false,
    },
    appointment: {
      date: '',
      type: 'Initial Consultation',
      status: 'Scheduled',
      notes: '',
    },
    leadInfo: {
      status: 'New',
      priority: 'None',
      source: 'Door Knock',
    },
  });

  const handleChange = (section: keyof NewLeadForm, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error('No authenticated user.');
      return;
    }

    try {
      const createdAt = new Date();
      const leadData = {
        ...formData,
        ownerId: user.uid, 
        createdAt,
      };
  
      await addDoc(collection(db, "leads"), leadData);
  
      console.log("Lead saved successfully");
      navigate("/leads");  
    } catch (error) {
      console.error("Error saving lead:", error);
    }
  };  

  const useCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
  
        try {
          const apiKey = "AIzaSyBbVGXiDjNsA74RmR-gIjHOia43l7SHHmk";
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );
  
          const data = await response.json();
  
          if (data.status === "OK" && data.results.length > 0) {
            const address = data.results[0].formatted_address;
            console.log(`Address: ${address}`);
  
            // Update the address field in the form
            handleChange("customer", "address", address);
          } else {
            console.error("Failed to get address:", data);
            alert("Could not fetch the address. Please try again.");
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          alert("An error occurred while fetching the address.");
        }
      },
      (error) => {
        console.error("Error fetching location:", error);
        alert("Unable to fetch location. Please check your settings.");
      }
    );
  };
  

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-lg">New Lead</div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-4 space-y-6">
        {/* Vehicle Information */}
        <div className="bg-gray-800 rounded-lg p-4 space-y-4">
          <div className="text-sm text-gray-400">Vehicle Information</div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Year"
              value={formData.vehicle.year}
              onChange={(e) => handleChange('vehicle', 'year', e.target.value)}
              className="bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Make"
              value={formData.vehicle.make}
              onChange={(e) => handleChange('vehicle', 'make', e.target.value)}
              className="bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Model"
              value={formData.vehicle.model}
              onChange={(e) => handleChange('vehicle', 'model', e.target.value)}
              className="bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Trim"
              value={formData.vehicle.trim}
              onChange={(e) => handleChange('vehicle', 'trim', e.target.value)}
              className="bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Color"
              value={formData.vehicle.color}
              onChange={(e) => handleChange('vehicle', 'color', e.target.value)}
              className="bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="License Plate"
              value={formData.vehicle.plate}
              onChange={(e) => handleChange('vehicle', 'plate', e.target.value)}
              className="bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
            />
          </div>
          <input
            type="text"
            placeholder="VIN"
            value={formData.vehicle.vin}
            onChange={(e) => handleChange('vehicle', 'vin', e.target.value)}
            className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
          />
        </div>

               {/* Customer Information */}
               <div className="bg-gray-800 rounded-lg p-4 space-y-4">
               <div className="text-sm text-gray-400">Customer Information</div>
               <input
                 type="text"
                 placeholder="Full Name"
                 value={formData.customer.name}
                 onChange={(e) => handleChange('customer', 'name', e.target.value)}
                 className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
               />
               <input
                 type="tel"
                 placeholder="Phone Number"
                 value={formData.customer.phone}
                 onChange={(e) => handleChange('customer', 'phone', e.target.value)}
                 className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
               />
               <input
                 type="email"
                 placeholder="Email"
                 value={formData.customer.email}
                 onChange={(e) => handleChange('customer', 'email', e.target.value)}
                 className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
               />
               <button
                 type="button"
                 onClick={useCurrentLocation}
                 className="bg-blue-500 text-white rounded-lg px-3 py-2"
               >
                 Use Current Location
               </button>
               <input
                 type="text"
                 placeholder="Address"
                 value={formData.customer.address}
                 onChange={(e) => handleChange('customer', 'address', e.target.value)}
                 className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
               />
             </div>
     
        {/* Lead Information */}
        <div className="bg-gray-800 rounded-lg p-4 space-y-4">
          <div className="text-sm text-gray-400">Lead Information</div>
          <select
            value={formData.leadInfo.status}
            onChange={(e) => handleChange('leadInfo', 'status', e.target.value)}
            className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm text-white"
          >
            <option>New</option>
            <option>No Answer</option>
            <option>Needs Contact</option>
            <option>Appointment</option>
            <option>Closed</option>
            <option>Service Needed</option>
            <option>Not Interested</option>
          </select>
          <select
            value={formData.leadInfo.priority}
            onChange={(e) => handleChange('leadInfo', 'priority', e.target.value)}
            className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm text-white"
          >
            <option>High</option>
            <option>Low</option>
            <option>None</option>
          </select>
          <select
            value={formData.leadInfo.source}
            onChange={(e) => handleChange('leadInfo', 'source', e.target.value)}
            className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm text-white"
          >
            <option>Door Knock</option>
            <option>Referral</option>
            <option>Website</option>
            <option>Call In</option>
            <option>Other</option>
          </select>
        </div>

        {/* Insurance Information */}
        <div className="bg-gray-800 rounded-lg p-4 space-y-4">
          <div className="text-sm text-gray-400">Insurance Information</div>
          <input
            type="text"
            placeholder="Insurance Carrier"
            value={formData.insurance.carrier}
            onChange={(e) => handleChange('insurance', 'carrier', e.target.value)}
            className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Policy Number"
            value={formData.insurance.policyNumber}
            onChange={(e) => handleChange('insurance', 'policyNumber', e.target.value)}
            className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Deductible Amount"
            value={formData.insurance.deductible}
            onChange={(e) => handleChange('insurance', 'deductible', e.target.value)}
            className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
          />
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <input
              type="checkbox"
              checked={formData.insurance.rentalCoverage}
              onChange={(e) => handleChange('insurance', 'rentalCoverage', e.target.checked)}
              className="text-blue-500"
            />
            Rental Coverage
          </label>
        </div>

             {/* Appointment Information */}
             <div className="bg-gray-800 rounded-lg p-4 space-y-4">
               <label className="flex items-center gap-2 text-sm text-gray-400">
                 <input
                   type="checkbox"
                   checked={formData.appointment.create}
                   onChange={(e) => handleChange('appointment', 'create', e.target.checked)}
                   className="text-blue-500"
                 />
                 Create Appointment
               </label>
               {formData.appointment.create && (
                 <>
                   <input
                     type="date"
                     value={formData.appointment.date}
                     onChange={(e) => handleChange('appointment', 'date', e.target.value)}
                     className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
                   />
                   <textarea
                     placeholder="Notes"
                     value={formData.appointment.notes}
                     onChange={(e) => handleChange('appointment', 'notes', e.target.value)}
                     className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
                   ></textarea>
                 </>
               )}
             </div>

        <button
          type="submit"
          className="w-auto bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 mx-auto"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NewLeadPage;

