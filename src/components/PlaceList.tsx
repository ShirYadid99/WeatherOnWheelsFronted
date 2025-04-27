// src/components/PlaceList.tsx
import React from 'react';
import { Place } from '../types/Place'; // ייבוא טיפוס המידע של מקום

// הגדרת פרופס לרכיב PlaceList
interface PlaceListProps {
  places: Place[]; // מערך של מקומות להצגה ברשימה
  onSelect: (place: Place) => void; // פונקציה שתופעל כשמקום נבחר מהרשימה
  selectedPlace: Place | null; // המקום שנבחר, אם קיים
}

// רכיב PlaceList
const PlaceList: React.FC<PlaceListProps> = ({ places, onSelect, selectedPlace }) => {
  return (
    <div style={{ width: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
      {/* כותרת הרשימה */}
      <h2 style={{ textAlign: 'center' }}>Places</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {/* מעבר על המקומות והצגת כל אחד ברשימה */}
        {places.map((place) => (
          <li
            key={place.id} // מזהה ייחודי לכל מקום
            onClick={() => onSelect(place)} // קריאה לפונקציה onSelect כאשר לוחצים על המקום
            style={{
              marginBottom: '10px', // רווח בין פריטי הרשימה
              cursor: 'pointer', // סמן עכבר מורה על קישור
              padding: '8px', // ריפוד פנימי
              borderRadius: '6px', // רדיוס פינות קל לפריטי הרשימה
              backgroundColor: selectedPlace?.id === place.id ? '#d0f0fd' : '#f9f9f9', // צבע רקע למקום שנבחר
              border: selectedPlace?.id === place.id ? '2px solid #00aaff' : '1px solid #ddd' // גבול עבור מקום שנבחר
            }}
          >
            <strong>{place.name}</strong> <br /> {/* שם המקום ב-bold */}
            <small>{place.type}</small> <br /> {/* סוג המקום */}
            <small>{place.address}</small> {/* כתובת המקום */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceList;