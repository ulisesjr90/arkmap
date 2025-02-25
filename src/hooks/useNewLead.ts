import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { NewLeadForm, initialFormState } from '../types/lead';
import { useSuggestions } from './useSuggestions';

export const useNewLead = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<NewLeadForm>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { suggestions, handleSuggestions, addNewSuggestions } = useSuggestions();

  const handleChange = async (section: keyof NewLeadForm, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));

    // Fetch suggestions for specific fields
    if (section === 'vehicle' && ['make', 'model', 'trim', 'color'].includes(field)) {
      await handleSuggestions(field, value);
    } else if (section === 'insurance' && field === 'carrier') {
      await handleSuggestions('carrier', value);
    }
  };

  const handleSuggestionSelect = (section: keyof NewLeadForm, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBbVGXiDjNsA74RmR-gIjHOia43l7SHHmk`
      );
      
      const data = await response.json();
      
      if (data.results && data.results[0]) {
        const address = data.results[0].formatted_address;
        setFormData(prev => ({
          ...prev,
          customer: {
            ...prev.customer,
            address
          }
        }));
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setError('Failed to get your location');
    }
  };

  const createLead = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!user) {
        throw new Error('No authenticated user');
      }

      const leadData = {
        ...formData,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Add the lead to Firestore
      const leadsRef = collection(db, 'leads');
      const docRef = await addDoc(leadsRef, leadData);

      // Add new suggestions
      await addNewSuggestions([
        { type: 'make', value: formData.vehicle.make },
        { type: 'model', value: formData.vehicle.model },
        { type: 'trim', value: formData.vehicle.trim },
        { type: 'color', value: formData.vehicle.color },
        { type: 'carrier', value: formData.insurance.carrier }
      ]);

      return docRef.id;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw new Error('Failed to create lead');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    suggestions,
    handleChange,
    handleSuggestionSelect,
    handleCurrentLocation,
    createLead,
    setError
  };
};