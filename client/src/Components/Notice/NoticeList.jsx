import React from 'react';

// Example notices data — replace with real data or props
const dummyNotices = [
  { title: 'Water Interruption in CBD', date: '2025-07-10', category: 'infrastructure', content: 'Scheduled maintenance from 10am to 4pm.' },
  { title: 'Free Vaccination Drive', date: '2025-07-15', category: 'health', content: 'Available at all ward clinics.' },
  { title: 'Public Safety Drill', date: '2025-07-20', category: 'safety', content: 'City-wide emergency preparedness drill.' },
];

const NoticeList = ({ category }) => {
  const filtered = category ? dummyNotices.filter(n => n.category === category) : dummyNotices;

  if (filtered.length === 0) {
    return <p className="text-gray-500">No notices available for this category.</p>;
  }

  return (
    <div className="space-y-6">
      {filtered.map((notice, i) => (
        <div
          key={i}
          className="p-5 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-[#007A33]">{notice.title}</h2>
          <p className="text-sm text-gray-500 mb-2">{notice.date} — {notice.category.toUpperCase()}</p>
          <p className="text-gray-700">{notice.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NoticeList;
