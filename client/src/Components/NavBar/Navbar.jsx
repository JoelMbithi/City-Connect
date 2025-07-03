import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginPopup from '../PopUp/LoginPopup';
import DropdownLink from '../DropDown/DropDown';
import logo from "../../assets/NairobiConnect.png";
import newRequest from '../../utils/NewRequest';

const AdminNavbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [user, setUser] = useState(null);

  const isActive = (path) =>
    location.pathname.includes(path)
      ? 'text-[#FFD100] border-b-2 border-[#FFD100]'
      : 'text-white hover:text-[#FFD100]';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleShow = () => setPopUp(true);
  const handleClose = () => setPopUp(false);

  const fetchUser = async () => {
    const userData = localStorage.getItem("user");
    if (!userData) return;
    const user = JSON.parse(userData);
    try {
      const res = await newRequest.get(`/user/getSingleUser/${user.user_id}`);
      setUser(res.data.user);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <nav className="bg-[#007A33] text-white shadow-md sticky top-0 z-50 w-full">
        <div className="w-full mx-auto px-4 md:px-8 xl:px-16 2xl:px-34">
          <div className="flex items-center justify-between h-16 w-full">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img className='h-12 w-12 rounded-full' src={logo} alt="Logo" />
                <span className="text-2xl font-bold">
                  <span className="text-base text-yellow-400 mr-1 align-top">City</span>
                  <span className="text-white">Connect</span>
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
              <div className="ml-10 flex items-center space-x-4">
                <DropdownLink
                  label="Dashboard"
                  links={[
                    { name: 'Overview', to: '/admin/dashboard' },
                    { name: 'Analytics', to: '/admin/dashboard/analytics' },
                  ]}
                />
                <DropdownLink
                  label="Notices"
                  links={[
                    { name: 'All Notices', to: '/notice' },
                    { name: 'Create Notice', to: '/notice/create' },
                  ]}
                />
                <DropdownLink
                  label="Events"
                  links={[
                    { name: 'All Events', to: '/events' },
                    { name: 'Create Event', to: '/events/create' },
                  ]}
                />
                <DropdownLink
                  label="Feedback"
                  links={[
                    { name: 'All Feedback', to: '/feedback' },
                    { name: 'Submit Feedback', to: '/feedback/create' },
                  ]}
                />
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

                {user && user.name ? (
                  <div className="relative group">
                    <button className="text-white font-semibold px-3 py-2 rounded-md">
                      {user.name}
                    </button>
                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                      <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</Link>
                      <button
                        onClick={() => {
                          localStorage.clear();
                          setUser(null);
                          window.location.reload();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleShow}
                    className="bg-transparent hover:bg-[#FFD100] text-[#FFD100] hover:text-black px-3 py-2 rounded-md text-sm font-medium border border-[#FFD100]"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-[#005e27]"
              >
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
              <Link to="/admin/dashboard" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/dashboard')}`} onClick={toggleMobileMenu}>Dashboard</Link>
              <Link to="/notice" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/notice')}`} onClick={toggleMobileMenu}>Notices</Link>
              <Link to="/events" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/events')}`} onClick={toggleMobileMenu}>Events</Link>
              <Link to="/feedback" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/feedback')}`} onClick={toggleMobileMenu}>Feedback</Link>
              <Link to="/newsletter" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/newsletter')}`} onClick={toggleMobileMenu}>Newsletter</Link>
              <div className="border-t border-[#FFD100] pt-3">
                <Link to="/" className="block px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-[#005e27]" onClick={toggleMobileMenu}>View Public Site</Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleShow();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#FFD100] hover:text-black hover:bg-[#FFD100]"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Login Popup outside nav */}
      {popUp && <LoginPopup onClose={handleClose} />}
    </>
  );
};

export default AdminNavbar;
