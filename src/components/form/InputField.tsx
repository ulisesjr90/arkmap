// src/components/form/InputField.tsx
import React, { useState } from 'react';
import SuggestionsDropdown from '../common/SuggestionsDropdown';

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange,
  type = "text",
  suggestions = [],
  onSuggestionSelect
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSuggestionSelect = (suggestion: string) => {
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    }
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm text-gray-400">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500"
      />
      <SuggestionsDropdown 
        suggestions={suggestions}
        onSelect={handleSuggestionSelect}
        visible={isFocused && suggestions.length > 0}
      />
    </div>
  );
};

export default InputField;