import React, { useState, useEffect } from 'react';
import newRequest from '../utils/NewRequest';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    category: 'suggestion'
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);
  const [activeTab, setActiveTab] = useState('form');
  const [feedbackTypes, setFeedbackTypes] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        if (activeTab === 'feed') {
          const res = await newRequest.get('/feedback/getAllFeedback');
          const formatted = res.data.feedback.map((fb) => ({
            id: fb.feedback_id,
            subject: fb.subject,
            message: fb.message,
            category: fb.category || 'general',
            date: new Date(fb.created_at).toISOString().split('T')[0],
            user: fb.user_name || 'Anonymous'
          }));
          setFeedbackList(formatted);
        } else {
          const storedUser = JSON.parse(localStorage.getItem('user'));
          if (!storedUser) {
            setError('You must be logged in to submit feedback..');
            return;
          }
          const res = await newRequest.get(`/feedback/getUserFeedback/${storedUser.user_id}`);
          const formatted = res.data.feedback.map((fb) => ({
            id: fb.feedback_id,
            subject: fb.subject,
            message: fb.message,
            category: fb.category || 'general',
            date: new Date(fb.created_at).toISOString().split('T')[0],
            user: 'You'
          }));
          setFeedbackList(formatted);
        }
      } catch (err) {
        console.error('Error fetching feedback:', err);
       // setError('Failed to load feedback. Please try again later.');
      }
    };

    fetchFeedback();
  }, [activeTab]);

  useEffect(() => {
    const fetchFeedbackTypes = async () => {
      try {
        const res = await newRequest.get('/feedback/getFeedbackTypes');
        setFeedbackTypes(res.data.feedbackTypes);
      } catch (error) {
        console.error('Error fetching feedback types:', error);
        setError('Failed to load feedback types. Please try again later.');
      }
    };
    fetchFeedbackTypes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) {
        setError('You must be logged in to submit feedback.');
        return;
      }

      const user_id = storedUser.user_id;
      await newRequest.post('/feedback/createFeedback', {
        ...formData,
        user_id
      });

      const newFeedback = {
        id: feedbackList.length + 1,
        subject: formData.subject,
        message: formData.message,
        category: formData.category,
        date: new Date().toISOString().split('T')[0],
        user: 'You'
      };

      setFeedbackList([newFeedback, ...feedbackList]);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-3 text-2xl font-bold text-gray-900">Thank You!</h1>
          <p className="mt-2 text-gray-600">Your feedback has been received.</p>
          <div className="mt-6 space-x-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ subject: '', message: '', category: 'suggestion' });
                setActiveTab('form');
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
              Submit Another Feedback
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setActiveTab('feed');
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md"
            >
              View Community Feedback
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('form')}
          className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'form' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500'}`}
        >
          Submit Feedback
        </button>
        <button
          onClick={() => setActiveTab('feed')}
          className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'feed' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500'}`}
        >
          Community Feedback
        </button>
      </div>

      {activeTab === 'form' ? (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
          {error && <p className="text-red-600">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md"
            >
              {feedbackTypes.map((type) => (
                <option key={type.feedback_type_id} value={type.feedback_type_name}>
                  {type.feedback_type_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 mt-1"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 text-sm font-medium text-white bg-green-600 rounded-md ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          {feedbackList.map((feedback) => (
            <div key={feedback.id} className="border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">{feedback.subject}</h3>
              <div className="text-sm text-gray-500 mb-1">{feedback.date} by {feedback.user}</div>
              <p className="text-gray-700">{feedback.message}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                {feedback.category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
