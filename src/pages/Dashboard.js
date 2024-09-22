import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your SpeakQuest dashboard!</p>
      <Link to="/quests">
        <button>View Quests</button>
      </Link>
    </div>
  );
}

export default Dashboard;