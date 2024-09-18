import React, { useState, useEffect } from 'react';

function QuestList() {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    // Here you would typically fetch quests from your API
    // For now, we'll use dummy data
    setQuests([
      { id: 1, name: 'Daily Login', description: 'Log in for 3 consecutive days' },
      { id: 2, name: 'Vocabulary Challenge', description: 'Learn 10 new words' },
      { id: 3, name: 'Speaking Practice', description: 'Record a 1-minute speech' },
    ]);
  }, []);

  return (
    <div>
      <h2>Available Quests</h2>
      <ul>
        {quests.map(quest => (
          <li key={quest.id}>
            <h3>{quest.name}</h3>
            <p>{quest.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestList;