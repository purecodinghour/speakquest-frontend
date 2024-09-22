import React, { useState, useEffect } from 'react';
import { getActiveQuests, getCompletedQuests, getRewardedQuests, getAllQuests } from '../services/api';

function QuestTabs() {
  const [activeTab, setActiveTab] = useState('active');
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchQuests();
    } else {
      setError('User ID not found. Please log in again.');
    }
  }, [activeTab, userId]);

  const fetchQuests = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching quests for userId:', userId);
      console.log('Current activeTab:', activeTab);
      let response;
      switch (activeTab) {
        case 'active':
          response = await getActiveQuests(userId);
          break;
        case 'completed':
          response = await getCompletedQuests(userId);
          break;
        case 'rewarded':
          response = await getRewardedQuests(userId);
          break;
        case 'all':
          response = await getAllQuests(userId);
          break;
        default:
          response = { data: [] };
      }
      console.log('API Response:', response);
      console.log('Response data:', response.data);
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      setQuests(response.data);
    } catch (err) {
      console.error('Error fetching quests:', err);
      if (err.response) {
        console.error('Error response:', err.response.data);
        console.error('Error status:', err.response.status);
        console.error('Error headers:', err.response.headers);
      } else if (err.request) {
        console.error('Error request:', err.request);
      } else {
        console.error('Error message:', err.message);
      }
      setError('Failed to fetch quests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderQuestDetails = (quest) => {
    if (quest.status === 'in_progress') {
      return (
        <>
          <p>Status: In Progress</p>
          <p>Progress: {quest.progress} / {quest.totalRequired}</p>
        </>
      );
    } else if (quest.completedAt) {
      return <p>Completed at: {new Date(quest.completedAt).toLocaleString()}</p>;
    }
    return null;
  };

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('active')}>Active Quests</button>
        <button onClick={() => setActiveTab('completed')}>Completed Quests</button>
        <button onClick={() => setActiveTab('rewarded')}>Rewarded Quests</button>
        <button onClick={() => setActiveTab('all')}>All Quests</button>
      </div>
      {loading && <p>Loading quests...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {quests.length > 0 ? (
          quests.map(quest => (
            <div key={quest.id || quest._id}>
              <h3>{quest.name}</h3>
              <p>{quest.description}</p>
              {renderQuestDetails(quest)}
            </div>
          ))
        ) : (
          <p>No quests found.</p>
        )}
      </div>
    </div>
  );
}

export default QuestTabs;