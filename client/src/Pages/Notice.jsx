import React, { useState } from 'react';
import NoticeList from './../Components/Notice/NoticeList';
import CategoryFilter from '../Components/Notice/NoticeCategory';

const NoticesPage = () => {
  const [category, setCategory] = useState('all');

  return (
    <div className="flex flex-col px-8 md:px-8 xl:px-16 2xl:px-20 py-8 overflow-x-hidden">
      <h1 className="text-3xl font-bold text-[#007A33] mb-6 "> <span className="inline-block spin-pause">🗞️</span> Public Notices</h1>

      {/* Filter Section */}
      <div className="mb-6">
        <CategoryFilter
          categories={['all', 'health', 'infrastructure', 'events', 'safety', 'other']}
          selectedCategory={category}
          onSelect={setCategory}
        />
      </div>

      {/* Notices Display */}
      <NoticeList category={category === 'all' ? null : category} />
    </div>
  );
};

export default NoticesPage;
