import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginWithOTP, requestOTP } from "../../lib/pocketbase";
import { render } from "@react-email/render";
import OTPEmail from "../../Emails/OTPEmail";

const DocLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [otpSentMessage, setOtpSentMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (value) => {
    if (value === "") {
      setEmailError("email required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Invalid email format");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOTP = async () => {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) return;

    setLoading(true);
    setLoginError("");

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const emailContent = await render(<OTPEmail otp={otpCode} />);

    try {
      await requestOTP(email, otpCode, emailContent);
      setIsOTPSent(true);
      setOtpSentMessage("OTP successfully sent to your email!");
      setCountdown(30);
      setTimeout(() => setOtpSentMessage(""), 5000);
    } catch (error) {
      const message = error.message.includes("No account found")
        ? "No account found with this email"
        : "Failed to send OTP. Please try again.";
      setLoginError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown === 0) {
      await handleSendOTP();
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      setLoginError("Please enter the OTP");
      return;
    }
    if (!password) {
      setLoginError("Please enter your password");
      return;
    }

    setLoading(true);
    setLoginError("");

    try {
      const result = await loginWithOTP(email, password, otp);

      if (result.record) {
        navigate("/user_account/dashboard?login=success");
      }
    } catch (error) {
      const message = error.message.includes("No account found")
        ? "No account found with this email"
        : "Failed to send OTP. Please try again.";
      setLoginError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isOTPSent) {
      await handleVerifyOTP();
    } else {
      await handleSendOTP();
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-2xl text-center font-secondary font-medium">
          Nurse Login Page
        </h1>

        {loginError && (
          <div className="text-red-500 p-2 bg-gray-200 mt-1 mb-1 left-0 font-medium rounded-lg text-xl">
            {loginError}
          </div>
        )}

        {otpSentMessage && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
            <div className="flex items-center justify-between text-green-600 bg-green-100 border border-green-300 rounded-lg px-4 py-3 shadow-lg">
              <span className="font-medium">{otpSentMessage}</span>
              <button
                type="button"
                className="ml-2 text-green-700 hover:text-green-900 font-bold text-xl"
                onClick={() => setOtpSentMessage("")}
                aria-label="Dismiss"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <label
                  htmlFor="email"
                  className="font-primary"
                  data-aos="fade-left"
                  data-aos-duration="500"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => validateEmail(e.target.value)}
                  className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                  disabled={isOTPSent && countdown > 0}
                />
                {emailError && (
                  <div className="text-red-500 font-medium p-2 bg-gray-200 rounded-xl mt-1 mb-1">
                    {emailError}
                  </div>
                )}
              </div>

              {isOTPSent && (
                <>
                  <div className="grid gap-2">
                    <label
                      htmlFor="otp"
                      className="font-primary"
                      data-aos="fade-left"
                      data-aos-duration="1500"
                    >
                      OTP Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="otp"
                        type="number"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="flex-1 outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        data-aos="fade-left"
                        data-aos-duration="2000"
                      />
                      <button
                        type="button"
                        className={`text-white text-md p-2 rounded-lg whitespace-nowrap min-w-32 ${
                          countdown === 0
                            ? "bg-primary hover:bg-primary-hover cursor-pointer"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                        onClick={handleResendOTP}
                        disabled={countdown > 0 || loading}
                      >
                        {countdown > 0
                          ? `Resend in ${countdown}s`
                          : "Resend OTP"}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <label
                        htmlFor="password"
                        className="font-primary"
                        data-aos="fade-left"
                        data-aos-duration="1500"
                      >
                        Password
                      </label>
                    </div>
                    <input
                      id="password"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                      data-aos="fade-left"
                      data-aos-duration="2000"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full cursor-pointer bg-text hover:bg-primary text-white text-lg font-primary font-semibold p-3 rounded-3xl mt-3 flex items-center justify-center"
                data-aos="zoom-in"
                data-aos-duration="1000"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="mr-3 size-6 animate-spin"
                      viewBox="0 0 24 24"
                    >
                      <FaSpinner />
                    </svg>
                  </>
                ) : isOTPSent ? (
                  "Verify OTP & Sign In"
                ) : (
                  "Request OTP"
                )}
              </button>
            </div>

            <div
              className="text-center text-sm font-secondary"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              Don&apos;t have an account?{" "}
              <Link
                to="/registration"
                className="underline underline-offset-4 text-blue-500"
              >
                Sign Up
              </Link>
            </div>
            <div
              className="text-center text-sm font-secondary"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              Not a nurse?{" "}
              <Link
                to="/login/doctor"
                className="underline underline-offset-4 text-blue-500"
              >
                Sign In Here
              </Link>
            </div>
          </div>
        </form>

        <div
          className="text-balance text-center text-xs text-muted-foreground font-primary"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          By clicking Sign In, you agree to our Terms of Service and Privacy
          Policy.
        </div>
      </div>
    </div>
  );
};

export default DocLogin;
