import React, { useEffect } from 'react'
import { FaArrowRight, FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { requestVerification } from '../../lib/pocketbase';

const Emailverification = () => {

    const navigate = useNavigate();

    useEffect(() => {
      // Clear any registration success parameters from URL
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }, []);
  
    return (
      <section className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <FaEnvelope className="text-primary text-4xl" />
            </div>
          </div>
  
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Verify Your Email Address
          </h1>
  
          <p className="text-gray-600 mb-6">
            We've sent a verification link to your email address. Please check your
            inbox and click the link to verify your account.
          </p>
  
          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-start">
              <FaCheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-800">Didn't receive the email?</h3>
                <p className="text-sm text-gray-600">
                  Check your spam folder or click below to resend the verification email.
                </p>
              </div>
            </div>
          </div>
  
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => {requestVerification(),
                alert("Verification email resent!");
              }}
              className="w-full py-3 px-4 bg-secondary cursor-pointer text-white font-medium rounded-lg transition duration-200"
            >
              Resend Verification Email
            </button>
  
            <button
              onClick={() => navigate("/login/doctor")}
              className="w-full cursor-pointer py-3 px-4 flex items-center justify-center text-text font-medium rounded-lg group"
            >
              Return to Login <FaArrowRight className="ml-2 transition-all duration-300 group-hover:translate-x-2" />
            </button>
          </div>
        </div>
      </section>
  
  )
}

export default Emailverification
