import React, { useState, useEffect } from 'react';
import { getActiveQuests, getCompletedQuests, getRewardedQuests, getAllQuests, claimReward, getUser } from '../services/api';

function QuestTabs() {
  const [activeTab, setActiveTab] = useState('active');
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRewards, setUserRewards] = useState({ gold: 0, diamond: 0 });
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchQuests();
      fetchUserRewards();
    } else {
      setError('User ID not found. Please log in again.');
    }
  }, [activeTab, userId]);

  const fetchQuests = async () => {
    setLoading(true);
    setError(null);
    try {
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
      setQuests(response.data);
    } catch (err) {
      console.error('Error fetching quests:', err);
      setError('Failed to fetch quests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRewards = async () => {
    try {
      const users = await getUser();
      const currentUser = users.find(user => user._id === userId);
      
      if (currentUser) {
        setUserRewards({
          gold: currentUser.gold,
          diamond: currentUser.diamond
        });
      } else {
        console.error('Current user not found');
        setError('Failed to fetch user rewards');
      }
    } catch (error) {
      console.error('Error fetching user rewards:', error);
      setError('Failed to fetch user rewards');
    }
  };

  const handleClaimReward = async (questId) => {
    try {
      setError('');
      const response = await claimReward(userId, questId);
      console.log('Reward claimed successfully:', response.data);
      fetchQuests();
      fetchUserRewards();
    } catch (err) {
      console.error('Error claiming reward:', err);
      if (err.response) {
        setError(`Failed to claim reward: ${err.response.data.message}`);
      } else if (err.request) {
        setError('No response received from server. Please try again.');
      } else {
        setError(`Error: ${err.message}`);
      }
    }
  };

  const renderQuestDetails = (quest) => {
    switch (activeTab) {
      case 'active':
        return (
          <>
            <p>Status: In Progress</p>
            <p>Progress: {quest.progress} / {quest.totalRequired}</p>
          </>
        );
      case 'completed':
        return (
          <>
            <p>Completed at: {new Date(quest.completedAt).toLocaleString()}</p>
            <button onClick={() => handleClaimReward(quest.id)}>Claim Reward</button>
          </>
        );
      case 'rewarded':
        return <p>Reward claimed at: {new Date(quest.rewardClaimedAt).toLocaleString()}</p>;
      case 'all':
        return (
          <>
            <p>Status: {quest.status}</p>
            {quest.completedAt && <p>Completed at: {new Date(quest.completedAt).toLocaleString()}</p>}
            {quest.rewardClaimedAt && <p>Reward claimed at: {new Date(quest.rewardClaimedAt).toLocaleString()}</p>}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('active')}>Active Quests</button>
        <button onClick={() => setActiveTab('completed')}>Completed Quests</button>
        <button onClick={() => setActiveTab('rewarded')}>Rewarded Quests</button>
        <button onClick={() => setActiveTab('all')}>All Quests</button>
      </div>
      <div>
        <h3>Your Rewards</h3>
        <p>Gold: {userRewards.gold}</p>
        <p>Diamond: {userRewards.diamond}</p>
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