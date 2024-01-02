import { CalculateTipOuts } from '../tipOuts';

export const prepareDailyTotals = (selectedTeamMember, dailyTotals, teamMembers) => {
    const tipOuts = CalculateTipOuts(selectedTeamMember, dailyTotals, teamMembers);
    console.log("🚀 ~ file: prepareDailyTotals.js:5 ~ prepareDailyTotals ~ tipOuts:", tipOuts)

    const totalTipOut = tipOuts.Bartender + tipOuts.Runner + tipOuts.Host;
    console.log("🚀 ~ file: prepareDailyTotals.js:7 ~ prepareDailyTotals ~ totalTipOut:", totalTipOut)

    const tipsReceived = Number(dailyTotals.nonCashTips) + Number(dailyTotals.cashTips);
    console.log("🚀 ~ file: prepareDailyTotals.js:10 ~ prepareDailyTotals ~ tipsReceived:", tipsReceived)

    const totalPayrollTips = tipsReceived - totalTipOut;
    console.log("🚀 ~ file: prepareDailyTotals.js:13 ~ prepareDailyTotals ~ totalPayrollTips:", totalPayrollTips)

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