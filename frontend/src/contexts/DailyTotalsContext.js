import React, { createContext, useState, useEffect } from 'react';
import {
	getAllDailyTotals,
	submitDailyTotalToServer,
	deleteDailyTotalFromServer,
	updateDailyTotal,
} from '../api/salesTotals';
import { prepareDailyTotals } from '../hooks/prepareDailyTotals';
import { CalculateTipOuts } from '../hooks/tipOuts';
import { useUpdateTeamMemberTipOuts } from '../hooks/updateTeamMemberTipOuts';

export const DailyTotalsContext = createContext();

export const DailyTotalsProvider = ({ children }) => {
	const [dailyTotals, setDailyTotals] = useState([]);

	useEffect(() => {
		const fetchDailyTotals = async () => {
			try {
				const allDailyTotals = await getAllDailyTotals();
				setDailyTotals(allDailyTotals);
			} catch (error) {
				console.log('Error fetching daily totals', error);
				alert('Error fetching daily totals');
			}
		};

		fetchDailyTotals();
	}, []);

	// const createDailyTotal = async (total) => {
	//     try {
	//         const newDailyTotal = await submitDailyTotalToServer(total);
	//         setDailyTotals(prevDailyTotals => [...prevDailyTotals, newDailyTotal]);
	//     } catch (error) {
	//         console.log('Error adding daily total', error);
	//         alert('Error adding daily total');
	//     }
	// };

	// const submitDailyTotals = async (dailyTotals, selectedTeamMember, teamMembers) => {
	//     console.log("🚀 ~ file: submitDailyTotals.js:17 ~ selectedTeamMember:", selectedTeamMember)
	//     const existingTeamMember = teamMembers.find((member) => member._id === selectedTeamMember._id);
	//     if (!existingTeamMember) {
	//         alert('Selected team member does not match an existing team member.');
	//         return;
	//     }
	//     if (selectedTeamMember.position === 'server') {
	//         dailyTotals.barTipOuts = tipOuts.bartender;
	//         dailyTotals.runnerTipOuts = tipOuts.runner;
	//         dailyTotals.hostTipOuts = tipOuts.host;

	//         for (const member of teamMembers) {
	//             console.log("🚀 ~ file: submitDailyTotals.js:28 ~ team:", teamMembers)
	//             console.log("🚀 ~ file: submitDailyTotals.js:28 ~ member:", member)
	//             const workedSameDate = member.dailyTotals.some((total) => total.date === dailyTotals.date);
	//             console.log("🚀 ~ file: submitDailyTotals.js:29 ~ workedSameDate:", workedSameDate)

	//             if (workedSameDate) {
	//                 if (member.position === 'bartender') {
	//                     await useUpdateTeamMemberTipOuts(dailyTotals.date, 'bartender', tipOuts.bartender);
	//                 } else if (member.position === 'host') {
	//                     await useUpdateTeamMemberTipOuts(dailyTotals.date, 'host', tipOuts.host);
	//                 } else if (member.position === 'runner') {
	//                     await useUpdateTeamMemberTipOuts(dailyTotals.date, 'runner', tipOuts.runner);
	//                 }
	//             }
	//         }
	//     } else {
	//         dailyTotals.barTipOuts = 0;
	//         dailyTotals.runnerTipOuts = 0;
	//         dailyTotals.hostTipOuts = 0;
	//     }

	//     const newDailyTotal = prepareDailyTotals(dailyTotals);

	//     try {
	//         await submitDailyTotalToServer(selectedTeamMember._id, newDailyTotal);
	//         setDailyTotals(prevDailyTotals => [...prevDailyTotals, newDailyTotal]);
	//     } catch (error) {
	//         console.log('Error adding daily total', error);
	//         alert('Error adding daily total');        }
	// };

	const useSubmitDailyTotals = () => {
		const updateTeamMemberTipOuts = useUpdateTeamMemberTipOuts();

		const submitDailyTotals = async (dailyTotals, selectedTeamMember, teamMembers) => {
			console.log('🚀 ~ file: submitDailyTotals.js:17 ~ selectedTeamMember:', selectedTeamMember);
			const existingTeamMember = teamMembers.find((member) => member._id === selectedTeamMember._id);
			if (!existingTeamMember) {
				alert('Selected team member does not match an existing team member.');
				return;
			}

			const tipOuts = CalculateTipOuts(dailyTotals, selectedTeamMember, teamMembers);

			if (selectedTeamMember.position === 'server') {
				dailyTotals.barTipOuts = tipOuts.bartender;
				dailyTotals.runnerTipOuts = tipOuts.runner;
				dailyTotals.hostTipOuts = tipOuts.host;

				for (const member of teamMembers) {
					console.log('🚀 ~ file: submitDailyTotals.js:28 ~ team:', teamMembers);
					console.log('🚀 ~ file: submitDailyTotals.js:28 ~ member:', member);
					const workedSameDate = member.dailyTotals.some((total) => total.date === dailyTotals.date);
					console.log('🚀 ~ file: submitDailyTotals.js:29 ~ workedSameDate:', workedSameDate);

					if (workedSameDate) {
						if (member.position === 'bartender') {
							await updateTeamMemberTipOuts(dailyTotals.date, 'bartender', tipOuts.bartender);
						} else if (member.position === 'host') {
							await updateTeamMemberTipOuts(dailyTotals.date, 'host', tipOuts.host);
						} else if (member.position === 'runner') {
							await updateTeamMemberTipOuts(dailyTotals.date, 'runner', tipOuts.runner);
						}
					}
				}
			} else {
				dailyTotals.barTipOuts = 0;
				dailyTotals.runnerTipOuts = 0;
				dailyTotals.hostTipOuts = 0;
			}

			const newDailyTotal = prepareDailyTotals(dailyTotals);

			try {
				await submitDailyTotalToServer(selectedTeamMember._id, newDailyTotal);
				setDailyTotals((prevDailyTotals) => [...prevDailyTotals, newDailyTotal]);
			} catch (error) {
				console.log('Error adding daily total', error);
				alert('Error adding daily total');
			}
		};
	};

	const removeDailyTotal = async (id) => {
		try {
			await deleteDailyTotalFromServer(id);
			setDailyTotals((prevDailyTotals) => prevDailyTotals.filter((total) => total.id !== id));
		} catch (error) {
			console.log('Error deleting daily total', error);
			alert('Error deleting daily total');
		}
	};

	const updateExistingDailyTotal = async (id, updates) => {
		try {
			const updatedDailyTotal = await updateDailyTotal(id, updates);
			setDailyTotals((prevDailyTotals) =>
				prevDailyTotals.map((total) => (total.id === id ? updatedDailyTotal : total))
			);
		} catch (error) {
			console.log('Error updating daily total', error);
			alert('Error updating daily total');
		}
	};

	return (
		<DailyTotalsContext.Provider
			value={{
				dailyTotals,
				// submitDailyTotalToServer: createDailyTotal,
				submitDailyTotalToServer: useSubmitDailyTotals,
				deleteDailyTotalFromServer: removeDailyTotal,
				updateDailyTotal: updateExistingDailyTotal,
			}}
		>
			{children}
		</DailyTotalsContext.Provider>
	);
};
