import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { DailyTotalsFormRender } from '../dailyTotals/dailyTotalsFormRender';
import { TeamMembersContext } from '../../contexts/TeamMembersContext'; // Import TeamMembersContext
// import { updateWeeklyTotals } from '../../utils/api';
// import { initialDailyTotals } from '../../hooks/initiateDailyTotals';
// import { useHandleDailyTotalsChange } from '../../hooks/handleDailyTotalsChange';
// import { useHandleSubmit } from '../../hooks/handleSubmitDailyTotals';
// TODO: REMOVE DAILYTOTALS CONTEXT

export default function DailyTotalsForm() {
	const { teamMembers } = useContext(TeamMembersContext); // Use TeamMembersContext
	// const { submitDailyTotals } = useContext(DailyTotalsContext);
	// const [dailyTotals, setDailyTotals] = useState(initialDailyTotals);
	const [selectedTeamMember, setSelectedTeamMember] = React.useState('');

	// const handleDailyTotalsChange = useHandleDailyTotalsChange(teamMembers, setDailyTotals, setSelectedTeamMember); // Use teamMembers instead of team
	// const handleSubmit = useHandleSubmit(submitDailyTotals, dailyTotals, selectedTeamMember, setSelectedTeamMember, initialDailyTotals, setDailyTotals);
	
	// useEffect(() => {
		// const now = moment().local();
		// const nextDay = moment().local().add(1, 'days').startOf('day');
		// const msUntilMidnight = nextDay.diff(now);

		// const timeoutId = setTimeout(updateWeeklyTotals, msUntilMidnight);

		// return () => clearTimeout(timeoutId); // Clear the timeout if the component is unmounted
	// }, [selectedTeamMember]);

	return (
		<DailyTotalsFormRender
			team={teamMembers} // Use teamMembers instead of team
			// dailyTotals={dailyTotals}
			// handleDailyTotalsChange={handleDailyTotalsChange}
			// handleSubmit={handleSubmit}
			selectedTeamMember={selectedTeamMember}
			setSelectedTeamMember={setSelectedTeamMember}
		/>
	);
}