import React from 'react';
import InputField from '../../form/InputField';
import CheckboxField from '../../form/CheckboxField';

interface InsuranceInformationProps {
  formData: any;
  handleChange: (section: string, field: string, value: any) => void;
  suggestions: {
    carrier: string[];
  };
  onSuggestionSelect: (section: string, field: string, value: string) => void;
}

const InsuranceInformation: React.FC<InsuranceInformationProps> = ({
  formData,
  handleChange,
  suggestions,
  onSuggestionSelect
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      <div className="text-sm text-gray-400">Insurance Information</div>
      
      <InputField
        id="insuranceCarrier"
        label="Insurance Carrier"
        placeholder="Carrier Name"
        value={formData.insurance.carrier}
        onChange={(e) => handleChange('insurance', 'carrier', e.target.value)}
        suggestions={suggestions.carrier}
        onSuggestionSelect={(value) => onSuggestionSelect('insurance', 'carrier', value)}
      />

      <InputField
        id="policyNumber"
        label="Policy Number"
        placeholder="Policy Number"
        value={formData.insurance.policyNumber}
        onChange={(e) => handleChange('insurance', 'policyNumber', e.target.value)}
      />

      <InputField
        id="deductible"
        label="Deductible"
        placeholder="Deductible Amount"
        value={formData.insurance.deductible}
        onChange={(e) => handleChange('insurance', 'deductible', e.target.value)}
      />

      <CheckboxField
        id="rentalCoverage"
        label="Rental Coverage"
        checked={formData.insurance.rentalCoverage}
        onChange={(e) => handleChange('insurance', 'rentalCoverage', e.target.checked)}
      />
    </div>
  );
};

export default InsuranceInformation;