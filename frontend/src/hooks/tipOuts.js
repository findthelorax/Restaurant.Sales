import moment from 'moment';

export let tipOutPercentages = {
    bartender: 0.05,
    runner: 0.04,
    host: 0.015
};

export const updateTipOutPercentages = (newPercentages) => {
    tipOutPercentages = { ...newPercentages };
};

export const CalculateTipOuts = (dailyTotal, selectedTeamMember, teamMembers) => {
    let tipOuts = {
        bartender: 0,
        host: 0,
        runner: 0,
        server: 0
    };

    if (selectedTeamMember.position === 'server') {
        // Calculate server tip outs
        tipOuts.bartender = Number(dailyTotal.barSales) * tipOutPercentages.bartender;
        tipOuts.runner = Number(dailyTotal.foodSales) * tipOutPercentages.runner;
        tipOuts.host = Number(dailyTotal.foodSales) * tipOutPercentages.host;

        // Distribute tip outs to bartenders, runners, and hosts who worked the same day
    for (const member of teamMembers) {
        if (member.dailyTotals) {
            const workedSameDate = member.dailyTotals.some((total) => moment(total.date).isSame(moment(dailyTotal.date), 'day'));
            console.log("🚀 ~ file: tipOuts.js:35 ~ CalculateTipOuts ~ workedSameDate:", workedSameDate)

            if (workedSameDate) {
                if (member.position === 'bartender') {
                    const total = member.dailyTotals.find((total) => total.date === dailyTotal.date);
                    if (total) total.barTipOuts += tipOuts.bartender;
                } else if (member.position === 'runner') {
                    const total = member.dailyTotals.find((total) => total.date === dailyTotal.date);
                    if (total) total.runnerTipOuts += tipOuts.runner;
                } else if (member.position === 'host') {
                    const total = member.dailyTotals.find((total) => total.date === dailyTotal.date);
                    if (total) total.hostTipOuts += tipOuts.host;
                }
            }
        }
    }
    }
    console.log("🚀 ~ file: tipOuts.js:55 ~ CalculateTipOuts ~ tipOuts:", tipOuts)
    return tipOuts;
};