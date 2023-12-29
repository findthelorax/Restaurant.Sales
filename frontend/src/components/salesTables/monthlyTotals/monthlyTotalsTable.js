import React, { useContext, useMemo } from 'react';
import moment from 'moment';
import { TeamMembersContext } from '../../../contexts/TeamMembersContext';
import MonthlyTotalsTableRender from '../monthlyTotals/monthlyTotalsTableRender';
import { titleToPropName, titles, formatUSD } from '../../../hooks/salesTotalsLogic';

function MonthlyTotalsTable({ selectedDate }) {
    const { teamMembers } = useContext(TeamMembersContext);
    const year = moment(selectedDate).year();

    const monthsOfYear = Array.from({ length: 12 }, (_, i) => i + 1);

    const monthlyTotals = useMemo(() => {
        const totals = Array(12).fill(0).map(() => {
            const monthTotal = {};
            Object.values(titleToPropName).forEach((propName) => {
                monthTotal[propName] = 0;
            });
            return monthTotal;
        });

        teamMembers.forEach((member) => {
            member.dailyTotals.forEach((total) => {
                const totalDate = moment(total.date);
                if (totalDate.year() === year) {
                    const monthOfYear = totalDate.month();
                    Object.keys(titleToPropName).forEach((key) => {
                        totals[monthOfYear][titleToPropName[key]] += total[titleToPropName[key]] || 0;
                    });
                }
            });
        });

        return totals;
    }, [teamMembers, year]);

    const columns = [
        { field: 'salesTips', headerName: 'Sales / Tips', width: 130 },
        ...monthsOfYear.map((month) => {
            const monthName = moment().month(month - 1).format('MMMM');
            return { field: `month${month}`, headerName: `${monthName}`, width: 110 };
        }),
        { field: 'total', headerName: 'Total', width: 100 },
    ];

    const rows = titles.map((title, i) => {
        const row = { id: i, salesTips: title };
        monthlyTotals.forEach((total, index) => {
            row[`month${index + 1}`] = formatUSD(total[titleToPropName[title]]);
        });
        row.total = formatUSD(monthlyTotals.reduce((sum, total) => sum + total[titleToPropName[title]], 0));
        return row;
    });

    return <MonthlyTotalsTableRender rows={rows} columns={columns} />;
}

export { MonthlyTotalsTable };