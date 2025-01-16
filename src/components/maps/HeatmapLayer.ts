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
        'rgba(255, 0, 0, 1)',
      ],
    });

    setHeatmap(heatmapInstance);

    return () => {
      if (heatmapInstance) {
        heatmapInstance.setMap(null); // Corrected from "heatmnstance"
      }
    };
  }, [map]);

  // Process leads into heatmap data
  const processLeads = (leads: Lead[]): HeatmapData[] => {
    const getDateRange = (): Date => {
      const now = new Date();
      switch (dateFilter) {
        case 'today':
          return new Date(now.setHours(0, 0, 0, 0));
        case 'week':
          return new Date(now.setDate(now.getDate() - 7));
        case 'month':
          return new Date(now.setMonth(now.getMonth() - 1));
        case 'custom':
          return new Date(0); // Adjust as needed for custom ranges
        default:
          return new Date(0);
      }
    };

    const startDate = getDateRange();

    const locationMap = new Map<string, HeatmapData>();

    leads
      .filter((lead) => new Date(lead.dateCreated) >= startDate)
      .forEach((lead) => {
        const key = `${lead.location.lat},${lead.location.lng}`;
        const existingData = locationMap.get(key);
        const statusWeight = lead.status === 'New Lead' ? 3 : lead.status === 'Contact Needed' ? 2 : 1;

        if (existingData) {
          existingData.weight += statusWeight;
        } else {
          locationMap.set(key, {
            lat: lead.location.lat,
            lng: lead.location.lng,
            weight: statusWeight,
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

    const heatmapPoints = newData.map(
      (point) =>
        new google.maps.visualization.WeightedLocation({
          location: new google.maps.LatLng(point.lat, point.lng),
          weight: point.weight,
        })
    );

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
