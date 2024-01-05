import { CalculateTipOuts } from '../tipOuts';

export const prepareDailyTotals = (selectedTeamMember, dailyTotals, teamMembers, action) => {
    const tipOuts = CalculateTipOuts(selectedTeamMember, dailyTotals, teamMembers);
    const totalTipOut = tipOuts.Bartender + tipOuts.Runner + tipOuts.Host;
    const tipsReceived = Number(dailyTotals.nonCashTips) + Number(dailyTotals.cashTips);
    const totalPayrollTips = tipsReceived - totalTipOut;

    // If a daily total is being submitted, add the new daily total
    if (action === 'submit') {
        return {
            ...dailyTotals,
            barTipOuts: tipOuts.Bartender,
            runnerTipOuts: tipOuts.Runner,
            hostTipOuts: tipOuts.Host,
            totalTipOut,
            tipsReceived,
            totalPayrollTips,
        };
    }

    // If a daily total is being deleted, remove the daily total
    if (action === 'delete') {
        const updatedDailyTotals = { ...dailyTotals };
        delete updatedDailyTotals[selectedTeamMember._id];
        return updatedDailyTotals;
    }

    return dailyTotals;
};