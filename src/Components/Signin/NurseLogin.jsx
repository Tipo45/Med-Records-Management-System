import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login_doctor } from "../../lib/pocketbase";

const NurseLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const validateEmail = (value) => {
    if (value === "") {
      setEmailError("email required");
      setLoading(false);
      return;
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    if (value === "") {
      setPasswordError("Password required");
      setLoading(false);
      return;
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    validateEmail(email);
    validatePassword(password);

    if (!emailError && !passwordError) {
      try {
        const result = await login_doctor(email, password);

        if (result.record) {
          navigate("/user_account/dashboard?login=success");
        }
      } catch (error) {
        console.log(error);
        setLoginError("Incorrect login details");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">

        <h1 className="text-2xl text-center font-secondary font-medium">Nurse&apos;s Login Page</h1>
        
        {loginError && (
          <div className="text-red-500 p-2 bg-gray-200 mt-1 mb-1 left-0 font-medium rounded-lg text-xl">
            {loginError}
          </div>
        )}
        <form onSubmit={(e) => handleSubmit(e)}>
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
                  id="username"
                  type="text"
                  placeholder="enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => validateEmail(e.target.value)}
                  className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                />
                {emailError && (
                  <div className="text-red-500 font-medium p-2 bg-gray-200 rounded-xl mt-1 mb-1">
                    {emailError}
                  </div>
                )}
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
                  onBlur={(e) => validatePassword(e.target.value)}
                  className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                  data-aos="fade-left"
                  data-aos-duration="2000"
                />
                {passwordError && (
                  <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                    {passwordError}
                  </div>
                )}
              </div>

              {loading ? (
                <button className="w-full cursor-not-allowed bg-text text-white text-lg font-semibold p-3 rounded-3xl mt-3 flex justify-center">
                  <svg
                    className="mr-3 size-8 animate-spin"
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
                  data-aos-duration="2500"
                >
                  Sign In
                </button>
              )}
            </div>
            <div
              className="text-center text-sm font-secondary"
              data-aos="fade-up"
              data-aos-duration="3000"
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
              data-aos-duration="3000"
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
          data-aos-duration="3000"
        >
          By clicking Login, you agree to our Terms of Service and Privacy
          Policy .
        </div>
      </div>
    </div>
  );
};

export default NurseLogin;
