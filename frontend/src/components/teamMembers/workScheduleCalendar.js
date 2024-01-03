import React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { deleteWorkDate } from '../../api/teamMembers'; // replace with the actual path to your API functions
import '@syncfusion/ej2-base/styles/material.css';

const MyCalendar = ({ events, setEvents }) => {
    const handleDelete = async (args) => {
        if (args.requestType === 'eventRemove') {
            const { id, StartTime } = args.data[0];

            try {
                await deleteWorkDate(id, StartTime);
                setEvents(prevEvents => prevEvents.filter(event => event.id !== id || event.StartTime !== StartTime));
            } catch (error) {
                console.error(`Error deleting work date: ${error.message}`, error);
            }
        }
    };

    return (
        <div>
            <ScheduleComponent
                currentView='Month'
                eventSettings={{ dataSource: events }}
                actionComplete={handleDelete}
            >
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
        </div>
    );
};

export default MyCalendar;