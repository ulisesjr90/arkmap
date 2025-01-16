// src/components/common/SuggestionsDropdown.tsx
import React from 'react';

interface SuggestionsDropdownProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  visible: boolean;
}

const SuggestionsDropdown: React.FC<SuggestionsDropdownProps> = ({
  suggestions,
  onSelect,
  visible
}) => {
  if (!visible || !suggestions.length) return null;

  return (
    <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          type="button"
          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition-colors"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SuggestionsDropdown;