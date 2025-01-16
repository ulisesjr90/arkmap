import React from 'react';
import InputField from '../../form/InputField';

interface CustomerInformationProps {
  formData: any;
  handleChange: (section: string, field: string, value: any) => void;
  useCurrentLocation: () => void;
}

const CustomerInformation: React.FC<CustomerInformationProps> = ({
  formData,
  handleChange,
  useCurrentLocation,
}) => (
  <div className="bg-gray-800 rounded-lg p-4 space-y-4">
    <div className="text-sm text-gray-400">Customer Information</div>
    <InputField
      id="customerName"
      label="Full Name"
      placeholder="Full Name"
      value={formData.customer.name}
      onChange={(e) => handleChange('customer', 'name', e.target.value)}
    />
    <InputField
      id="customerPhone"
      label="Phone Number"
      placeholder="Phone Number"
      value={formData.customer.phone}
      onChange={(e) => handleChange('customer', 'phone', e.target.value)}
    />
    <InputField
      id="customerEmail"
      label="Email"
      placeholder="Email"
      value={formData.customer.email}
      onChange={(e) => handleChange('customer', 'email', e.target.value)}
      type="email"
    />
    <button
      type="button"
      onClick={useCurrentLocation}
      className="bg-blue-500 text-white rounded-lg px-3 py-2 hover:bg-blue-600"
    >
      Use Current Location
    </button>
    <InputField
      id="customerAddress"
      label="Address"
      placeholder="Address"
      value={formData.customer.address}
      onChange={(e) => handleChange('customer', 'address', e.target.value)}
    />
  </div>
);

export default CustomerInformation;
