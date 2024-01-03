import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TeamContextProvider } from '../contexts/TeamContext';
import { TeamMembersProvider } from '../contexts/TeamMembersContext';
import { ErrorProvider } from '../contexts/ErrorContext';

import MainLayout from '../pages/MainLayout';
import LoginPage from '../pages/auth/login/Login';
import SignupPage from '../pages/auth/signup/Signup';
import ProfilePage from '../pages/auth/profile/Profile';

function App() {
	return (
		<Router>
			<ErrorProvider>
				<TeamContextProvider>
					<TeamMembersProvider>
						<Routes>
							<Route path="/login" element={<LoginPage />} />
							<Route path="/signup" element={<SignupPage />} />
							<Route path="/profile" element={<ProfilePage />} />
							<Route path="*" element={<MainLayout />} />
						</Routes>
					</TeamMembersProvider>
				</TeamContextProvider>
			</ErrorProvider>
		</Router>
	);
}

export default App;
