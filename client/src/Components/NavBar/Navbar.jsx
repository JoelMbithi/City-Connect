import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginPopup from '../PopUp/LoginPopup';
import DropdownLink from '../DropDown/DropDown';

const AdminNavbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [popUp,setPopUp] = useState(false)
 

   

  const isActive = (path) =>
    location.pathname.includes(path)
      ? 'text-[#FFD100] border-b-2 border-[#FFD100]'
      : 'text-white hover:text-[#FFD100]';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
//popup button to login

  const handleShow = () => setPopUp(true)
  
//close popup

  const handleClose = () => setPopUp(false)

  return (
    <nav className="bg-[#007A33] text-white shadow-md sticky top-0 z-50 w-full ">
      <div className="w-full  mx-auto px-4 md:px-8 xl:px-16 2xl:px-34">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">
                <img className='h-12 w-12 rounded-full' src="https://sdmntprwestus.oaiusercontent.com/files/00000000-abfc-6230-b290-b2d1ef6579b9/raw?se=2025-06-25T13%3A10%3A36Z&sp=r&sv=2024-08-04&sr=b&scid=d3f3f6a8-3d84-5d90-a63a-c7abc88db9e5&skoid=c953efd6-2ae8-41b4-a6d6-34b1475ac07c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-25T08%3A36%3A21Z&ske=2025-06-26T08%3A36%3A21Z&sks=b&skv=2024-08-04&sig=YnfrIFfdM6iDSaIvxcvtRlC3fzLqDwTmAQuAoTEyIck%3D" alt="" />
              </span>
             <span className="text-2xl font-bold">
  <span className="text-base text-yellow-400 mr-1 align-top">City</span>
  <span className="text-white">Connect</span>
</span>

            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:flex-1   md:items-center md:justify-between">
            <div className="ml-10 flex items-center space-x-4">
  {/* Dashboard dropdown with subpages */}
  <DropdownLink
  className='hidden lg:flex'
    label="Dashboard"
    links={[
      { name: 'Overview', to: '/admin/dashboard' },
      { name: 'Analytics', to: '/admin/dashboard/analytics' },
    ]}
  />

  {/* Notices dropdown */}
  <DropdownLink
    label="Notices"
    links={[
      { name: 'All Notices', to: '/notice' },
      { name: 'Create Notice', to: '/notice/create' },
    ]}
  />

  {/* Events dropdown (already added) */}
  <DropdownLink
    label="Events"
    links={[
      { name: 'All Events', to: '/events' },
      { name: 'Create Event', to: '/events/create' },
    ]}
  />

  {/* Feedback dropdown */}
  <DropdownLink
    label="Feedback"
    links={[
      { name: 'All Feedback', to: '/feedback' },
      { name: 'Submit Feedback', to: '/feedback/create' },
    ]}
  />

  {/* Newsletter dropdown */}
  <DropdownLink
    label="Newsletter"
    links={[
      { name: 'All Newsletters', to: '/newsletter' },
      { name: 'Create Newsletter', to: '/newsletter/create' },
    ]}
  />
</div>


           
              <div className="ml-4 flex items-center space-x-4">
              <Link to="/" className="hidden lg:flex text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">View Public Site</Link>
              
              <Link
              
                onClick={handleShow}
                className="bg-transparent hover:bg-[#FFD100] text-[#FFD100] hover:text-black px-3 py-2 rounded-md text-sm font-medium border border-[#FFD100]"
              >
                Login
              </Link>
          {/*  pop shadow */}
           {popUp && (
           <LoginPopup onClose={handleClose} />
           )}
            </div>
            
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-[#005e27] focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full" id="mobile-menu">
          <div className="px-4 pt-4 pb-3 space-y-2">
            <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/dashboard')}`} onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
            <Link to="/notice" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/notices')}`} onClick={() => setIsMobileMenuOpen(false)}>Notices</Link>
            <Link to="/events" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/events')}`} onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
            <Link to="/feedback" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/feedback')}`} onClick={() => setIsMobileMenuOpen(false)}>Feedback</Link>
            <Link to="/newsletter" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/newsletter')}`} onClick={() => setIsMobileMenuOpen(false)}>Newsletter</Link>
            <div className="border-t border-[#FFD100] pt-3">
              <Link to="/" className="block px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-[#005e27]" onClick={() => setIsMobileMenuOpen(false)}>View Public Site</Link>
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-[#FFD100] hover:text-black hover:bg-[#FFD100]" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
