import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiMail, FiPhone, FiMapPin, FiSend, FiClock } from 'react-icons/fi';

const faqs = [
  {
    question: 'How do I register for an event?',
    answer: 'Go to the Events page, choose an event, and click the "Register" button.',
  },
  {
    question: 'How can I submit feedback?',
    answer: 'Visit the Feedback page and fill in the form to send us your thoughts.',
  },
  {
    question: 'Where can I access past newsletters?',
    answer: 'You can find them on the Newsletter page under "Archives".',
  },
  {
    question: 'What are your operating hours?',
    answer: 'Our support team is available Monday to Friday from 8:00 AM to 5:00 PM.',
  },
  {
    question: 'How long does it take to get a response?',
    answer: 'We typically respond within 24-48 hours during business days.',
  },
];

const SupportPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-[#007A33]">Need Help?</h1>
        <p className="text-lg text-gray-600 mt-2">We're here to support you 24/7</p>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - FAQ */}
        <div className="lg:col-span-2 space-y-8">
          {/* FAQ Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-2xl font-semibold mb-6 text-[#007A33]">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center text-left px-5 py-4 focus:outline-none hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    <FiChevronDown className={`transition-transform ${expandedIndex === index ? 'transform rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 py-3 text-gray-600 border-t bg-gray-50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-2xl font-semibold mb-6 text-[#007A33]">Contact Us Directly</h2>
            {submitSuccess && (
              <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#007A33] focus:border-transparent" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#007A33] focus:border-transparent" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#007A33] focus:border-transparent" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Message</label>
                <textarea 
                  rows="4" 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#007A33] focus:border-transparent"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center bg-[#007A33] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors w-full disabled:opacity-70"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <FiSend className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Right Column - Contact Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-20"
        >
          <h2 className="text-2xl font-semibold mb-6 text-[#007A33]">Contact Information</h2>
          <div className="space-y-5">
            <div className="flex items-start">
              <div className="bg-[#007A33]/10 p-3 rounded-full mr-4">
                <FiMail className="text-blue-600 text-lg" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Email</h3>
                <p className="text-gray-600">support@cityconnect.co.ke</p>
                <p className="text-gray-600">info@cityconnect.co.ke</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#007A33]/10 p-3 rounded-full mr-4">
                <FiPhone className="text-green-600 text-lg" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Phone</h3>
                <p className="text-gray-600">+254-700-123-456</p>
                <p className="text-gray-600">+254-711-987-654</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#007A33]/10 p-3 rounded-full mr-4">
                <FiMapPin className=" text-red-500 text-lg" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Address</h3>
                <p className="text-gray-600">City Hall, Nairobi</p>
                <p className="text-gray-600">Room 101, 1st Floor</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#007A33]/10 p-3 rounded-full mr-4">
                <FiClock className="text-orange-400 text-lg" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Working Hours</h3>
                <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">Emergency Contact</h3>
            <p className="text-red-700">For urgent matters outside working hours, call: +254-722-555-123</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SupportPage;