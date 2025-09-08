import React, { useState } from 'react';

const ContactUs = ({ setCurrentView }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Thank you! We will contact you soon.');
        setPhoneNumber('');
        setEmail('');
      } else {
        setMessage(data.message || '❌ Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setMessage('❌ Failed to connect to the server. Please check if backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-lg -translate-y-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Get in Touch</h2>
        <p className="text-gray-600 mb-8 text-center">
          Please provide your contact information, and we'll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          {message && (
            <p
              className={`text-center font-medium ${
                message.includes('✅') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-blue-600 hover:underline"
          >
            Go back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
