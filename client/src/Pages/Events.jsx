import React, { useState, useEffect } from 'react';
import EventCalendar from './../Components/Events/EventCalender.jsx';
import EventList from './../Components/Events/EventList.jsx';
import newRequest from '../utils/NewRequest.js';

const EventsPage = () => {
  const [view, setView] = useState('calendar');
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '', // Added time field
    location: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const res = await newRequest.get('/events/allEvents');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const normalized = res.data.map(event => ({
          ...event,
          // Ensure date is in correct format
          date: event.date.includes('T') ? event.date : `${event.date}T00:00:00`
        })).filter(event => new Date(event.date) >= today);
        
        setEvents(normalized);
      } catch (err) {
        setError('Failed to load events');
        console.error("Error fetching events:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date) return;

    setIsLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.user_id) {
        throw new Error('User not authenticated');
      }

      // Combine date and time if time is provided
      const eventDateTime = form.time 
        ? `${form.date}T${form.time}:00` 
        : form.date;

      const response = await newRequest.post('/events/event/create', {
        title: form.title,
        date: eventDateTime,
        location: form.location,
        description: form.description,
        user_id: user.user_id
      });

      setEvents(prev => [...prev, {
        ...response.data,
        date: eventDateTime
      }]);
      
      setForm({ 
        title: '', 
        date: '', 
        time: '', 
        location: '', 
        description: '' 
      });
    } catch (err) {
      setError('Failed to add event');
      console.error('Error adding event:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#007A33]">Community Events</h1>

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

        <form onSubmit={handleAddEvent} className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Event Title"
          className="w-70 md:w-40 lg:w-80 ring-2 ring-slate-300 text-slate-400 p-2 rounded-md"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="date"
          className="w-70 md:w-40 lg:w-80 ring-2 ring-slate-300 text-slate-400 p-2 rounded-md"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location (optional)"
          className="w-70 md:w-40 lg:w-80 ring-2 ring-slate-300 text-slate-400 p-2 rounded-md"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <button
          type="submit"
          className="w-70 md:w-40 bg-[#007A33] text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Add Event
        </button>
      </form>


      {view === 'calendar' ? (
        <EventCalendar events={events} />
      ) : (
        <EventList events={events} />
      )}
    </div>
  );
};

export default EventsPage;