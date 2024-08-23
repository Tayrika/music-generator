import React from 'react';

const moods = [
  '😊 Happy', '😢 Sad', '😎 Chill', '💪 Energetic', '😌 Relaxed'
];

const tempos = {
  '😊 Happy': 120,
  '😢 Sad': 80,
  '😎 Chill': 100,
  '💪 Energetic': 140,
  '😌 Relaxed': 90
};

const scales = {
  '😊 Happy': ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'],
  '😢 Sad': ['C4', 'D4', 'Eb4', 'F4', 'G4', 'Ab4', 'Bb4'],
  '😎 Chill': ['C4', 'D4', 'Eb4', 'F4', 'G4', 'A4', 'Bb4'],
  '💪 Energetic': ['C4', 'D4', 'E4', 'F#4', 'G4', 'A4', 'B4'],
  '😌 Relaxed': ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'Bb4']
};

function MoodSelector({ setMood }) {
  const handleMoodSelect = (mood) => {
    setMood({
      name: mood,
      tempo: tempos[mood],
      scale: scales[mood]
    });
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Select Your Mood</h2>
      <div className="flex space-x-2">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => handleMoodSelect(mood)}
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