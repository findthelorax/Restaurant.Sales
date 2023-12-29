import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TeamContextProvider } from '../contexts/TeamContext';
import { TeamMembersProvider } from '../contexts/TeamMembersContext';
import { DailyTotalsProvider } from '../contexts/DailyTotalsContext';
import { ErrorProvider } from '../contexts/ErrorContext';

import MainLayout from '../pages/MainLayout';

function App() {
	return (
		<Router>
			<ErrorProvider>
				<TeamContextProvider>
					<TeamMembersProvider>
						<DailyTotalsProvider>
							<MainLayout />
						</DailyTotalsProvider>
					</TeamMembersProvider>
				</TeamContextProvider>
			</ErrorProvider>
		</Router>
	);
}

export default App;
