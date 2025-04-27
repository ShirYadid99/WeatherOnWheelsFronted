import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ייבוא הפונקציה ניווט בין עמודים
import { createPlace } from '../services/PlaceService'; // ייבוא השירות שמטפל ביצירת מקום חדש
import 'bootstrap/dist/css/bootstrap.min.css'; // ייבוא עיצוב Bootstrap

// רכיב לדף יצירת מקום חדש
const CreatePage: React.FC = () => {
  // משתנים לניהול המידע בטופס
  const [name, setName] = useState(''); // שם המקום
  const [type, setType] = useState('Restaurant'); // סוג המקום (ברירת מחדל: מסעדה)
  const [address, setAddress] = useState(''); // כתובת המקום
  const [loading, setLoading] = useState(false); // מצב ההמתנה (אם התהליך יצירת המקום פעיל)
  const [successMessage, setSuccessMessage] = useState(''); // הודעת הצלחה במקרה של יצירת מקום
  const navigate = useNavigate(); // פונקציה לניווט בין עמודים

  // פונקציה שמטפלת במשלוח הטופס
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // מונע את שליחת הטופס באופן ברירת מחדל
    setLoading(true); // מתחילים את מצב ההמתנה

    try {
      // קריאה לשירות יצירת מקום חדש
      await createPlace({ name, type, address });
      setSuccessMessage('Place created successfully!'); // הצגת הודעת הצלחה
      setLoading(false); // סיום מצב ההמתנה
      setTimeout(() => navigate('/'), 1500);  // ניווט לעמוד הבית אחרי 1.5 שניות
    } catch (error) {
      setLoading(false); // סיום מצב ההמתנה גם במקרה של שגיאה
      alert('Error: ' + error); // הצגת שגיאה אם הייתה בעיה
    }
  };

  return (
    <div className="container mt-4">
      {/* טופס יצירת מקום */}
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <h2>Create New Place</h2>

        {/* שדה שם מקום */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)} // עדכון שם המקום
            maxLength={25} // הגבלת אורך לשם המקום
            required // דרישה לשדה זה
            className="form-control"
          />
        </div>

        {/* שדה סוג מקום */}
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <select
            id="type"
            value={type}
            onChange={e => setType(e.target.value)} // עדכון סוג המקום
            className="form-select"
          >
            <option>Restaurant</option> {/* אפשרות: מסעדה */}
            <option>Hotel</option> {/* אפשרות: מלון */}
            <option>Park</option> {/* אפשרות: פארק */}
          </select>
        </div>

        {/* שדה כתובת מקום */}
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            id="address"
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)} // עדכון כתובת המקום
            required // דרישה לשדה זה
            className="form-control"
          />
        </div>

        {/* כפתור שליחה */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create'} {/* טקסט הכפתור משתנה לפי מצב ההמתנה */}
        </button>
      </form>

      {/* הצגת הודעת הצלחה */}
      {successMessage && (
        <div className="mt-4 alert alert-success">
          {successMessage} {/* הודעת הצלחה אם יצירת המקום הצליחה */}
        </div>
      )}
    </div>
  );
};

export default CreatePage;
