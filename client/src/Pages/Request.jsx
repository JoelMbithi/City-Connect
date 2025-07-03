import React, { useState, useEffect } from 'react';
import { FiPlus, FiClock, FiCheckCircle, FiAlertCircle, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import newRequest from '../utils/NewRequest.js';

const RequestsPage = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
  });

  const [applications, setApplications] = useState([]); // ✅ Holds fetched requests
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [filter, setFilter] = useState('All');
  const [expandedRequest, setExpandedRequest] = useState(null);

  const statusOptions = ['Pending', 'In Progress', 'Resolved'];
  const filters = ['All', ...statusOptions];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await newRequest.get("/request/allRequestType");
        setCategories(res.data.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const storedUser = localStorage.getItem("user_id");
      if (!storedUser) {
        console.error("User ID not found in localStorage");
        return;
      }

      const user_id = JSON.parse(storedUser);

      const res = await newRequest.post("/request/createRequest", {
        ...form,
        user_id,
      });

      setForm({ title: '', description: '', category: '' });
      setShowForm(false);

      // ✅ Refetch requests after submission
      fetchUserApplication();

    } catch (error) {
      console.error("Failed to submit request", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchUserApplication = async () => {
    const storedUser = localStorage.getItem("user_id");
    if (!storedUser) return;

    const user_id = JSON.parse(storedUser);

    try {
      const res = await newRequest.get(`/request/singleRequest/${user_id}/applications`);
      const rawRequests = res.data.data;

      // Map category ID to name
      const enriched = rawRequests.map(req => {
        const categoryName = categories.find(c => c.request_type_id === req.request_type_id)?.name || 'Unknown';
        return {
          id: req.request_id,
          title: req.title,
          description: req.description,
          category: categoryName,
          status: req.status || 'Pending',
          submittedAt: new Date(req.created_at).toLocaleString(),
          updatedAt: new Date(req.updated_at).toLocaleString(),
        };
      });

      setApplications(enriched);
    } catch (error) {
      console.error("Error fetching user applications:", error);
      setApplications([]);
    }
  };

  useEffect(() => {
    fetchUserApplication();
  }, [categories]); // Ensure categories are loaded before mapping

  const toggleRequestExpand = (id) => {
    setExpandedRequest(expandedRequest === id ? null : id);
  };

  const filteredRequests = applications.filter(request =>
    filter === 'All' || request.status === filter
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <FiClock className="mr-1" />;
      case 'In Progress': return <FiAlertCircle className="mr-1" />;
      case 'Resolved': return <FiCheckCircle className="mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[#007A33]">Service Requests</h1>
        <p className="text-lg text-gray-600 mt-2">Submit and track your requests</p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center bg-[#007A33] text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <FiPlus className="mr-2" />
            {showForm ? 'Hide Form' : 'New Request'}
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md overflow-hidden mb-8 md:mb-12"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-[#007A33]">New Request Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-medium mb-2 text-gray-700">Title<span className='text-red-500'>*</span></label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      required
                      placeholder="Brief summary of your request"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#007A33] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2 text-gray-700">Description<span className='text-red-500'>*</span></label>
                    <textarea
                      name="description"
                      rows="4"
                      value={form.description}
                      onChange={handleChange}
                      required
                      placeholder="Detailed info about your request"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#007A33] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2 text-gray-700">Category<span className='text-red-500'>*</span></label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#007A33] focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
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
                          Submit Request
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Requests List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#007A33]">Your Requests</h2>
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

            {filteredRequests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {filter === 'All'
                    ? "You haven't submitted any requests yet."
                    : `No ${filter.toLowerCase()} requests found.`}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredRequests.map((req) => (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleRequestExpand(req.id)}
                      className="w-full flex justify-between items-center text-left p-4 focus:outline-none hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          req.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : req.status === 'Resolved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {getStatusIcon(req.status)}
                          {req.status}
                        </span>
                        <span className="ml-4 font-medium">{req.title}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-3 hidden sm:inline">
                          {req.category} • {req.submittedAt}
                        </span>
                        <FiChevronDown className={`transition-transform ${
                          expandedRequest === req.id ? 'transform rotate-180' : ''
                        }`} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {expandedRequest === req.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4">
                            <div className="pt-2 pb-4 border-t">
                              <h4 className="font-medium mb-2">Description:</h4>
                              <p className="text-gray-700">{req.description}</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Category:</span>
                                <p className="font-medium">{req.category}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Submitted:</span>
                                <p className="font-medium">{req.submittedAt}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Last Updated:</span>
                                <p className="font-medium">{req.updatedAt}</p>
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

export default RequestsPage;
