import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FiMapPin, FiClock, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';

const EventCalendar = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Normalize dates by stripping time components
  const normalizeDate = (dateString) => {
    const date = new Date(dateString);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  // Get events for selected date
  const getEventsForDate = (date) => {
    const normalizedDate = normalizeDate(date);
    return events.filter(event => {
      const eventDate = normalizeDate(event.date);
      return eventDate.getTime() === normalizedDate.getTime();
    });
  };

  const todayEvents = getEventsForDate(selectedDate);

  // Calendar tile content for event indicators
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const eventsOnDate = getEventsForDate(date);
      return eventsOnDate.length > 0 ? (
        <div className="absolute bottom-1 w-1 h-1 bg-green-500 rounded-full"></div>
      ) : null;
    }
  };

  // Format time display
  const formatTimeDisplay = (dateString) => {
    if (!dateString.includes('T')) return 'All Day';
    
    try {
      const timePart = dateString.split('T')[1];
      return timePart.substring(0, 5); // Returns HH:MM
    } catch {
      return 'All Day';
    }
  };

  // Format date for display
  const formatDisplayDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md p-4 md:p-6"
          >
            <h2 className="text-2xl font-bold text-[#007A33] mb-4">Event Calendar</h2>

            <div className="react-calendar-custom">
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                tileContent={tileContent}
                className="border-none w-full"
                view="month"
                next2Label={null}
                prev2Label={null}
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <FiCalendar className="mr-2 text-[#007A33]" />
                {formatDisplayDate(selectedDate)}
              </h3>

              {todayEvents.length > 0 ? (
                <div className="space-y-3">
                  {todayEvents.map((event, index) => (
                    <motion.div
                      key={`${event.event_id}-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#007A33]"
                    >
                      <h4 className="font-bold text-gray-800">{event.title}</h4>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <FiClock className="mr-1 text-green-600" />
                        {formatTimeDisplay(event.date)}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <FiMapPin className="mr-1 text-red-600" />
                        {event.location || 'Nairobi'}
                      </div>
                      {event.description && (
                        <p className="mt-2 text-sm text-gray-700">{event.description}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                  No events scheduled for this day
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;