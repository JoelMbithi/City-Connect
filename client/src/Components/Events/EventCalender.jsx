import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FiMapPin, FiClock, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';

const EventCalendar = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatted = selectedDate.toISOString().split('T')[0];
  const todayEvents = events.filter(e => e.date === formatted);

  // Custom tile content for calendar
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const hasEvent = events.some(e => e.date === dateStr);
      return hasEvent ? <div className="absolute bottom-1 w-1 h-1 bg-green-500 rounded-full"></div> : null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Calendar Section */}
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

            {/* Events for selected date */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <FiCalendar className="mr-2 text-[#007A33]" />
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>

              {todayEvents.length > 0 ? (
                <div className="space-y-3">
                  {todayEvents.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#007A33]"
                    >
                      <h4 className="font-bold text-gray-800">{event.title}</h4>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <FiClock className="mr-1" />
                        {event.time}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <FiMapPin className="mr-1" />
                        {event.location}
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

        {/* Inspiration Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="lg:w-80 flex flex-col"
        >
          <div className="bg-gradient-to-br from-[#007A33] to-green-700 rounded-xl shadow-md p-6 text-white flex-1">
            <h3 className="text-xl font-bold mb-4">Community Events</h3>
            <p className="mb-6">
              Join us in making Nairobi a better place through community engagement and teamwork.
            </p>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-2xl text-green-700 font-bold mb-2">
                Let's make <span className="text-yellow-300">Nairobi</span> Work
              </p>
             {/*  <p className="text-lg font-semibold text-white">#TEAMWORK</p> */}
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Upcoming Highlights</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-yellow-300 rounded-full mt-1.5 mr-2"></span>
                  Monthly Clean-up Day
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-yellow-300 rounded-full mt-1.5 mr-2"></span>
                  Youth Empowerment Forum
                </li>
                {/*  n*/}
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-yellow-300 rounded-full mt-1.5 mr-2"></span>
                  Business Networking Mixer
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 rounded-xl shadow-md p-4 border-l-4 border-yellow-400">
            <h4 className="font-bold text-gray-800 mb-2">Get Involved</h4>
            <p className="text-sm text-gray-600 mb-3">
              Want to host or suggest an event? Contact our events team.
            </p>
            <button className="w-full bg-[#007A33] text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              Suggest an Event
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Add some CSS to customize the calendar
const styles = `
  .react-calendar-custom .react-calendar {
    width: 100%;
    border: none;
    font-family: inherit;
  }
  .react-calendar-custom .react-calendar__tile--now {
    background: #f0fdf4;
  }
  .react-calendar-custom .react-calendar__tile--active {
    background: #007A33;
    color: white;
  }
  .react-calendar-custom .react-calendar__tile--active:enabled:hover,
  .react-calendar-custom .react-calendar__tile--active:enabled:focus {
    background: #00662a;
  }
  .react-calendar-custom .react-calendar__navigation button:enabled:hover,
  .react-calendar-custom .react-calendar__navigation button:enabled:focus {
    background: #f0fdf4;
  }
  .react-calendar-custom .react-calendar__tile {
    position: relative;
    padding: 0.75em 0.5em;
  }
`;

// Add the custom styles to the head
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default EventCalendar;