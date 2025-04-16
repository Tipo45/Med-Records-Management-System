import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSpinner, FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import { pb } from '../../lib/pocketbase';
import { login_medOfficer } from '../../lib/pocketbase';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  if (!email) {
    navigate('/login');
    return null;
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Verify OTP with PocketBase
      login_medOfficer(email, otp);
      
      // On successful verification, redirect to dashboard
      navigate('/user_account/dashboard');
    } catch (err) {
      console.error('OTP verification failed:', err);
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      await pb.collection('medofficer').requestOTP(email);
    } catch (err) {
      setError(err.message || 'Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
       

        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <FaEnvelope className="h-6 w-6 text-primary" />
          </div>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">Verify Your Identity</h2>
          <p className="mt-2 text-gray-600">
            Enter the 6-digit OTP sent to <span className="font-semibold">{email}</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              OTP Code
            </label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 py-2 border rounded-md focus:ring-seondary focus:border-secondary"
              placeholder="123456"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className={`w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              loading || otp.length !== 6 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Verify'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <button
            onClick={handleResendOTP}
            disabled={loading}
            className="text-black cursor-pointer hover:text-secondary font-medium"
          >
            {loading ? 'Sending...' : 'Resend OTP'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;