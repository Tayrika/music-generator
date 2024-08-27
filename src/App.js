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
    const initializeAudio = async () => {
      try {
        // Start audio context
        await Tone.start();
        console.log('Tone.js initialized');

        // Initialize Magenta
        await mm.Player.tone.context.resume();
        console.log('Magenta initialized');

        // Initialize synth and recorder
        setSynth(new Tone.Synth().toDestination());
        setRecorder(new Tone.Recorder());

      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };

    initializeAudio();
  }, []);
  

  const generateMusic = async () => {
    if (!currentMood) {
      alert("Please select a mood first.");
      return;
    }
  
    setIsGenerating(true);
  
    try {
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
  
      // Start recording
      await recorder.start();
  
      const now = Tone.now();
  
      // Play the generated notes
      result.notes.forEach(note => {
        synth.triggerAttackRelease(
          Tone.Frequency(note.pitch, "midi").toFrequency(),
          note.endTime - note.startTime,
          note.startTime + now
        );
      });
  
      // Wait for the melody to finish playing
      await new Promise(resolve => setTimeout(resolve, result.totalTime * 1000));
  
      // Stop recording and get the audio buffer
      const recordedBuffer = await recorder.stop();
  
      // Convert audio buffer to a Blob URL
      const blob = new Blob([recordedBuffer], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      setGeneratedMusic(url);
  
    } catch (error) {
      console.error('Error generating music:', error);
      alert('An error occurred while generating music. Please try again.');
    } finally {
      setIsGenerating(false);
    }
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
