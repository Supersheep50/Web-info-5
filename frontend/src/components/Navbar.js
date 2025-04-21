import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'text-white' : 'text-secondary';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">Travel Blog</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-3">
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/')}`} to="/">Login</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/travel-logs')}`} to="/travel-logs">Travel Logs</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/journey-plans')}`} to="/journey-plans">Journey Plans</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
