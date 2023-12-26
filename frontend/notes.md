// contexts.js
import { createContext } from 'react';

export const TeamMembersContext = createContext();
export const DailyTotalsContext = createContext();
export const WeeklyTotalsContext = createContext();


// providers.js
import React, { useState, useMemo } from 'react';
import { TeamMembersContext, DailyTotalsContext, WeeklyTotalsContext } from './contexts';

export function TeamMembersProvider({ children }) {
    const [teamMembers, setTeamMembers] = useState([]);

    const value = useMemo(() => ({ teamMembers, setTeamMembers }), [teamMembers]);

    return (
        <TeamMembersContext.Provider value={value}>
            {children}
        </TeamMembersContext.Provider>
    );
}

export function DailyTotalsProvider({ children }) {
    const [dailyTotals, setDailyTotals] = useState([]);

    const value = useMemo(() => ({ dailyTotals, setDailyTotals }), [dailyTotals]);

    return (
        <DailyTotalsContext.Provider value={value}>
            {children}
        </DailyTotalsContext.Provider>
    );
}

export function WeeklyTotalsProvider({ children }) {
    const [weeklyTotals, setWeeklyTotals] = useState([]);

    const value = useMemo(() => ({ weeklyTotals, setWeeklyTotals }), [weeklyTotals]);

    return (
        <WeeklyTotalsContext.Provider value={value}>
            {children}
        </WeeklyTotalsContext.Provider>
    );
}


// hooks.js
import { useContext } from 'react';
import { TeamMembersContext, DailyTotalsContext, WeeklyTotalsContext } from './contexts';

export function useTeamMembers() {
    const { teamMembers } = useContext(TeamMembersContext);
    return teamMembers;
}

export function useDailyTotals() {
    const { dailyTotals } = useContext(DailyTotalsContext);
    return dailyTotals;
}

export function useWeeklyTotals() {
    const { weeklyTotals } = useContext(WeeklyTotalsContext);
    return weeklyTotals;
}


// TeamMembersTable.js
import { useTeamMembers } from './hooks';

function TeamMembersTable() {
    const teamMembers = useTeamMembers();

    // Render your table using the teamMembers data
}



I was looking at teamMembers and forEach in my daily and weekly totals table. how can I get the teamMembers but only change the table when a daily or weekly total is changed

GitHub Copilot
To achieve this, you can use the useEffect hook to listen for changes in the daily or weekly totals and update the table accordingly. Here's how you might do this:

First, create a custom hook to get the daily or weekly totals for the selected week:

