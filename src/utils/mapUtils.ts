import { Loader } from '@googlemaps/js-api-loader';

export const initializeMap = async (
  mapElement: HTMLElement,
  apiKey: string,
  options: google.maps.MapOptions
): Promise<google.maps.Map> => {
  const loader = new Loader({ apiKey, version: 'weekly' });
  const { Map } = await loader.importLibrary('maps');
  return new Map(mapElement, options);
};
