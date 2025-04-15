import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaSpinner } from "react-icons/fa";
import { create_Patient } from "../../lib/pocketbase";

const Addpatient = () => {
  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [fullNameError, setFullnameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const validateFullName = (value) => {
    if (value === "") {
      setFullnameError("required");
    } else {
      setFullnameError("");
    }
  };

  const validateAge = (value) => {
    if (value === "") {
      setAgeError("required");
    } else {
      setAgeError("");
    }
  };

  const validateGender = (value) => {
    if (value === "") {
      setGenderError("required");
    } else {
      setGenderError("");
    }
  };

  const validatePhone = (value) => {
    if (value === "") {
      setPhoneError("required");
    } else {
      setPhoneError("");
    }
  };

  const validateEmail = (value) => {
    if (value === "") {
      setEmailError("required");
    } else {
      setEmailError("");
    }
  };

  const validateAddress = (value) => {
    if (value === "") {
      setAddressError("required");
    } else {
      setAddressError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate all fields
    validateFullName(fullname);
    validateAge(age);
    validateGender(gender);
    validatePhone(phone);
    validateEmail(email);
    validateAddress(address);

    // Check for errors directly from current values
    const hasErrors =
      !fullname.trim() ||
      !age.trim() ||
      !gender.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !address.trim() ||
      fullNameError ||
      ageError ||
      genderError ||
      phoneError ||
      emailError ||
      addressError;

    if (hasErrors) {
      setLoading(false);
      return;
    }

    try {
      const result = await create_Patient(
        fullname,
        age,
        gender,
        phone,
        email,
        address
      );

      console.log("API Response:", result); // Debug log

      if (result && result.record) {
        // Reset form
        setFullname("");
        setAge("");
        setGender("");
        setPhone("");
        setEmail("");
        setAddress("");
        navigate("/user_account/dashboard?update=success");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-4">
      <div className="relative w-full h-full tablet:w-auto tablet:h-auto overflow-y-auto">
        <h2 className="text-lg font-semibold mt-4 mb-8 text-center">
          Patient's record
        </h2>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="grid grid-cols-1 gap-8 px-4 tablet:grid-cols-2">
            {/* Full Name */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="fullname" className="font-secondary">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="Enter fullname"
                value={fullname}
                onChange={(e) => {
                  setFullname(e.target.value);
                  validateFullName(e.target.value);
                }}
                onBlur={(e) => validateFullName(e.target.value)}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
              />
              {fullNameError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {fullNameError}
                </div>
              )}
            </div>

            {/* Age */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="age" className="font-secondary">
                Age
              </label>
              <input
                type="number"
                name="age"
                placeholder="Enter age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  validateAge(e.target.value);
                }}
                onBlur={(e) => validateAge(e.target.value)}
                maxLength={2}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              {ageError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {ageError}
                </div>
              )}
            </div>

            {/* Gender */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="gender" className="font-secondary">
                Gender
              </label>
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                onBlur={(e) => validateGender(e.target.value)}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2 w-full font-primary"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {genderError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {genderError}
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="phone" className="font-secondary">
                Phone
              </label>
              <input
                type="number"
                name="phone"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  validatePhone(e.target.value);
                }}
                onBlur={(e) => validatePhone(e.target.value)}
                maxLength={11}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              {phoneError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {phoneError}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="email" className="font-secondary">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                onBlur={(e) => validateEmail(e.target.value)}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
              />
              {emailError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {emailError}
                </div>
              )}
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="address" className="font-secondary">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  validateAddress(e.target.value);
                }}
                onBlur={(e) => validateAddress(e.target.value)}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
              />
              {addressError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {addressError}
                </div>
              )}
            </div>

            {/* Photo Upload 
            <div className="flex flex-col">
              <span className="mb-4 font-secondary">Add patient's photo</span>
              <div>
                <label className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer">
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <span className="ml-2 text-gray-300">
                  {selectedFile ? selectedFile.name : "No file chosen"}
                </span>
              </div>
               {errors.photo && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {errors.photo}
                </div>
              )} 
            </div>
            */}
          </div>

          <div className="flex justify-center mt-8">
            {loading ? (
              <button className="w-full cursor-not-allowed bg-text text-white text-lg font-semibold p-3 rounded-3xl mt-3 flex justify-center">
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
                onClick={() =>
                  navigate("/user_account/dashboard?update=success")
                }
                className="bg-text hover:bg-primary w-full rounded-2xl p-4 text-white mt-2 font-secondary cursor-pointer"
              >
                Add Patient
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Addpatient;
