import React, { useState, useEffect } from 'react';
import { AddToScheduleForm } from '../../components/teamMembers/workScheduleForm';
import MyCalendar from '../../components/teamMembers/workScheduleCalendar';
import { getWorkSchedule, createWorkSchedule } from '../../api/teamMembers';

const SchedulePage = () => {
	const [events, setEvents] = useState([]);

    useEffect(() => {
        getWorkSchedule().then((workSchedules) => {
            if (!Array.isArray(workSchedules)) {
                console.error('Expected workSchedules to be an array, got', workSchedules);
                return;
            }
    
            const events = workSchedules.flatMap((workSchedule) => {
                if (!Array.isArray(workSchedule.dates)) {
                    console.error('Expected workSchedule.dates to be an array, got', workSchedule.dates);
                    return [];
                }
    
                return workSchedule.dates.map((date) => ({
                    start: new Date(date),
                    end: new Date(date),
                    title: `${workSchedule.teamMemberFirstName} ${workSchedule.teamMemberLastName} - ${workSchedule.position}`,
                }));
            });
    
            setEvents(events);
        });
    }, []);

	const handleAddToSchedule = async (teamMember, date) => {
		// add the new work date to the schedule
		// then update the events state
		if (teamMember && date) {
			try {
				await createWorkSchedule(teamMember._id, [date]);
				setEvents((prevEvents) => [
					...prevEvents,
					{
						start: new Date(date),
						end: new Date(date),
						title: `${teamMember.teamMemberFirstName} ${teamMember.teamMemberLastName} - ${teamMember.position}`,
					},
				]);
			} catch (error) {
				console.error(`Error creating work schedule: ${error.message}`, error);
			}
		}
	};

	return (
		<div>
			<AddToScheduleForm onAddToSchedule={handleAddToSchedule} />
			<MyCalendar events={events} setEvents={setEvents} />
		</div>
	);
};

export default SchedulePage;
