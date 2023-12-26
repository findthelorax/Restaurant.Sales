import React from 'react';
import { TeamProvider } from './contexts/TeamContext';
import MainLayout from './pages/MainLayout';

function App() {
  return (
    <TeamProvider>
      <MainLayout />
    </TeamProvider>
  );
}

export default App;