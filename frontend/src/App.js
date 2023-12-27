import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TeamMembersProvider } from './contexts/TeamMembersContext';
import MainLayout from './pages/MainLayout';

function App() {
	return (
		<Router>
			<TeamMembersProvider>
				<MainLayout />
			</TeamMembersProvider>
		</Router>
	);
}

export default App;