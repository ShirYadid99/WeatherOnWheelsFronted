import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // ייבוא רכיבי נווט מ-React Router
import PlacesPage from './pages/PlacesPage'; // ייבוא עמוד הצגת המקומות
import CreatePage from './pages/CreatePage'; // ייבוא עמוד יצירת מקום

const App: React.FC = () => {
  return (
    <Router> {/* הגדרת ה-Router סביב האפליקציה */}
      <div>
        <nav style={{ padding: '10px' }}> {/* ניווט עליון */}
          {/* קישורים בין דפים */}
          <Link to="/" style={{ marginRight: '20px' }}>Places</Link> {/* קישור לדף המקומות */}
          <Link to="/create" style={{ marginRight: '20px' }}>Create Place</Link> {/* קישור לדף יצירת מקום */}
        </nav>
        <Routes>
          {/* הגדרת הנתיבים והמרכיבים שיתאימו להם */}
          <Route path="/" element={<PlacesPage />} /> {/* נתיב לדף המקומות */}
          <Route path="/create" element={<CreatePage />} /> {/* נתיב לדף יצירת מקום */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
