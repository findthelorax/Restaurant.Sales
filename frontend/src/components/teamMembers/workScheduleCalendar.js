import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { deleteWorkDate } from '../../api/teamMembers'; // replace with the actual path to your API functions

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events, setEvents }) => {
    const handleDelete = async (event) => {
        // prevent the calendar event from being selected when the delete button is clicked
        event.stopPropagation();

        const { id, start } = event.target.closest('.rbc-event').dataset;

        try {
            await deleteWorkDate(id, start);
            setEvents(prevEvents => prevEvents.filter(event => event.id !== id || event.start !== start));
        } catch (error) {
            console.error(`Error deleting work date: ${error.message}`, error);
        }
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={(event) => ({
                    className: 'rbc-event',
                    'data-id': event.id,
                    'data-start': event.start.toISOString(),
                })}
                components={{
                    event: ({ event }) => (
                        <div>
                            {event.title}
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    ),
                }}
            />
        </div>
    );
};

export default MyCalendar;