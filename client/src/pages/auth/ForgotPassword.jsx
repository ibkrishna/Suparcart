import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../components/auth/style.css';


const ForgotPassword = () => {
  const [email, setEmail] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecommerce-d1.onrender.com/api/auth/request-password-reset', { email });
      setMessage(response.data.message);
      setError('');
      navigate('/auth/reset-password', { state: { email } });
      alert('OTP sent to your email');
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending OTP');
      setMessage('');
    }
  };

  return (
    <>
   
    <div className="flex justify-center  p-4">
      <div className="bg-[#F5F5F5] p-8 rounded-lg shadow-lg w-full max-w-md hover:shadow-2xl transition-shadow duration-300">
        
        <h2 className="text-2xl font-medium text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-black text-white rounded-md py-2 transition bg-primary text-primary-foreground hover:bg-primary/90" style={{ fontFamily: 'Inter' }}
          >
            Send OTP
          </button>
        </form>
        <div className="text-right mt-6 ">
          <Link to="/auth/login" className="text-black underline font-medium text-xl">
            Back to login
          </Link>
        </div>
        {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
    </>
  );
};

export default ForgotPassword;