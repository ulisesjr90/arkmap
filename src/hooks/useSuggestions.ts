import { useState } from 'react';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Suggestions } from '../types/lead';

const initialSuggestions: Suggestions = {
  make: [],
  model: [],
  trim: [],
  color: [],
  carrier: [],
};

interface SuggestionItem {
  type: string;
  value: string;
}

export const useSuggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestions>(initialSuggestions);

  const handleSuggestions = async (type: string, queryValue: string) => {
    if (!queryValue || queryValue.length < 2) {
      setSuggestions(prev => ({ ...prev, [type]: [] }));
      return;
    }
    
    try {
      const suggestionsRef = collection(db, 'suggestions');
      const q = query(
        suggestionsRef,
        where('type', '==', type),
        where('value', '>=', queryValue.toLowerCase()),
        where('value', '<=', queryValue.toLowerCase() + '\uf8ff')
      );
      
      const querySnapshot = await getDocs(q);
      const fetchedSuggestions = querySnapshot.docs.map(doc => doc.data().value);
      setSuggestions(prev => ({ ...prev, [type]: fetchedSuggestions }));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions(prev => ({ ...prev, [type]: [] }));
    }
  };

  const addNewSuggestions = async (items: SuggestionItem[]) => {
    const suggestionsRef = collection(db, 'suggestions');

    for (const { type, value } of items) {
      if (!value || value.trim() === '') continue;

      try {
        const q = query(
          suggestionsRef,
          where('type', '==', type),
          where('value', '==', value.toLowerCase().trim())
        );
        
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          await addDoc(suggestionsRef, {
            type,
            value: value.toLowerCase().trim(),
            createdAt: serverTimestamp()
          });
        }
      } catch (error) {
        console.error(`Error adding suggestion for ${type}:`, error);
      }
    }
  };

  return {
    suggestions,
    handleSuggestions,
    addNewSuggestions
  };
};