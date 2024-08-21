import React from 'react';

const moods = ['😊 Happy', '😢 Sad', '😎 Chill', '💪 Energetic', '😌 Relaxed'];

function MoodSelector({ setMood }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Select Your Mood</h2>
      <div className="flex space-x-2">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => setMood(mood)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodSelector;