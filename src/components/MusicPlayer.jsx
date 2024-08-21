import React, { useRef, useState } from 'react';

function MusicPlayer({ musicUrl }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Your Generated Music</h2>
      <audio ref={audioRef} src={musicUrl} className="w-full mb-4" controls />
      <button
        onClick={togglePlay}
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

export default MusicPlayer;
