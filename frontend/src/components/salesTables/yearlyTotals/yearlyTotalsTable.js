import React, { useContext, useMemo } from 'react';
import moment from 'moment';
import { TeamMembersContext } from '../../../contexts/TeamMembersContext';
import YearlyTotalsTableRender from '../yearlyTotals/yearlyTotalsTableRender';
import { titleToPropName, titles, formatUSD } from '../../../hooks/salesTotalsLogic';

function YearlyTotalsTable({ selectedDate }) {
    const { teamMembers } = useContext(TeamMembersContext);
    const currentYear = moment(selectedDate).year();

    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    const yearlyTotals = useMemo(() => {
        const totals = Array(10).fill(0).map(() => {
            const yearTotal = {};
            Object.values(titleToPropName).forEach((propName) => {
                yearTotal[propName] = 0;
            });
            return yearTotal;
        });

        teamMembers.forEach((member) => {
            member.dailyTotals.forEach((total) => {
                const totalYear = moment(total.date).year();
                const yearIndex = years.indexOf(totalYear);
                if (yearIndex !== -1) {
                    Object.keys(titleToPropName).forEach((key) => {
                        totals[yearIndex][titleToPropName[key]] += total[titleToPropName[key]] || 0;
                    });
                }
            });
        });

        return totals;
    }, [teamMembers, years]);

    const projectedSales = useMemo(() => {
        const totalSales = yearlyTotals.reduce((sum, total) => {
            return sum + (isNaN(total.sales) ? 0 : total.sales);
        }, 0);
        return totalSales / years.length;
    }, [yearlyTotals, years.length]);

    const columns = [
        { field: 'salesTips', headerName: 'Sales / Tips', width: 130 },
        ...years.map((year) => {
            return { field: `year${year}`, headerName: `${year}`, width: 110 };
        }),
        { field: 'total', headerName: 'Total', width: 100 },
        { field: 'projected', headerName: 'Projected Sales', width: 150 },
    ];

    const rows = titles.map((title, i) => {
        const row = { id: i, salesTips: title };
        yearlyTotals.forEach((total, index) => {
            row[`year${years[index]}`] = formatUSD(total[titleToPropName[title]]);
        });
        row.total = formatUSD(yearlyTotals.reduce((sum, total) => sum + total[titleToPropName[title]], 0));
        row.projected = formatUSD(projectedSales);
        return row;
    });

    return <YearlyTotalsTableRender rows={rows} columns={columns} />;
}

export { YearlyTotalsTable };