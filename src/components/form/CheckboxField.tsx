import React from 'react';

interface CheckboxFieldProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ id, label, checked, onChange }) => (
  <div className="flex items-center gap-2">
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="text-blue-500"
    />
    <label htmlFor={id} className="text-sm text-gray-400">
      {label}
    </label>
  </div>
);

export default CheckboxField;
