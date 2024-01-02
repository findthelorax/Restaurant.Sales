import React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { deleteWorkDate } from '../../api/teamMembers'; // replace with the actual path to your API functions

const MyCalendar = ({ events, setEvents }) => {
    const handleDelete = async (event) => {
        const { id, start } = event.target.closest('.e-appointment').dataset;

        try {
            await deleteWorkDate(id, start);
            setEvents(prevEvents => prevEvents.filter(event => event.id !== id || event.start !== start));
        } catch (error) {
            console.error(`Error deleting work date: ${error.message}`, error);
        }
    };

    return (
        <div>
            <ScheduleComponent
                currentView='Month'
                eventSettings={{ dataSource: events }}
                eventRendered={(args) => {
                    const { id, start } = args.data;
                    args.element.setAttribute('data-id', id);
                    args.element.setAttribute('data-start', start.toISOString());
                    args.element.innerHTML = `
                        <div>
                            ${args.data.Subject}
                            <button onClick="${handleDelete}">Delete</button>
                        </div>
                    `;
                }}
            >
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
        </div>
    );
};

export default MyCalendar;