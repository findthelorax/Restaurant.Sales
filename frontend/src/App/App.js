import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TeamMembersProvider } from '../contexts/TeamMembersContext';
import { TeamContextProvider } from '../contexts/TeamContext';
import { ErrorProvider } from '../contexts/ErrorContext';

import MainLayout from '../pages/MainLayout';

function App() {
	return (
		<Router>
			<ErrorProvider>
			<TeamContextProvider>
				<TeamMembersProvider>
					<MainLayout />
				</TeamMembersProvider>
			</TeamContextProvider>
			</ErrorProvider>
		</Router>
	);
}

export default App;