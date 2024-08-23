import React, { useState } from 'react';
import MoodSelector from './components/MoodSelector';
import ParameterControls from './components/ParameterControls';
import MusicPlayer from './components/MusicPlayer';
import GenerateButton from './components/GenerateButton';

function App() {
  const [currentMood, setCurrentMood] = useState(null);
  const [parameters, setParameters] = useState({});
  const [generatedMusic, setGeneratedMusic] = useState(null);
  

  const generateMusic = async () => {
    if (!currentMood) {
      alert("Please select a mood first.")
      return;
    }

    // Call AI API here
    // Update generatedMusic state
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">AI Music Generator</h1>
      <MoodSelector setMood={setCurrentMood} />
      <ParameterControls setParameters={setParameters} />
      <GenerateButton onClick={generateMusic} />
      {generatedMusic && <MusicPlayer music={generatedMusic} />}
    </div>
  );
}

export default App;