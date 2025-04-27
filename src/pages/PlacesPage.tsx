import React, { useEffect, useState } from 'react';
import { Place } from '../types/Place'; // ייבוא טיפוס המידע של מקום
import PlaceList from '../components/PlaceList'; // ייבוא רכיב להצגת רשימת המקומות
import { getPlaces } from '../services/PlaceService'; // ייבוא שירות המנהל את הבאת המקומות
import Map from '../components/Map'; // ייבוא רכיב המפה
import WeatherChart from '../components/WeatherChart'; // ייבוא רכיב הגרף למזג האוויר
import 'bootstrap/dist/css/bootstrap.min.css'; // ייבוא עיצוב Bootstrap

// רכיב לדף הצגת מקומות
const PlacesPage: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]); // רשימת המקומות
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null); // המקום שנבחר
  const [selectedType, setSelectedType] = useState<string>(''); // מצב הסינון לפי סוג
  const [loading, setLoading] = useState<boolean>(true); // מצב טעינה
  const [error, setError] = useState<string>(''); // הודעת שגיאה אם יש בעיה בהבאת המקומות

  // הטעינה של המקומות מהשירות
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await getPlaces(); // קריאה לשירות שמחזיר את המקומות
        if (data.length === 0) {
          setError('No places available. Please try again later.'); // הודעת שגיאה אם אין מקומות
        }
        setPlaces(data); // עדכון רשימת המקומות
      } catch (error) {
        console.error('Error fetching places:', error);
        setError('Error fetching places. Please try again later.'); // הודעת שגיאה במקרה של כישלון בהבאה
      } finally {
        setLoading(false); // סיום מצב הטעינה
      }
    };

    fetchPlaces();
  }, []); // הפונקציה תרוץ פעם אחת בעת הטעינה הראשונית של הדף

  // סינון המקומות לפי הסוג שנבחר
  const filteredPlaces = selectedType
    ? places.filter((place) => place.type === selectedType) // סינון לפי סוג
    : places;

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-3">
          <h5>Filter by Type</h5>
          <select
            className="form-select"
            onChange={(e) => setSelectedType(e.target.value)} // עדכון סוג המקום שנבחר
            value={selectedType}
          >
            <option value="">All</option> {/* ברירת מחדל */}
            <option value="Restaurant">Restaurant</option>
            <option value="Hotel">Hotel</option>
            <option value="Park">Park</option>
          </select>
        </div>
      </div>

      {/* הצגת רשימת המקומות והמפה */}
      <div className="row">
        <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column', maxHeight: '500px' }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', color: 'red' }}>
                <p>{error}</p> {/* הצגת הודעת שגיאה אם יש */}
              </div>
            ) : (
              <PlaceList places={filteredPlaces} onSelect={setSelectedPlace} selectedPlace={selectedPlace} />
            )}
          </div>
        </div>

        <div className="col-md-8">
          <Map places={filteredPlaces} selectedPlace={selectedPlace} /> {/* הצגת המפה */}
        </div>
      </div>

      {/* הצגת גרף מזג האוויר עבור המקום שנבחר */}
      {selectedPlace && selectedPlace.latitude != null && selectedPlace.longitude != null && (
        <div className="mt-4">
          {selectedPlace.latitude === 0 || selectedPlace.longitude === 0 ? (
            <p>The selected place has invalid coordinates (latitude or longitude is 0).</p> // טיפול במיקום לא תקין
          ) : (
            <div>
              <h5>Weather Chart for {selectedPlace.name}</h5>
              <WeatherChart lat={selectedPlace.latitude} lon={selectedPlace.longitude} /> {/* הצגת גרף מזג האוויר */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
