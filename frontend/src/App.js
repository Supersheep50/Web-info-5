import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import TravelLogs from './pages/Travel Logs/TravelLogs';
import JourneyPlans from './pages/Journey Plans/JourneyPlans';

function App() {

  const isLoggedIn = localStorage.getItem('userId');
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/travel-logs" element={isLoggedIn ? <TravelLogs /> : <Navigate to="/login" />} />
          <Route path="/journey-plans" element={isLoggedIn ? <JourneyPlans /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
