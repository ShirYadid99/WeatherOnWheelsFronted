import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Place } from '../types/Place';
import L from 'leaflet';

interface MapProps {
  places: Place[];
  selectedPlace: Place | null;
}

const MapUpdater: React.FC<{ selectedPlace: Place | null }> = ({ selectedPlace }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedPlace) {
      map.flyTo([selectedPlace.latitude, selectedPlace.longitude], 17);//כמה קרוב רוצים זום
    }
  }, [selectedPlace, map]);

  return null;
};

const Map: React.FC<MapProps> = ({ places, selectedPlace }) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={2}
      style={{ width: '100%', height: '500px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* מקפיץ את המפה כשנבחר מקום */}
      <MapUpdater selectedPlace={selectedPlace} />

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.latitude, place.longitude]}
          icon={new L.Icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png' })}
        >
          <Popup>{place.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;