// useTotalsForWeek.js
import { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { TeamMembersContext, DailyTotalsContext, WeeklyTotalsContext } from './contexts';

export function useTotalsForWeek(selectedDate, titleToPropName, isWeekly) {
    const { teamMembers } = useContext(TeamMembersContext);
    const { dailyTotals } = useContext(DailyTotalsContext);
    const { weeklyTotals } = useContext(WeeklyTotalsContext);

    const [totalsForWeek, setTotalsForWeek] = useState([]);

    useEffect(() => {
        const newTotalsForWeek = [];

        teamMembers.forEach((member) => {
            const totals = isWeekly ? member.weeklyTotals : member.dailyTotals;

            totals.forEach((total) => {
                const totalDate = moment(total.date);
                const selectedWeekStart = moment(selectedDate).startOf('week');
                const selectedWeekEnd = moment(selectedWeekStart).endOf('week');

                if (totalDate.isSameOrAfter(selectedWeekStart) && totalDate.isSameOrBefore(selectedWeekEnd)) {
                    const dayOfWeek = totalDate.day();
                    Object.keys(titleToPropName).forEach((key) => {
                        newTotalsForWeek[dayOfWeek][titleToPropName[key]] += total[titleToPropName[key]] || 0;
                    });
                }
            });
        });

        setTotalsForWeek(newTotalsForWeek);
    }, [teamMembers, dailyTotals, weeklyTotals, selectedDate, titleToPropName, isWeekly]);

    return totalsForWeek;
}


In this hook, useEffect is used to calculate the totals for the selected week whenever teamMembers, dailyTotals, weeklyTotals, selectedDate, titleToPropName, or isWeekly changes.

Then, you can use this hook in your WeeklyTotalsTable and DailyTotalsTable components like this:

// WeeklyTotalsTable.js
import { useTotalsForWeek } from './hooks';

function WeeklyTotalsTable({ selectedDate, titleToPropName }) {
    const weeklyTotalsForWeek = useTotalsForWeek(selectedDate, titleToPropName, true);

    // Render your table using the weeklyTotalsForWeek data
}

// DailyTotalsTable.js
import { useTotalsForWeek } from './hooks';

function DailyTotalsTable({ selectedDate, titleToPropName }) {
    const dailyTotalsForWeek = useTotalsForWeek(selectedDate, titleToPropName, false);

    // Render your table using the dailyTotalsForWeek data
}

In these examples, the WeeklyTotalsTable and DailyTotalsTable components use the useTotalsForWeek hook to get the weeklyTotalsForWeek and dailyTotalsForWeek data. They don't consume the TeamMembersContext, DailyTotalsContext, or WeeklyTotalsContext directly, so they won't re-render when other parts of the context change. The useTotalsForWeek hook includes the logic to fetch new data when necessary, so the WeeklyTotalsTable and DailyTotalsTable components don't need to worry about that.


The approach described in the notes is already quite efficient as it uses React's context and hooks to manage state and side effects. However, there are always different ways to solve a problem in programming. Here's an alternative approach using Redux:

Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

First, you would define actions for updating the daily totals, weekly totals, and team members:

// actions.js
export const UPDATE_DAILY_TOTALS = 'UPDATE_DAILY_TOTALS';
export const UPDATE_WEEKLY_TOTALS = 'UPDATE_WEEKLY_TOTALS';
export const UPDATE_TEAM_MEMBERS = 'UPDATE_TEAM_MEMBERS';

export const updateDailyTotals = (dailyTotals) => ({
    type: UPDATE_DAILY_TOTALS,
    payload: dailyTotals,
});

export const updateWeeklyTotals = (weeklyTotals) => ({
    type: UPDATE_WEEKLY_TOTALS,
    payload: weeklyTotals,
});

export const updateTeamMembers = (teamMembers) => ({
    type: UPDATE_TEAM_MEMBERS,
    payload: teamMembers,
});

Then, you would define a reducer to handle these actions:

// reducer.js
import { UPDATE_DAILY_TOTALS, UPDATE_WEEKLY_TOTALS, UPDATE_TEAM_MEMBERS } from './actions';

const initialState = {
    dailyTotals: [],
    weeklyTotals: [],
    teamMembers: [],
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DAILY_TOTALS:
            return { ...state, dailyTotals: action.payload };
        case UPDATE_WEEKLY_TOTALS:
            return { ...state, weeklyTotals: action.payload };
        case UPDATE_TEAM_MEMBERS:
            return { ...state, teamMembers: action.payload };
        default:
            return state;
    }
};

Finally, in your components, you would use the useSelector hook to access the state and the useDispatch hook to dispatch actions:

// WeeklyTotalsTable.js
import { useSelector } from 'react-redux';

function WeeklyTotalsTable() {
    const weeklyTotals = useSelector((state) => state.weeklyTotals);

    // Render your table using the weeklyTotals data
}

// DailyTotalsTable.js
import { useSelector } from 'react-redux';

function DailyTotalsTable() {
    const dailyTotals = useSelector((state) => state.dailyTotals);

    // Render your table using the dailyTotals data
}

This approach has the advantage of centralizing your state management, which can make your code easier to understand and debug. However, it also adds complexity and may be overkill for a small app. The best approach depends on the specific needs of your project.