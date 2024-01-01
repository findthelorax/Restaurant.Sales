import moment from 'moment';

export let tipOutPercentages = {
    bartender: 0.05,
    runner: 0.04,
    host: 0.015
};

export const updateTipOutPercentages = (newPercentages) => {
    tipOutPercentages = { ...newPercentages };
};

export const CalculateTipOuts = (selectedTeamMember, dailyTotals, teamMembers) => {
    console.log("🚀 ~ file: tipOuts.js:14 ~ CalculateTipOuts ~ dailyTotals:", dailyTotals)

    let bartenderTipOut = 0;
    let runnerTipOut = 0;
    let hostTipOut = 0;

    if (selectedTeamMember.position === 'server') {
        // Calculate server tip outs
        bartenderTipOut = Number(dailyTotals.barSales) * tipOutPercentages.bartender;
        runnerTipOut = Number(dailyTotals.foodSales) * tipOutPercentages.runner;
        hostTipOut = Number(dailyTotals.foodSales) * tipOutPercentages.host;

        // Distribute tip outs to bartenders, runners, and hosts who worked the same day
        for (const member of teamMembers) {
            console.log("🚀 ~ file: tipOuts.js:33 ~ CalculateTipOuts ~ teamMembers:", teamMembers)
            console.log("🚀 ~ file: tipOuts.js:33 ~ CalculateTipOuts ~ member:", member)
            if (member.dailyTotals) {
                const total = member.dailyTotals.find((total) => moment(total.date).isSame(moment(dailyTotals.date), 'day'));
                console.log("🚀 ~ file: tipOuts.js:35 ~ CalculateTipOuts ~ total:", total)

                if (total) {
                    if (member.position === 'bartender') {
                        total.barTipOuts += bartenderTipOut;
                    } else if (member.position === 'runner') {
                        total.runnerTipOuts += runnerTipOut;
                    } else if (member.position === 'host') {
                        total.hostTipOuts += hostTipOut;
                    }
                }
            }
        }
    }

    return {
        bartender: bartenderTipOut,
        runner: runnerTipOut,
        host: hostTipOut,
    };
};