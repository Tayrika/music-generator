import React from 'react';

function ParameterControls({ parameters, setParameters }) {
  const handleChange = (e) => {
    setParameters({ ...parameters, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Customize Your Music</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="tempo" className="block mb-2">Tempo</label>
          <input 
            type="range"
            id="tempo"
            name="tempo"
            min="60"
            max="180"
            value={parameters.tempo || 120}
            onChange={handleChange}
            className="w-full"
          />
          <div className="text-sm text-gray-500 mt-1">{parameters.tempo || 120} BPM</div>
        </div>
        <div>
          <label htmlFor="genre" className="block mb-2">Genre</label>
          <select 
            id="genre"
            name="genre" 
            value={parameters.genre || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a genre</option>
            <option value="pop">Pop</option>
            <option value="rock">Rock</option>
            <option value="jazz">Jazz</option>
            <option value="classical">Classical</option>
            <option value="electronic">Electronic</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ParameterControls;
