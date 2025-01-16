import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import MapTools from './MapTools';
import HeatmapLayer from './HeatmapLayer';
import { useLeads } from '../../hooks/useLeads';
interface MapComponentProps {
  view: 'heatmap' | 'planning' | 'completed';
  dateFilter: 'today' | 'week' | 'month' | 'custom';
}

interface Route {
  id: string;
  name: string;
  status: 'planned' | 'in-progress' | 'completed';
  dateCreated: Date;
  polygon: google.maps.Polygon | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ view, dateFilter }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [heatmap, setHeatmap] = useState<google.maps.visualization.HeatmapLayer | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showTools, setShowTools] = useState(true);
  const [routes, setRoutes] = useState<Route[]>([]);
  const polylineRef = useRef<google.maps.Polyline | null>(null);
  const pathRef = useRef<google.maps.MVCArray<google.maps.LatLng>>();

  const { leads, loading } = useLeads(); // Fetch leads using custom hook

  const heatmapLeads = leads.filter(lead => 
    lead.status === 'New Lead' || 
    lead.status === 'Contact Needed' || 
    lead.status === 'No Answer'
  );

  const handleRouteStatusChange = (routeId: string, status: Route['status']) => {
    setRoutes((prevRoutes) =>
      prevRoutes.map((route) =>
        route.id === routeId
          ? {
              ...route,
              status,
              polygon: route.polygon ? updatePolygonStyle(route.polygon, status) : null,
            }
          : route
      )
    );
  };

  const handleRouteDelete = (routeId: string) => {
    const route = routes.find((r) => r.id === routeId);
    if (route?.polygon) {
      route.polygon.setMap(null);
    }
    setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== routeId));
  };

  const updatePolygonStyle = (polygon: google.maps.Polygon, status: Route['status']) => {
    const styles = {
      planned: { fillColor: '#FF0000', strokeColor: '#FF0000' },
      'in-progress': { fillColor: '#0088FF', strokeColor: '#0088FF' },
      completed: { fillColor: '#00FF00', strokeColor: '#00FF00' },
    };

    polygon.setOptions(styles[status]);
    return polygon;
  };

  const startDrawing = (e: google.maps.MapMouseEvent) => {
    if (!map || !e.latLng || !isDrawing) return;

    if (!polylineRef.current) {
      polylineRef.current = new google.maps.Polyline({
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      pathRef.current = polylineRef.current.getPath();
    }

    polylineRef.current.setMap(map);
    const path = polylineRef.current.getPath();
    path.clear();
    path.push(e.latLng);

    const moveListener = map.addListener('mousemove', (moveEvent: google.maps.MapMouseEvent) => {
      if (moveEvent.latLng) {
        path.push(moveEvent.latLng);
      }
    });

    map.addListenerOnce('mouseup', () => {
      google.maps.event.removeListener(moveListener);
      finishDrawing();
    });
  };

  const finishDrawing = () => {
    if (!map || !pathRef.current || pathRef.current.getLength() < 3) return;

    pathRef.current.push(pathRef.current.getAt(0));

    const polygon = new google.maps.Polygon({
      paths: pathRef.current.getArray(),
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map,
      editable: true,
    });

    const newRoute: Route = {
      id: Date.now().toString(),
      name: `Route ${routes.length + 1}`,
      status: 'planned',
      dateCreated: new Date(),
      polygon,
    };

    setRoutes((prevRoutes) => [...prevRoutes, newRoute]);

    polylineRef.current?.setMap(null);
    setIsDrawing(false);
  };

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyBbVGXiDjNsA74RmR-gIjHOia43l7SHHmk',
        version: 'weekly',
        libraries: ['places', 'drawing', 'visualization'],
      });

      try {
        const { Map } = await loader.importLibrary('maps');
        const { HeatmapLayer } = await loader.importLibrary('visualization') as any;

        const onSuccess = (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;

          if (mapRef.current) {
            const mapInstance = new Map(mapRef.current, {
              center: { lat: latitude, lng: longitude },
              zoom: 15,
              mapId: 'ARK_MAP_DARK',
              disableDefaultUI: false,
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            });

            const heatmapInstance = new HeatmapLayer({
              map: mapInstance,
              data: [],
              radius: 20,
              opacity: 0.7,
            });

            mapInstance.addListener('mousedown', startDrawing);
            setMap(mapInstance);
            setHeatmap(heatmapInstance);
          }
        };

        const onError = () => {
          if (mapRef.current) {
            const mapInstance = new Map(mapRef.current, {
              center: { lat: 34.0522, lng: -118.2437 },
              zoom: 13,
              mapId: 'ARK_MAP_DARK',
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            });
            setMap(mapInstance);
          }
        };

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          });
        } else {
          onError();
        }
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    initMap();

    return () => {
      if (map) {
        google.maps.event.clearInstanceListeners(map);
      }
    };
  }, []);

  useEffect(() => {
    if (!map || !heatmap) return;

    setShowTools(view === 'planning');

    switch (view) {
      case 'heatmap':
        heatmap.setMap(map);
        heatmap.setData(heatmapLeads.map(lead => ({
          location: new google.maps.LatLng(lead.latitude, lead.longitude),
          weight: lead.weight || 1
        })));
        break;
      case 'planning':
        heatmap.setMap(null);
        break;
      case 'completed':
        heatmap.setMap(null);
        routes.forEach((route) => {
          if (route.polygon) {
            route.polygon.setVisible(route.status === 'completed');
          }
        });
        break;
    }
  }, [view, map, heatmap, routes, heatmapLeads]);

  useEffect(() => {
    if (!map) return;

    map.setOptions({ draggableCursor: isDrawing ? 'crosshair' : null });
  }, [isDrawing, map]);

  useEffect(() => {
    if (!map) return;

    // Update data based on date filter
    switch (dateFilter) {
      case 'today':
        // Filter for today's data
        break;
      case 'week':
        // Filter for this week's data
        break;
      case 'month':
        // Filter for this month's data
        break;
      case 'custom':
        // Handle custom date range
        break;
    }
  }, [dateFilter, map]);

  return (
    <>
      {map && (
        <HeatmapLayer
          map={map}
          leads={heatmapLeads}
          dateFilter={dateFilter}
          visible={view === 'heatmap'}
        />
      )}
      {showTools && <MapTools onDrawingModeChange={setIsDrawing} />}
      <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
    </>
  );
};

export default MapComponent;


