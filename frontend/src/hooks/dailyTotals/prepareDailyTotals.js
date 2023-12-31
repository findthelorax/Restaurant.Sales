import { CalculateTipOuts } from '../tipOuts';

export const prepareDailyTotals = (selectedTeamMember, dailyTotals, teamMembers) => {
    const tipOuts = CalculateTipOuts(selectedTeamMember, dailyTotals, teamMembers);

    const totalTipOut = tipOuts.bartender + tipOuts.runner + tipOuts.host;
    console.log("🚀 ~ file: prepareDailyTotals.js:7 ~ prepareDailyTotals ~ totalTipOut:", totalTipOut)

    const tipsReceived = Number(dailyTotals.nonCashTips) + Number(dailyTotals.cashTips);
    console.log("🚀 ~ file: prepareDailyTotals.js:10 ~ prepareDailyTotals ~ tipsReceived:", tipsReceived)

    const totalPayrollTips = tipsReceived - totalTipOut;
    console.log("🚀 ~ file: prepareDailyTotals.js:13 ~ prepareDailyTotals ~ totalPayrollTips:", totalPayrollTips)

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