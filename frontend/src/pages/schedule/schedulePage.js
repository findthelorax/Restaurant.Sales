import React, { useState, useEffect, useContext } from 'react';
import { Grid, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { AddToScheduleForm } from '../../components/teamMembers/workScheduleForm';
import { ViewSchedule } from '../../components/teamMembers/workScheduleList'; 
import { getWorkSchedule, createWorkSchedule } from '../../api/teamMembers';
import { TeamMembersContext } from '../../contexts/TeamMembersContext';
import moment from 'moment';

const SchedulePage = () => {
	const { teamMembers } = useContext(TeamMembersContext);
	const [events, setEvents] = useState([]);
	const [open, setOpen] = useState(false);
	const [alert, setAlert] = useState('');
	const [successOpen, setSuccessOpen] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {
		Promise.all(
			teamMembers.map((member) =>
				getWorkSchedule(member._id).then((workSchedule) => ({
					...workSchedule,
					teamMemberFirstName: member.teamMemberFirstName,
					teamMemberLastName: member.teamMemberLastName,
				}))
			)
		).then((workSchedules) => {
			const events = workSchedules.flatMap((workSchedule) => {
				if (!workSchedule.workSchedule) {
					console.warn(
						`No work schedule for team member ${workSchedule.teamMemberFirstName} ${workSchedule.teamMemberLastName}`
					);
					return [];
				}

				if (!Array.isArray(workSchedule.workSchedule)) {
					console.error('Expected workSchedule.workSchedule to be an array, got', workSchedule.workSchedule);
					return [];
				}

				return workSchedule.workSchedule.map((date) => ({
					start: moment(date).toDate(),
					end: moment(date).toDate(),
					title: `${workSchedule.teamMemberFirstName} ${workSchedule.teamMemberLastName} - ${workSchedule.position}`,
				}));
			});

			setEvents(events);
		});
	}, [teamMembers]);

	const handleAddToSchedule = async (teamMember, date) => {
		if (teamMember && date) {
			const alreadyScheduled = events.some(
				(event) =>
					moment(event.start).isSame(moment(date), 'day') &&
					event.title.includes(`${teamMember.teamMemberFirstName} ${teamMember.teamMemberLastName}`)
			);

			if (alreadyScheduled) {
				setAlert(
					`${teamMember.teamMemberFirstName} ${teamMember.teamMemberLastName} is already scheduled for this day.`
				);
				setOpen(true);
			} else {
				try {
					await createWorkSchedule(teamMember._id, [date]);
					setEvents((prevEvents) => [
						...prevEvents,
						{
							start: moment(date).toDate(),
							end: moment(date).toDate(),
							title: `${teamMember.teamMemberFirstName} ${teamMember.teamMemberLastName} - ${teamMember.position}`,
						},
					]);
					setSuccessMessage(`${teamMember.teamMemberFirstName} ${teamMember.teamMemberLastName} has been scheduled.`);
					setSuccessOpen(true);
				} catch (error) {
					console.error(`Error creating work schedule: ${error.message}`, error);
				}
			}
		}
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6}>
				<AddToScheduleForm onAddToSchedule={handleAddToSchedule} />
			</Grid>
			{/* <Grid item xs={12} md={6}>
				<ViewSchedule />
			</Grid> */}
			<Snackbar open={successOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
				<Alert onClose={() => setSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
					{successMessage}
				</Alert>
			</Snackbar>
			<Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
				<Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
					{alert}
				</Alert>
			</Snackbar>
		</Grid>
	);
};

export default SchedulePage;