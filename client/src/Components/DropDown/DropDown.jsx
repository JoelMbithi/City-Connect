import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DropdownLink = ({ label, links = [],className = '' }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.includes(path)
      ? 'text-[#FFD100] border-b-2 border-[#FFD100]'
      : 'text-white hover:text-[#FFD100]';

  // Handle mouse enter and leave with delay to avoid flickering
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150); // Short delay allows moving into dropdown without it closing
  };

  // Optional outside click to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
     className={`relative ${className}`}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(links[0]?.to)}`}
      >
        {label}
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownLink;
