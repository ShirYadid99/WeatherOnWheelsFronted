// src/components/PlaceList.tsx
import React from 'react';
import { Place } from '../types/Place'; // ייבוא טיפוס הנתונים של מקום

// הגדרת מבנה הפרופס שהרכיב PlaceList מקבל
interface PlaceListProps {
  places: Place[]; // מערך של מקומות להצגה
  onSelect: (place: Place) => void; // פונקציה שתופעל כאשר משתמש בוחר מקום
  selectedPlace: Place | null; // המקום הנבחר (אם יש)
}

// רכיב להצגת רשימת מקומות
const PlaceList: React.FC<PlaceListProps> = ({ places, onSelect, selectedPlace }) => {
  return (
    <div
      style={{
        width: '300px', // רוחב קבוע לרשימה
        overflowY: 'auto', // מאפשר גלילה אנכית אם הרשימה ארוכה
        border: '1px solid #ccc', // מסגרת אפורה עדינה
        padding: '10px', // רווח פנימי
        borderRadius: '8px' // פינות מעוגלות
      }}
    >
      {/* כותרת הרשימה */}
      <h2 style={{ textAlign: 'center' }}>Places</h2>

      {/* רשימת מקומות */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {places.map((place) => (
          <li
            key={place.id} // מפתח ייחודי לכל מקום
            onClick={() => onSelect(place)} // לחיצה על מקום תפעיל את הפונקציה onSelect
            style={{
              marginBottom: '10px', // רווח בין מקומות
              cursor: 'pointer', // סמן עכבר מצביע
              padding: '8px', // ריפוד פנימי
              borderRadius: '6px', // פינות מעוגלות
              backgroundColor: selectedPlace?.id === place.id ? '#d0f0fd' : '#f9f9f9', // רקע אחר למקום נבחר
              border: selectedPlace?.id === place.id ? '2px solid #00aaff' : '1px solid #ddd' // גבול מודגש למקום נבחר
            }}
          >
            {/* הצגת שם המקום בצורה מודגשת */}
            <strong>{place.name}</strong> <br />
            {/* הצגת סוג המקום */}
            <small>{place.type}</small> <br />
            {/* הצגת כתובת המקום */}
            <small>{place.address}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceList;
