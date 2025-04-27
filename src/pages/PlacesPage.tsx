import React, { useEffect, useState } from 'react';
import { Place } from '../types/Place';
import PlaceList from '../components/PlaceList';
import { getPlaces } from '../services/PlaceService';
import Map from '../components/Map';
import WeatherChart from '../components/WeatherChart'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const PlacesPage: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]); // רשימת המקומות 
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null); // המקום שנבחר
  const [selectedType, setSelectedType] = useState<string>(''); // מצב הסינון
  const [loading, setLoading] = useState<boolean>(true); // מצב טעינה
  const [error, setError] = useState<string>(''); // הודעת שגיאה במקרה שאין מידע

  // הטעינה של המקומות
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await getPlaces();
        if (data.length === 0) {
          setError('No places available. Please try again later.');
        }
        setPlaces(data);
      } catch (error) {
        console.error('Error fetching places:', error);
        setError('Error fetching places. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  // סינון המקומות על פי הסוג שנבחר
  const filteredPlaces = selectedType
    ? places.filter((place) => place.type === selectedType)
    : places;

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-3">
          <h5>Filter by Type</h5>
          <select
            className="form-select"
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
          >
            <option value="">All</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Hotel">Hotel</option>
            <option value="Park">Park</option>
          </select>
        </div>
      </div>

      {/* רשימת המקומות והמפה */}
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
                <p>{error}</p>
              </div>
            ) : (
              <PlaceList places={filteredPlaces} onSelect={setSelectedPlace} selectedPlace={selectedPlace} />
            )}
          </div>
        </div>

        <div className="col-md-8">
          <Map places={filteredPlaces} selectedPlace={selectedPlace} />
        </div>
      </div>

      {/* גרף מזג האוויר */}
      {selectedPlace && selectedPlace.latitude != null && selectedPlace.longitude != null && (
        <div className="mt-4">
          {selectedPlace.latitude === 0 || selectedPlace.longitude === 0 ? (
            <p>The selected place has invalid coordinates (latitude or longitude is 0).</p>
          ) : (
            <div>
              <h5>Weather Chart for {selectedPlace.name}</h5>
              <WeatherChart lat={selectedPlace.latitude} lon={selectedPlace.longitude} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
