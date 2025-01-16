import React from 'react';

interface TextAreaFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ id, label, placeholder, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm text-gray-400">
      {label}
    </label>
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
    ></textarea>
  </div>
);

export default TextAreaField;
