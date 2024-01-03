import { CalculateTipOuts } from '../tipOuts';

export const prepareDailyTotals = (selectedTeamMember, dailyTotals, teamMembers) => {
    const tipOuts = CalculateTipOuts(selectedTeamMember, dailyTotals, teamMembers);
    const totalTipOut = tipOuts.Bartender + tipOuts.Runner + tipOuts.Host;
    const tipsReceived = Number(dailyTotals.nonCashTips) + Number(dailyTotals.cashTips);
    const totalPayrollTips = tipsReceived - totalTipOut;

    return {
        ...dailyTotals,
        barTipOuts: tipOuts.Bartender,
        runnerTipOuts: tipOuts.Runner,
        hostTipOuts: tipOuts.Host,
        totalTipOut,
        tipsReceived,
        totalPayrollTips,
    };
};