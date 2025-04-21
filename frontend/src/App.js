import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import TravelLogs from './pages/TravelLogs';
import JourneyPlans from './pages/JourneyPlans';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/travel-logs" element={<TravelLogs />} />
          <Route path="/journey-plans" element={<JourneyPlans />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
