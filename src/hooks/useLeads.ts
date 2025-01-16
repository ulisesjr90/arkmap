import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
} from 'firebase/firestore';
import { db, Lead } from '../config/firestore';
import { useAuth } from '../contexts/AuthContext';

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'leads'),
      where('ownerId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newLeads = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Lead[];
        setLeads(newLeads);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching leads:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const getLead = async (leadId: string) => {
    try {
      const leadRef = doc(db, 'leads', leadId);
      const leadSnap = await getDoc(leadRef);
      if (!leadSnap.exists()) {
        throw new Error('Lead not found');
      }
      return { id: leadSnap.id, ...leadSnap.data() };
    } catch (err) {
      console.error('Error fetching lead:', err);
      throw err;
    }
  };

  const addLead = async (
    leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'ownerId'>
  ) => {
    try {
      if (!user) throw new Error('No user authenticated');

      const newLead = {
        ...leadData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        ownerId: user.uid,
      };

      const docRef = await addDoc(collection(db, 'leads'), newLead);
      return docRef.id;
    } catch (err) {
      console.error('Error adding lead:', err);
      throw err;
    }
  };

  const updateLead = async (leadId: string, updateData: Partial<Lead>) => {
    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, {
        ...updateData,
        updatedAt: Timestamp.now(),
      });
    } catch (err) {
      console.error('Error updating lead:', err);
      throw err;
    }
  };

  const deleteLead = async (leadId: string) => {
    try {
      await deleteDoc(doc(db, 'leads', leadId));
    } catch (err) {
      console.error('Error deleting lead:', err);
      throw err;
    }
  };

  return {
    leads,
    loading,
    error,
    getLead,
    addLead,
    updateLead,
    deleteLead,
  };
};
