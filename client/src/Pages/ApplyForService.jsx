import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiClock, FiCheckCircle, FiAlertCircle, FiPlus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import newRequest from '../utils/NewRequest';

const ApplyForServicePage = () => {
  const [form, setForm] = useState({
    serviceType: '',
    fullName: '',
    idNumber: '',
    phone: '',
    email: '',
    address: '',
    reason: '',
  });

  const [applications, setApplications] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [expandedApp, setExpandedApp] = useState(null);
  const [filter, setFilter] = useState('All');

  const serviceTypes = [
    'Water Connection',
    'Electricity Connection',
    'Business License',
    'Permit Request',
    'Building Approval',
    'Waste Collection',
    'Parking Permit'
  ];

  const statusOptions = ['Pending', 'In Review', 'Approved', 'Rejected'];
  const filters = ['All', ...statusOptions];

  // Load saved applications from localStorage
  useEffect(() => {
    const savedApplications = localStorage.getItem('serviceApplications');
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  // Save applications to localStorage when they change
  useEffect(() => {
    localStorage.setItem('serviceApplications', JSON.stringify(applications));
  }, [applications]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      const res =  newRequest.post('/service/apply', form);
      /* const newApp = {
        id: Date.now(),
        ...form,
        submittedAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
        status: 'Pending',
      }; */

      setApplications(prev => [newApp, ...prev]);
      setForm({
        serviceType: '',
        fullName: '',
        idNumber: '',
        phone: '',
        email: '',
        address: '',
        reason: '',
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const toggleAppExpand = (id) => {
    setExpandedApp(expandedApp === id ? null : id);
  };

  const filteredApplications = applications.filter(app => 
    filter === 'All' || app.status === filter
  );

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <FiClock className="mr-1" />;
      case 'In Review': return <FiAlertCircle className="mr-1" />;
      case 'Approved': return <FiCheckCircle className="mr-1" />;
      case 'Rejected': return <FiAlertCircle className="mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-gray-800">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[#007A33]">Service Application</h1>
        <p className="text-lg text-gray-600 mt-2">Apply for city services and track your applications</p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Application Form */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8 md:mb-12"
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-[#007A33]">Service Application Form</h2>
            
            {submitSuccess && (
              <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                Your application has been submitted successfully! Reference ID: {applications[0]?.id}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-2 text-gray-700">Service Type <span className='text-red-500'>*</span></label>
                <select
                  name="serviceType"
                  value={form.serviceType}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#007A33] focus:border-transparent"
                >
                  <option value="">-- Select Service --</option>
                  {serviceTypes.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2 text-gray-700">Full Name <span className='text-red-500'>*</span></label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={form.fullName} 
                    onChange={handleChange} 
                    required 
                    placeholder="Your full name"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#007A33] focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2 text-gray-700">ID/Passport Number <span className='text-red-500'>*</span></label>
                  <input 
                    type="text" 
                    name="idNumber" 
                    value={form.idNumber} 
                    onChange={handleChange} 
                    required 
                    placeholder="National ID or Passport"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#007A33] focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2 text-gray-700">Phone Number  <span className='text-red-500'>*</span></label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange} 
                    required 
                    placeholder="Phone number with country code"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#007A33] focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2 text-gray-700">Email Address <span className='text-red-500'>*</span></label>
                  <input 
                    type="email" 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    required 
                    placeholder="Your email address"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#007A33] focus:border-transparent" 
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2 text-gray-700">Address / Location <span className='text-red-500'>*</span></label>
                <input 
                  type="text" 
                  name="address" 
                  value={form.address} 
                  onChange={handleChange} 
                  required 
                  placeholder="Physical address where service is needed"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#007A33] focus:border-transparent" 
                />
              </div>

              <div>
                <label className="block font-medium mb-2 text-gray-700">Reason for Application <span className='text-red-500'>*</span></label>
                <textarea 
                  name="reason" 
                  rows="4" 
                  value={form.reason} 
                  onChange={handleChange} 
                  required 
                  placeholder="Explain why you need this service"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#007A33] focus:border-transparent" 
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center bg-[#007A33] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors w-full ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <FiPlus className="mr-2" />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Submitted Applications */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#007A33]">Your Applications</h2>
              <div className="mt-3 md:mt-0">
                <label className="mr-2 text-gray-700">Filter:</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#007A33] focus:border-transparent"
                >
                  {filters.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {filteredApplications.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {filter === 'All' 
                    ? "You haven't submitted any applications yet."
                    : `No ${filter.toLowerCase()} applications found.`}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredApplications.map(app => (
                  <motion.div 
                    key={app.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAppExpand(app.id)}
                      className="w-full flex justify-between items-center text-left p-4 focus:outline-none hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          app.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : app.status === 'Approved'
                            ? 'bg-green-100 text-green-800'
                            : app.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {getStatusIcon(app.status)}
                          {app.status}
                        </span>
                        <span className="ml-4 font-medium">{app.serviceType}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-3 hidden sm:inline">
                          {app.submittedAt}
                        </span>
                        <FiChevronDown className={`transition-transform ${
                          expandedApp === app.id ? 'transform rotate-180' : ''
                        }`} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {expandedApp === app.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 pb-4 border-t">
                              <div>
                                <h4 className="font-medium mb-2">Applicant Information:</h4>
                                <p className="text-gray-700">{app.fullName}</p>
                                <p className="text-gray-700">ID: {app.idNumber}</p>
                                <p className="text-gray-700">Phone: {app.phone}</p>
                                <p className="text-gray-700">Email: {app.email}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Service Details:</h4>
                                <p className="text-gray-700">Address: {app.address}</p>
                                <p className="text-gray-700">Reason: {app.reason}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Submitted:</span>
                                <p className="font-medium">{app.submittedAt}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Last Updated:</span>
                                <p className="font-medium">{app.updatedAt}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForServicePage;