import { calculateTipOuts } from '../calculateTipOuts';

export const prepareDailyTotals = async (selectedTeamMember, dailyTotals, date, foodSales, barSales, teamMembers) => {
    const tipOuts = await calculateTipOuts(selectedTeamMember, date, foodSales, barSales, dailyTotals.nonCashTips, dailyTotals.cashTips);
    const totalTipOut = tipOuts.bartender + tipOuts.runner + tipOuts.host;
    const tipsReceived = Number(dailyTotals.nonCashTips) + Number(dailyTotals.cashTips);
    const totalPayrollTips = tipsReceived - totalTipOut;

    return {
        ...dailyTotals,
        barTipOuts: tipOuts.bartender,
        runnerTipOuts: tipOuts.runner,
        hostTipOuts: tipOuts.host,
        totalTipOut,
        tipsReceived,
        totalPayrollTips,
    };
};