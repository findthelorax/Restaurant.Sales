import React from 'react';
import { TeamMembersProvider } from './contexts/TeamMembersContext';
import MainLayout from './pages/MainLayout';

function App() {
  return (
    <TeamMembersProvider>
      <MainLayout />
    </TeamMembersProvider>
  );
}

export default App;