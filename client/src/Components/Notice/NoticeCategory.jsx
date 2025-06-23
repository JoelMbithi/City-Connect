import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition 
            ${selectedCategory === cat
              ? 'bg-[#007A33] text-white border-[#007A33]'
              : 'bg-white text-[#007A33] border-[#007A33] hover:bg-[#007A33] hover:text-white'
            }`}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
