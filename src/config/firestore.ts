import { getFirestore, collection } from 'firebase/firestore';
import { app } from './firebase';

export const db = getFirestore(app);

// Collection References
export const leadsCollection = collection(db, 'leads');
export const usersCollection = collection(db, 'users');
export const teamsCollection = collection(db, 'teams');
export const activitiesCollection = collection(db, 'activities');

// Type Definitions
export interface Lead {
  id?: string;
  vehicle: {
    year: string;
    make: string;
    model: string;
    trim: string;
    color: string;
    vin: string;
    plate: string;
  };
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  priority: 'High' | 'Medium' | 'Low';
  status: 'New Lead' | 'Contact Needed' | 'Appointment Set' | 'Closed' | 'Not Interested';
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  teamId: string;
  location?: {
    lat: number;
    lng: number;
  };
  shared?: {
    users: string[];
    teams: string[];
  };
}

export interface User {
  id?: string;
  email: string;
  name: string;
  teamId: string;
  role: 'admin' | 'member';
  createdAt: Date;
  settings: {
    notifications: boolean;
    darkMode: boolean;
    shareLocation: boolean;
  };
}

export interface Team {
  id?: string;
  name: string;
  ownerId: string;
  members: {
    userId: string;
    role: 'admin' | 'member';
    joinedAt: Date;
  }[];
  settings: {
    allowLeadSharing: boolean;
    requireApproval: boolean;
  };
}

export interface Activity {
  id?: string;
  type: 'lead_created' | 'lead_updated' | 'lead_shared' | 'member_joined' | 'territory_completed';
  userId: string;
  teamId: string;
  leadId?: string;
  createdAt: Date;
  data: any;
}
