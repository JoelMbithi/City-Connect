import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFileText, FiClock, FiBell, FiCheckCircle } from 'react-icons/fi';
import { FiEdit, FiFile, FiCalendar, FiMessageCircle } from 'react-icons/fi';
import { useEffect } from 'react';
import { useState } from 'react';
import newRequest from '../../utils/NewRequest';



// Reusable summary card component with animations
const SummaryCard = ({ title, count, icon, color }) => {
  return (
    <div className={`bg-${color}-100 p-4 rounded-md shadow-md flex items-center`}>
      <div className={`text-${color}-600 mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-bold flex items-center justify-center">{count}</p>
      </div>
    </div>
  );
};


// Reusable quick link card with animations
const QuickLink = ({ title, icon, link, color }) => {
  return (
    <Link 
      to={link} 
      className={`flex items-center space-x-2 p-4 rounded-md shadow-sm bg-${color}-100 text-${color}-800 hover:bg-${color}-200 transition`}
    >
      <span>{icon}</span>
      <span className="font-medium">{title}</span>
    </Link>
  );
};

// Improved Activity table with better styling
const ActivityTable = ({ activities }) => (
  <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm mt-4">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {activities.map((activity, index) => (
          <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{activity.date}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{activity.action}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  activity.status === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : activity.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {activity.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <Link to={`/activity/${activity.id}`} className="text-blue-600 hover:text-blue-900">
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Announcement component
const AnnouncementCard = ({ title, message, date, priority = 'normal' }) => {
  const priorityClasses = {
    high: 'border-red-200 bg-red-50',
    normal: 'border-blue-200 bg-blue-50',
    low: 'border-gray-200 bg-gray-50',
  };

  return (
    <div className={`border-l-4 ${priorityClasses[priority]} p-4 mb-3 rounded-r-lg shadow-sm`}>
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <p className="text-sm text-gray-700 mt-1">{message}</p>
    </div>
  );
};

// Main Dashboard component
const UserDashboard = () => {
 const [user,setUser] = useState(0)
 const [request,setRequest] = useState(0)

  const userActivities = [
    { id: 1, date: '2025-06-24', action: 'Garbage Collection', status: 'Completed' },
    { id: 2, date: '2025-06-22', action: 'Business Permit Application', status: 'Pending' },
    { id: 3, date: '2025-06-20', action: 'Building Inspection', status: 'Rejected' },
  ];

  const announcements = [
    {
      title: 'System Maintenance',
      message: 'The system will be down for maintenance on June 30th from 2:00 AM to 4:00 AM.',
      date: '2025-06-25',
      priority: 'high'
    },
    {
      title: 'New Services Available',
      message: 'We have added new online services for business registration.',
      date: '2025-06-24',
      priority: 'normal'
    },
  ];


    const fetchUser = async () => {
    const user_id = localStorage.getItem("user");

    if(!user_id) { return; }

    const user = JSON.parse(user_id);
    try {
      const res = await newRequest.get(`/user/getSingleUser/${user.user_id}`)
     // console.log(res.data.user)
      setUser(res.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  //fetch request
   const fetchRequest = async () => {
    try {
       const res  = await newRequest.get('/request/allRequest')
       console.log(res.data.data)
       setRequest(res.data.data)
    } catch (error) {
      console.log(error)
    }
   }


  useEffect(() => {
    fetchUser(),
    fetchRequest()
  },[])

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Welcome message */}
  
       <div className="mb-8">
           
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
  {user && user.name 
    ? `Welcome back, ${user.name}!`
    : "Welcome to City Connect!"}
</h1>

        <p className="text-gray-600 mt-2">Here's what's happening with your account today.</p>
      </div>
   

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
       <SummaryCard 
  title="Applications" 
  count={3} 
  icon={<FiFileText size={20} />} 
  color="blue" 
/>
{/* request */}
{request && (
  <SummaryCard 
    title="Pending Requests" 
    count={request.length || 4} 
    icon={<FiClock size={20} className="text-orange-500" />} 
    color="orange" 
  />
)}

<SummaryCard 
  title="Notifications" 
  count={2} 
  icon={<FiBell size={20}  className='text-red-600' />} 
  color="purple" 
/>
<SummaryCard 
  title="Completed Tasks" 
  count={5} 
  icon={<FiCheckCircle size={20} />} 
  color="green" 
/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Quick Links */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
           <QuickLink 
  title="Apply for Service" 
  icon={<FiEdit size={18} className='text-black ' />} 
  link="/apply" 
  color="blue" 
/>
<QuickLink 
  title="My Requests" 
  icon={<FiFile size={18} className='text-orange-400'/>} 
  link="/requests" 
  color="green" 
/>
<QuickLink 
  title="Upcoming Events" 
  icon={<FiCalendar size={18} className='text-red-600'/>} 
  link="/events" 
  color="purple" 
/>
<QuickLink 
  title="Support" 
  icon={<FiMessageCircle size={18} className='text-green-400' />} 
  link="/support" 
  color="orange" 
/>

          </div>
        </div>

        {/* Announcements */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Announcements</h2>
          <div className="bg-white rounded-xl shadow-sm p-4">
            {announcements.map((announcement, index) => (
              <AnnouncementCard key={index} {...announcement} />
            ))}
            <div className="text-center mt-3">
              <Link to="/notice" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all announcements
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Table */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <Link to="/activity" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View all activity
          </Link>
        </div>
        <ActivityTable activities={userActivities} />
      </div>
    </div>
  );
};

export default UserDashboard;