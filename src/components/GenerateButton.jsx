import React from 'react';

function GenerateButton({ onClick, isLoading }) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`px-6 py-3 bg-green500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? 'Generating...' : 'Generate Music'}
    </button>
  );
}

export default GenerateButton;
