// EventList.jsx
import React from 'react';

const EventList = ({ events }) => {
  return (
    <div>
      {events.length === 0 ? (
        <p className="text-gray-500">No events available.</p>
      ) : (
        events.map((e, i) => (
          <div key={i} className="mb-4 border-b pb-2">
            <h3 className="text-lg font-bold text-[#007A33]">{e.title}</h3>
            <p className="text-sm text-gray-600">{e.date} — {e.location}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;
