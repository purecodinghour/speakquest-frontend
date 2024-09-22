import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn }) {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/quests">Quests</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;