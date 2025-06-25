import React, { useState } from 'react';

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const newsletters = [
    {
      title: 'March 2025 Newsletter',
      date: 'March 15, 2025',
      link: '/newsletters/march-2025.pdf',
    },
    {
      title: 'February 2025 Newsletter',
      date: 'February 12, 2025',
      link: '/newsletters/february-2025.pdf',
    },
    {
      title: 'January 2025 Newsletter',
      date: 'January 10, 2025',
      link: '/newsletters/january-2025.pdf',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simulate sending to server
    console.log('Subscribed:', email);
    setSubscribed(true);
    setEmail('');
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 xl:px-16 py-10">
      <h1 className="text-3xl font-bold text-[#007A33] mb-4"><span className='inline-block spin-pause'>📰</span> CityConnect Newsletter</h1>
      <p className="mb-6 text-gray-700">
        Stay informed with the latest updates, events, and notices from Nairobi City County.
        Subscribe below or read our past newsletters.
      </p>

      {/* Subscription Form */}
      {!subscribed ? (
        <form onSubmit={handleSubmit} className="mb-10 bg-white shadow p-6 rounded-md border">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#007A33]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. you@example.com"
            required
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="bg-[#007A33] text-white px-6 py-2 rounded hover:bg-[#005e27]"
          >
            Subscribe Now
          </button>
        </form>
      ) : (
        <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-10">
          🎉 Thank you for subscribing! You’ll receive our next newsletter in your inbox.
        </div>
      )}

      {/* Newsletter Archive */}
      <h2 className="text-2xl font-semibold text-[#007A33] mb-4">Past Newsletters</h2>
      <ul className="space-y-4">
        {newsletters.map((item, index) => (
          <li key={index} className="bg-white p-4 shadow rounded border border-gray-200">
            <div className="flex items-center justify-between">
              <div> 
                <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007A33] font-semibold hover:underline"
              >
                View PDF
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsletterPage;
