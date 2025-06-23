import React, { useState } from 'react';
import EventCalendar from './../Components/Events/EventCalender.jsx';
import EventList from './../Components/Events/EventList.jsx';

const EventsPage = () => {
  const [view, setView] = useState('calendar');

  const [events, setEvents] = useState([
    { title: 'Health Drive', date: '2025-07-10', location: 'City Hall' },
    { title: 'Youth Workshop', date: '2025-07-15', location: 'KICC' },
  ]);

  const [newEvent, setNewEvent] = useState({ title: '', date: '', location: '' });

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;

    setEvents([...events, newEvent]);
    setNewEvent({ title: '', date: '', location: '' });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#007A33]">Community Events</h1>

      {/* View Switch */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setView('calendar')}
          className={`px-4 py-2 rounded ${view === 'calendar' ? 'bg-[#007A33] text-white' : 'bg-gray-200'}`}
        >
          Calendar View
        </button>
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 rounded ${view === 'list' ? 'bg-[#007A33] text-white' : 'bg-gray-200'}`}
        >
          List View
        </button>
      </div>
 
      {/* Add Event Form */}
      <form onSubmit={handleAddEvent} className="flex flex-col md:flex mb-6 space-y-2  gap-4">
        <input
          type="text"
          placeholder="Event Title"
          className="w-70 md:w-80 ring-2 ring-gray-400 p-2 rounded-md"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <input
          type="date"
          className="w-70 md:w-80 ring-2 ring-gray-400 p-2 rounded-md"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location (optional)"
          className="w-70 md:w-80 ring-2 ring-gray-400 p-2 rounded-md"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        />
        <button
          type="submit"
          className="bg-[#007A33] text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Add Event
        </button>
      </form>

      {/* Render Views */}
      {view === 'calendar' ? (
        <EventCalendar events={events} />
      ) : (
        <EventList events={events} />
      )}
    </div>
  );
};

export default EventsPage;
