import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db, Team } from '../config/firestore';
import { useAuth } from '../contexts/AuthContext';

export const useTeam = () => {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'teams'),
      where('members', 'array-contains', user.uid)
    );

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        if (!snapshot.empty) {
          const teamData = {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data()
          } as Team;
          setTeam(teamData);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching team:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return {
    team,
    loading,
    error
  };
};
