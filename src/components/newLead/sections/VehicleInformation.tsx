import React from 'react';
import InputField from '../../form/InputField';

interface VehicleInformationProps {
  formData: any;
  handleChange: (section: string, field: string, value: any) => void;
  suggestions: {
    make: string[];
    model: string[];
    trim: string[];
    color: string[];
  };
  onSuggestionSelect: (section: string, field: string, value: string) => void;
}

const VehicleInformation: React.FC<VehicleInformationProps> = ({
  formData,
  handleChange,
  suggestions,
  onSuggestionSelect
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      <div className="text-sm text-gray-400">Vehicle Information</div>
      
      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="vehicleYear"
          label="Year"
          placeholder="Year"
          value={formData.vehicle.year}
          onChange={(e) => handleChange('vehicle', 'year', e.target.value)}
        />
        
        <InputField
          id="vehicleMake"
          label="Make"
          placeholder="Make"
          value={formData.vehicle.make}
          onChange={(e) => handleChange('vehicle', 'make', e.target.value)}
          suggestions={suggestions.make}
          onSuggestionSelect={(value) => onSuggestionSelect('vehicle', 'make', value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="vehicleModel"
          label="Model"
          placeholder="Model"
          value={formData.vehicle.model}
          onChange={(e) => handleChange('vehicle', 'model', e.target.value)}
          suggestions={suggestions.model}
          onSuggestionSelect={(value) => onSuggestionSelect('vehicle', 'model', value)}
        />
        
        <InputField
          id="vehicleTrim"
          label="Trim"
          placeholder="Trim"
          value={formData.vehicle.trim}
          onChange={(e) => handleChange('vehicle', 'trim', e.target.value)}
          suggestions={suggestions.trim}
          onSuggestionSelect={(value) => onSuggestionSelect('vehicle', 'trim', value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="vehicleColor"
          label="Color"
          placeholder="Color"
          value={formData.vehicle.color}
          onChange={(e) => handleChange('vehicle', 'color', e.target.value)}
          suggestions={suggestions.color}
          onSuggestionSelect={(value) => onSuggestionSelect('vehicle', 'color', value)}
        />
        
        <InputField
          id="vehiclePlate"
          label="License Plate"
          placeholder="License Plate"
          value={formData.vehicle.plate}
          onChange={(e) => handleChange('vehicle', 'plate', e.target.value)}
        />
      </div>

      <InputField
        id="vehicleVin"
        label="VIN"
        placeholder="Vehicle Identification Number"
        value={formData.vehicle.vin}
        onChange={(e) => handleChange('vehicle', 'vin', e.target.value)}
      />
    </div>
  );
};

export default VehicleInformation;