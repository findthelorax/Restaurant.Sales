import { useState, useCallback } from 'react';
import { getAllDailyTotals } from '../../api/salesTotals';

export const useGetAllDailyTotals = () => {
    const [ allDailyTotals, setAllDailyTotals] = useState([]);

    const fetchAllDailyTotals = useCallback(async () => {
        try {
            const allDailyTotals = await getAllDailyTotals();
            setAllDailyTotals(allDailyTotals);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }, []);

    return { allDailyTotals, fetchAllDailyTotals };
};