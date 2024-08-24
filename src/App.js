import React, { useEffect, useState } from 'react';
import MoodSelector from './components/MoodSelector';
import ParameterControls from './components/ParameterControls';
import MusicPlayer from './components/MusicPlayer';
import GenerateButton from './components/GenerateButton';

import * as mm from '@magenta/music';
import * as Tone from 'tone';

function App() {
  const [currentMood, setCurrentMood] = useState(null);
  const [parameters, setParameters] = useState({ tempo: 120, genre: '' });
  const [generatedMusic, setGeneratedMusic] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [synth, setSynth] = useState(null);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    // Initialize Magenta and Tone.js
    const run = async () => {
      await mm.Player.tone.context.suspend();
      setSynth(new Tone.Synth().toDestination());
      setRecorder(new Tone.Recorder());
    };
    run();
  }, []);
  

  const generateMusic = async () => {
    if (!currentMood) {
      alert("Please select a mood first.")
      return;
    }

    setIsGenerating(true);

    // Call API 
    // Initialize the MusicRNN model
    const model = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
    await model.initialize();

    // Create a seed sequence based on the current mood
    const seed = {
      notes: [
        { pitch: Tone.Frequency(currentMood.scale[0]).toMidi(), startTime: 0.0, endTime: 0.5},
        { pitch: Tone.Frequency(currentMood.scale[2]).toMidi(), startTime: 0.5, endTime: 1.0 },
      ],
      totalTime: 1
    };

    // Generate a continuation of the seed sequence
    const result = await model.continueSequence(seed, 16, parameters.tempo / 60);

    // Set up audio recording
    await recorder.start();

    const now = Tone.now()

    // Play and record the generated notes
    result.notes.forEach(note => {
      synth.triggerAttackRelease(
        Tone.Frequency(note.pitch, "midi").toFrequency(),
        note.endTime - note.startTime,
        note.startTime + now
      );
    });

    // Wait for the melody to finish playing
    await Tone.getContext().rawContext.suspend(now + result.totalTime);

    // Stop recording and get the audio buffer
    const recordedBuffer = await recorder.stop();

    // Convert a audio buffer to a Blob URL
    const url = URL.createObjectURL(recordedBuffer);
    setGeneratedMusic(url);

    setIsGenerating(false);

  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Music Generator</h1>
      <MoodSelector setMood={setCurrentMood} />
      <ParameterControls setParameters={setParameters} />
      <GenerateButton onClick={generateMusic} />
      {generatedMusic && <MusicPlayer music={generatedMusic} />}
    </div>
  );
}

export default App;
