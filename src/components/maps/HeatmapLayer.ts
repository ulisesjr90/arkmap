import React, { useEffect, useState } from 'react';

interface HeatmapData {
  lat: number;
  lng: number;
  weight: number;
}

interface Lead {
  id: string;
  status: 'New Lead' | 'Contact Needed' | 'No Answer';
  location: {
    lat: number;
    lng: number;
  };
  dateCreated: Date;
}

interface HeatmapLayerProps {
  map: google.maps.Map | null;
  leads: Lead[];
  dateFilter: 'today' | 'week' | 'month' | 'custom';
  visible: boolean;
}

const HeatmapLayer: React.FC<HeatmapLayerProps> = ({ map, leads, dateFilter, visible }) => {
  const [heatmap, setHeatmap] = useState<google.maps.visualization.HeatmapLayer | null>(null);
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);

  // Initialize heatmap layer
  useEffect(() => {
    if (!map) return;

    const heatmapInstance = new google.maps.visualization.HeatmapLayer({
      map: visible ? map : null,
      data: [],
      radius: 20,
      opacity: 0.7,
      gradient: [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
      ]
    });

    setHeatmap(heatmapInstance);

    return () => {
      heatmnstance.setMap(null);
    };
  }, [map]);

  // Process leads into heatmap data
  const processLeads = (leads: Lead[]) => {
    // Get date range based on filter
    const getDateRange = () => {
      const now = new Date();
      switch (dateFilter) {
        case 'today':
          return new Date(now.setHours(0, 0, 0, 0));
        case 'week':
          return new Date(now.setDate(now.getDate() - 7));
        case 'month':
          return new Date(now.setMonth(now.getMonth() - 1));
        case 'custom':
          // Handle custom date range
          return new Date(0); // Temporary
        default:
          return new Date(0);
      }
    };

    const startDate = getDateRange();

    // Filter and process leads
    const filteredLeads = leads.filter(lead => {
      const leadDate = new Date(lead.dateCreated);
      return leadDate >= startDate;
    });

    // Group leads by location and calculate weights
    const locationMap = new Map<string, HeatmapData>();

    filteredLeads.forEach(lead => {
      const key = `${lead.location.lat},${lead.location.lng}`;
      const existingData = locationMap.get(key);

      // Calculate weight based on status
      let statusWeight = 1;
      switch (lead.status) {
        case 'New Lead':
          statusWeight = 3;
          break;
        case 'Contact Needed':
          statusWeight = 2;
          break;
        case 'No Answer':
          statusWeight = 1;
          break;
      }

      if (existingData) {
        existingData.weight += statusWeight;
      } else {
        locationMap.set(key, {
          lat: lead.location.lat,
          lng: lead.location.lng,
          weight: statusWeight
        });
      }
    });

    return Array.from(locationMap.values());
  };

  // Update heatmap when leads or filter changes
  useEffect(() => {
    if (!heatmap || !leads.length) return;

    const newData = processLeads(leads);
    setHeatmapData(newData);

    const heatmapPoints = newData.map(point => ({
      location: new google.maps.LatLng(point.lat, point.lng),
      weight: point.weight
    }));

    heatmap.setData(heatmapPoints);
  }, [leads, dateFilter, heatmap]);

  // Handle visibility
  useEffect(() => {
    if (!heatmap) return;
    heatmap.setMap(visible ? map : null);
  }, [visible, map, heatmap]);

  return null; // This is a functional component that doesn't render anything
};

export default HeatmapLayer;