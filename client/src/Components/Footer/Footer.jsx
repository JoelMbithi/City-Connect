import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // integrate with your API: send `email` to newsletter endpoint
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="bg-[#007A33] text-white pt-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div className='hidden md:block'>
          <h3 className="text-xl font-bold mb-4">CityConnect</h3>
          <p className="text-gray-200">
            Bridging the gap between your council and community.  
            Get notices, events, live updates and more, all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div className='hidden md:block'>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            {['Home', 'Notice', 'Events', 'Feedback', 'Support'].map((item) => (
              <li key={item}>
                <Link
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-gray-200 hover:text-[#FFD100] transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <ul className="space-y-2 text-gray-200">
            <li>📍 Nairobi City Hall, Kenyatta Ave</li>
            <li>📞 +254 20 323 1111</li>
            <li>✉️ info@cityconnect.go.ke</li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-[#FFD100] transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-[#FFD100] transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-[#FFD100] transition-colors">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Newsletter</h4>
          <p className="text-gray-200 mb-4">Get the latest updates delivered straight to your inbox.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
            <input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 rounded-md text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#FFD100] hover:bg-yellow-300 text-black font-medium px-4 py-2 rounded-md transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-[#FFD100] mt-8 pt-4 pb-6">
        <p className="text-center text-gray-300 text-sm">
          © {new Date().getFullYear()} CityConnect — Nairobi City County. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
