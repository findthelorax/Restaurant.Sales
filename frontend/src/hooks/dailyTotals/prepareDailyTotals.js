import { CalculateTipOuts } from '../tipOuts';

export const prepareDailyTotals = (dailyTotals, selectedTeamMember, teamMembers) => {
    const tipOuts = CalculateTipOuts(dailyTotals, selectedTeamMember, teamMembers);

    const totalTipOut = tipOuts.bartender + tipOuts.runner + tipOuts.host;

    const tipsReceived = Number(dailyTotals.nonCashTips) + Number(dailyTotals.cashTips);

    const totalPayrollTips = tipsReceived - totalTipOut;

    return {
        ...dailyTotals,
        totalTipOut,
        tipsReceived,
        totalPayrollTips,
        tipOuts,
    };
};