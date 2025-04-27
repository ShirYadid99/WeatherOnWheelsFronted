import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Place } from '../types/Place';
import L from 'leaflet';

// ממשק שמגדיר את הפרופס שהרכיב Map מקבל
interface MapProps {
  places: Place[]; // רשימת מקומות להצגה על המפה
  selectedPlace: Place | null; // המקום הנבחר להצגת פוקוס עליו
}

// רכיב עזר שמעדכן את המפה ומעיף (flyTo) עליה כאשר נבחר מקום
const MapUpdater: React.FC<{ selectedPlace: Place | null }> = ({ selectedPlace }) => {
  const map = useMap(); // שימוש בהוק של leaflet לקבלת מופע המפה

  useEffect(() => {
    if (selectedPlace) {
      // מעיף את המפה למיקום של המקום הנבחר עם זום גבוה (17)
      map.flyTo([selectedPlace.latitude, selectedPlace.longitude], 15);
    }
  }, [selectedPlace, map]);

  return null; // הרכיב לא מציג כלום
};

// הרכיב הראשי שמציג את המפה
const Map: React.FC<MapProps> = ({ places, selectedPlace }) => {
  return (
    <MapContainer
      center={[51.505, -0.09]} // מרכז התחלתי של המפה
      zoom={2} // זום התחלתי (רחוק מאוד)
      style={{ width: '100%', height: '500px' }} // גודל המפה
    >
      {/* שכבת האריחים הבסיסית (מפות פתוחות של OpenStreetMap) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* רכיב שמעיף את המפה למקום הנבחר */}
      <MapUpdater selectedPlace={selectedPlace} />

      {/* יצירת מרקרים על כל המקומות */}
      {places.map((place) => (
        <Marker
          key={place.id} // מפתח ייחודי לכל מרקר
          position={[place.latitude, place.longitude]} // מיקום המרקר
          icon={new L.Icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png' })} // אייקון ברירת מחדל
        >
          {/* פופאפ שמציג את שם המקום כאשר לוחצים על המרקר */}
          <Popup>{place.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
