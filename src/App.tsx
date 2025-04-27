import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PlacesPage from './pages/PlacesPage';
import CreatePage from './pages/CreatePage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav style={{ padding: '10px' }}>
          <Link to="/" style={{ marginRight: '20px' }}>Places</Link>
          <Link to="/create" style={{ marginRight: '20px' }}>Create Place</Link>
        </nav>
        <Routes>
          <Route path="/" element={<PlacesPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
