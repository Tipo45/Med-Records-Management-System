import React, { useEffect, useState } from "react";
import { FaArrowRight, FaCheckCircle, FaEnvelope } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { request_Verification } from "../../lib/pocketbase";

const Emailverification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(0);
  const [email, setEmail] = useState("");
  const [emailSentMessage, setEmailSentMessage] = useState("");
  const [previousPath, setPreviousPath] = useState("/login/doctor"); // default to doctor login

  useEffect(() => {
    // Get the email and user type from navigation state
    if (location.state?.email) {
      setEmail(location.state.email);
    }
    
    if (location.state?.userType) {
      setPreviousPath(location.state.userType === "nurse" 
        ? "/login/nurse" 
        : "/login/doctor");
    }

    // Clear any registration success parameters from URL
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);

    setCountdown(30)
  }, [location.state]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendVerification = async () => {
    if (countdown === 0 && email) {
      try {
        await request_Verification(email);
        setEmailSentMessage(`Verification email already resent to ${email}. Please check your inbox or spam folder`);
        
        setTimeout(() => setEmailSentMessage(""), 5000);
      } catch (error) {
        console.error(error);
        alert("Failed to resend verification email. Please try again.");
      }
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      {emailSentMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <div className="flex items-center justify-between text-green-600 bg-green-100 border border-green-300 rounded-lg px-4 py-3 shadow-lg">
            <span className="font-medium">{emailSentMessage}</span>
            <button
              type="button"
              className="ml-2 text-green-700 hover:text-green-900 font-bold text-xl"
              onClick={() => setEmailSentMessage("")}
              aria-label="Dismiss"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <FaEnvelope className="text-primary text-4xl" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Verify Your Email Address
        </h1>

        {email && (
          <p className="text-gray-700 font-medium mb-2">
            Sent to: <span className="text-primary">{email}</span>
          </p>
        )}

        <p className="text-gray-600 mb-6">
          We've sent a verification link to your email address. Please check
          your inbox and click the link to verify your account.
        </p>

        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
          <div className="flex items-start">
            <FaCheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-800">
                Didn't receive the email?
              </h3>
              <p className="text-sm text-gray-600">
                Check your spam folder or click below to resend the verification
                email.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <button type="button" 
            onClick={handleResendVerification}
            disabled={countdown > 0}
            className={`w-full py-3 px-4 text-white font-medium rounded-lg transition duration-200 ${countdown === 0 ? "bg-secondary cursor-pointer hover:bg-secondary-hover" : "bg-gray-400 cursor-not-allowed"}`}
          >
            {countdown > 0 ? `Resend in ${countdown}s` : "Resend Verification Email"}
          </button>

          <button
            onClick={() => navigate(previousPath)}
            className="w-full cursor-pointer py-3 px-4 flex items-center justify-center text-text hover:text-secondary font-medium rounded-lg group"
          >
            Return to Login{" "}
            <FaArrowRight className="ml-2 transition-all duration-300 group-hover:translate-x-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Emailverification;
