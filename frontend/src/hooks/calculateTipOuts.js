export const calculateTipOuts = async (selectedTeamMember, date, foodSales, barSales, nonCashTips, cashTips, teamMembers) => {
    // Find all team members working on the same day
    const workingTeamMembers = await teamMembers.find({
        teams: selectedTeamMember.teams[0],
        workSchedule: date
    });

    // Count the number of each position
    const positionsCount = workingTeamMembers.reduce((counts, member) => {
        counts[member.position] = (counts[member.position] || 0) + 1;
        return counts;
    }, {});

    // Calculate the tipOuts for each position
    const totalTips = nonCashTips + cashTips;
    const tipOuts = {
        bartender: barSales * 0.05 / positionsCount.bartender,
        runner: foodSales * 0.04 / positionsCount.runner,
        host: foodSales * 0.015 / positionsCount.host,
    };

    // Update the daily totals for each team member
    for (let member of workingTeamMembers) {
        const dailyTotal = member.dailyTotals.find(total => total.date === date);
        if (dailyTotal) {
            if (member.position === 'server') {
                dailyTotal.barTipOuts = tipOuts.bartender;
                dailyTotal.runnerTipOuts = tipOuts.runner;
                dailyTotal.hostTipOuts = tipOuts.host;
                dailyTotal.totalTipOut = dailyTotal.barTipOuts + dailyTotal.runnerTipOuts + dailyTotal.hostTipOuts;
                dailyTotal.tipsReceived = totalTips - dailyTotal.totalTipOut;
                dailyTotal.totalPayrollTips = dailyTotal.tipsReceived + dailyTotal.totalTipOut;
            } else if (member.position === 'bartender') {
                dailyTotal.tipsReceived = tipOuts.bartender;
                dailyTotal.totalPayrollTips = dailyTotal.tipsReceived;
            } else if (member.position === 'runner') {
                dailyTotal.tipsReceived = tipOuts.runner;
                dailyTotal.totalPayrollTips = dailyTotal.tipsReceived;
            } else if (member.position === 'host') {
                dailyTotal.tipsReceived = tipOuts.host;
                dailyTotal.totalPayrollTips = dailyTotal.tipsReceived;
            }
            await member.save();
        }
    }
}