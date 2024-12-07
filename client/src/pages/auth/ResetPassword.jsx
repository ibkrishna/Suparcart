import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://ecommerce-d1.onrender.com/api/auth/reset-password', {
        email,
        otp,
        newPassword,
      });
      
      setMessage('Password changed successfully');
      setError('');
      alert('Password changed successfully');
      navigate('/auth/login'); // Navigate to login after success
    } catch (err) {
      setError(err.response?.data?.message || 'Error resetting password');
      setMessage('');
      console.error('Error details:', err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="bg-[#F5F5F5] p-8 rounded-sm shadow-lg w-full max-w-md  hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl font-medium text-center mb-6" style={{ fontFamily: 'Inter' }}>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            readOnly
            className="border border-gray-300 rounded-md p-2 w-full mb-4 bg-gray-100 cursor-not-allowed"
          />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-black text-white rounded-md py-2 transition bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;