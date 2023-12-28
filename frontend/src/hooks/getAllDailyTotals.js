import { useState, useCallback, useContext } from 'react';
import { ErrorContext } from '../contexts/ErrorContext';
import { getAllDailyTotals } from '../api/salesTotals';

export const useGetAllDailyTotals = () => {
    const [ allDailyTotals, setAllDailyTotals] = useState([]);
    const { showError } = useContext(ErrorContext);

    const fetchAllDailyTotals = useCallback(async () => {
        try {
            const data = await getAllDailyTotals();
            setAllDailyTotals(data);
        } catch (error) {
            console.error(error);
            showError(error.message);
        }
    }, [showError]);

    return { allDailyTotals, fetchAllDailyTotals };
};