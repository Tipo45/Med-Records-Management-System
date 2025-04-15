import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { create_medofficer } from "../../lib/pocketbase";

const Registration = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Real-time validation for first name
  const validateFirstname = (value) => {
    if (value === "") {
      setFirstnameError("First name required");
    } else {
      setFirstnameError("");
    }
  };

  // Real-time validation for last name
  const validateLastname = (value) => {
    if (value === "") {
      setLastnameError("Last name required");
    } else {
      setLastnameError("");
    }
  };

  const validateRole = (value) => {
    if (!value) {
      setRoleError("Please select your role");
    } else {
      setRoleError("");
    }
  };

  // Real-time validation for email
  const validateEmail = (value) => {
    if (value === "") {
      setEmailError("Email required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  // Real-time validation for password
  const validatePassword = (value) => {
    if (value === "") {
      setPasswordError("Password required");
    } else if (value.length < 8) {
      setPasswordError("Password is too short");
    } else if (passwordConfirm !== "" && value !== passwordConfirm) {
      setPasswordError("Passwords do not match");
      setConfirmPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
      setConfirmPasswordError("");
    }
  };

  // Real-time validation for confirm password
  const validateConfirmPassword = (value) => {
    if (value === "") {
      setConfirmPasswordError("Confirm password required");
    } else if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
      setPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
      setPasswordError("");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   validateFirstname(firstname);
  //   validateLastname(lastname);
  //   validateRole(role);
  //   validateEmail(email);
  //   validatePassword(password);
  //   validateConfirmPassword(passwordConfirm);

  //   if (
  //     firstnameError ||
  //     lastnameError ||
  //     emailError ||
  //     roleError ||
  //     passwordError ||
  //     confirmPasswordError
  //   ) {
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const result = await create_medofficer(
  //       email,
  //       password,
  //       passwordConfirm,
  //       firstname,
  //       lastname,
  //       role,
  //     );

  //     if (result.record) {
  //       navigate("/email-verification");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   setLoading(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Validate all fields
    validateFirstname(firstname);
    validateLastname(lastname);
    validateRole(role);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(passwordConfirm);
  
    // Check for errors directly from current values
    const hasErrors = 
      !firstname.trim() || 
      !lastname.trim() || 
      !role.trim() || 
      !email.trim() || 
      !password.trim() || 
      !passwordConfirm.trim() ||
      password !== passwordConfirm;
  
    if (hasErrors) {
      setLoading(false);
      return;
    }
  
    try {
      console.log("Attempting to create user..."); // Debug log
      const result = await create_medofficer(
        email,
        password,
        passwordConfirm,
        firstname,
        lastname,
        role
      );
  
      console.log("Creation result:", result); // Debug log
      
      if (result) {
        console.log("Navigating to email verification..."); // Debug log
        navigate("/email-verification", { 
          state: { email: email },
          replace: true 
        });
      } else {
        console.error("Unexpected result format:", result);
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.data?.data) {
        const fieldErrors = error.data.data;
        if (fieldErrors.email) {
          setEmailError(fieldErrors.email.message);
        }
        if (fieldErrors.password) {
          setPasswordError(fieldErrors.password.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-2xl text-center font-secondary font-medium">
          Registration Page
        </h1>

        {/* Registration Form */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="grid gap-6">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-5">
              <div className="grid gap-2">
                <label
                  htmlFor="firstname"
                  className="font-primary"
                  data-aos="fade-right"
                  data-aos-duration="500"
                >
                  First Name
                </label>
                <input
                  id="firstname"
                  type="text"
                  placeholder="Steph"
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                    validateFirstname(e.target.value);
                  }}
                  onBlur={(e) => validateFirstname(e.target.value)}
                  maxLength={16}
                  className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2 w-full"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                />
                {firstnameError && (
                  <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                    {firstnameError}
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="lastname"
                  className="font-primary"
                  data-aos="fade-right"
                  data-aos-duration="500"
                >
                  Last Name
                </label>
                <input
                  id="lastname"
                  type="text"
                  placeholder="Curry"
                  value={lastname}
                  maxLength={16}
                  onChange={(e) => {
                    setLastname(e.target.value);
                    validateLastname(e.target.value);
                  }}
                  onBlur={(e) => validateLastname(e.target.value)}
                  className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2 w-full"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                />
                {lastnameError && (
                  <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                    {lastnameError}
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="user-type"
                className="font-primary"
                data-aos="fade-right"
                data-aos-duration="1000"
                data-aos-delay="500"
              >
                I am a
              </label>
              <select
                id="user-type"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2 w-full"
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay="700"
              >
                <option value="">Select role</option>
                <option value="Dr">Doctor</option>
                <option value="nurse">Nurse</option>
              </select>
              {roleError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {roleError}
                </div>
              )}
            </div>

            {/* Email and Password Fields */}
            <div className="grid gap-6">
              <div className="grid gap-2">
                <label
                  htmlFor="email"
                  className="font-primary"
                  data-aos="fade-right"
                  data-aos-duration="500"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  onBlur={(e) => validateEmail(e.target.value)}
                  className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                />
                {emailError && (
                  <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                    {emailError}
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="password"
                  className="font-primary"
                  data-aos="fade-right"
                  data-aos-duration="500"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  onBlur={(e) => validatePassword(e.target.value)}
                  className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                />
                {passwordError && (
                  <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                    {passwordError}
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="confirm-password"
                  className="font-primary"
                  data-aos="fade-right"
                  data-aos-duration="500"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="********"
                  value={passwordConfirm}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateConfirmPassword(e.target.value);
                  }}
                  onBlur={(e) => validateConfirmPassword(e.target.value)}
                  className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                />
                {confirmPasswordError && (
                  <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                    {confirmPasswordError}
                  </div>
                )}
              </div>

              {/* Sign Up Button */}
              {loading ? (
                <button className="w-full bg-text text-white text-lg font-semibold p-3 rounded-3xl mt-3 flex justify-center cursor-not-allowed">
                  <svg
                    className="mr-3 size-8 text-light-gray animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <FaSpinner />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-text hover:bg-primary text-white text-lg font-primary font-semibold p-3 rounded-3xl mt-3"
                  data-aos="zoom-in"
                  data-aos-duration="1500"
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Sign In Link */}
        <div
          className="text-center text-sm"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          Have an account?{" "}
          <Link
            to="/login/doctor"
            className="underline underline-offset-4 text-blue-500"
          >
            Sign In
          </Link>
        </div>

        {/* Terms and Privacy Policy */}
        <div
          className="text-balance text-center text-xs text-muted-foreground"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="500"
        >
          By clicking register, you agree to our Terms of Service and Privacy
          Policy.
        </div>
      </div>
    </div>
  );
};

export default Registration;
