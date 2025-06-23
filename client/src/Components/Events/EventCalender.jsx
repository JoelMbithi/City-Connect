// EventCalendar.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EventCalendar = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatted = selectedDate.toISOString().split('T')[0];
  const todayEvents = events.filter(e => e.date === formatted);

  return (
    <div>
      <Calendar value={selectedDate} onChange={setSelectedDate} />
      <div className="mt-4">
        {todayEvents.length > 0 ? (
          todayEvents.map((e, i) => (
            <p key={i} className="text-green-600 font-semibold">{e.title} - {e.location}</p>
          ))
        ) : (
          <p className="text-gray-500">No events on this day.</p>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
