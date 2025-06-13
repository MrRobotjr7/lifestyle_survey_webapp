import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyResults from './SurveyResults';
import Navbar from './Navbar';

export default function App() {
  const [view, setView] = useState('form'); 

  return (
    <div className="min-h-screen w-full p-6">
      <Navbar view={view} setView={setView} />

      {view === 'form' && <SurveyForm />}
      {view === 'results' && <SurveyResults />}
    </div>
  );
}
