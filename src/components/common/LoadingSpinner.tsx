import React from 'react';

type LoadingSpinnerProps = {
  size?: 'small' | 'medium' | 'large';
  center?: boolean;
};

export const LoadingSpinner = ({ size = 'medium', center = true }: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={center ? 'flex justify-center items-center h-full' : undefined}>
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="h-full w-full border-4 border-t-blue-500 border-b-gray-700 border-l-gray-700 border-r-gray-700 rounded-full" />
      </div>
    </div>
  );
};

export default LoadingSpinner;

