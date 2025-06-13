import React from 'react';

export default function Navbar({ view, setView }) {
  return (
    <div className="w-full px-8 py-6 flex justify-between ">
      <div className="text-lg font-bold text-gray-800">_Surveys</div>
      <div className="flex gap-6">
        <button
          onClick={() => setView('form')}
          className={`text-sm font-medium ${view === 'form' ? 'text-blue-500 border-b-2 border-blue-500 pb-1' : 'text-gray-600 hover:text-gray-800'}`}
        >
          FILL OUT SURVEY
        </button>
        <button
          onClick={() => setView('results')}
          className={`text-sm font-medium ${view === 'results' ? 'text-blue-500 border-b-2 border-blue-500 pb-1' : 'text-gray-600 hover:text-gray-800'}`}
        >
          VIEW SURVEY RESULTS
        </button>
      </div>
    </div>
  );
}
