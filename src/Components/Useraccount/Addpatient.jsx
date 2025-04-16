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
  const [upload, setUpload] = useState("");
  const [genotype, setGenotype] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [temp, setTemp] = useState("");
  const [pulse, setPulse] = useState("");
  const [medications, setMedications] = useState("");
  const [lastVisit, setLastVisit] = useState("");
  const [nextVisit, setNextVisit] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyRelation, setEmergencyRelation] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");
  const [fullNameError, setFullnameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [genotypeError, setGenotypeError] = useState("");
  const [bloodPressureError, setBloodPressureError] = useState("");
  const [tempError, setTempError] = useState("");
  const [pulseError, setPulseError] = useState("");
  const [medicationsError, setMedicationsError] = useState("");
  const [lastVisitError, setLastVisitError] = useState("");
  const [nextVisitError, setNextVisitError] = useState("");
  const [emergencyNameError, setEmergencyNameError] = useState("");
  const [emergencyRelationError, setEmergencyRelationError] = useState("");
  const [emergencyNumberError, setEmergencyNumberError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
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
      setSelectedFile
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

  const validateUpload = (value) => {
    if (!value) {
      setUploadError("select an image");
    } else {
      setUploadError("");
    }
  }

  const validateGenotype = (value) => {
    if (value === "") {
      setGenotypeError("required");
    } else {
      setGenotypeError("");
    }
  };

  const validateBloodPressure = (value) => {
    if (value === "") {
      setBloodPressureError("required");
    } else {
      setBloodPressureError("");
    }
  };

  const validateTemp = (value) => {
    if (value === "") {
      setTempError("required");
    } else {
      setTempError("");
    }
  };

  const validatePulse = (value) => {
    if (value === "") {
      setPulseError("required");
    } else {
      setPulseError("");
    }
  };

  const validateMedications = (value) => {
    if (value === "") {
      setMedicationsError("required");
    } else {
      setMedicationsError("");
    }
  };

  const validateLastVisit = (value) => {
    if (value === "") {
      setLastVisitError("required");
    } else {
      setLastVisitError("");
    }
  };

  const validateNextVisit = (value) => {
    if (value === "") {
      setNextVisitError("required");
    } else {
      setNextVisitError("");
    }
  };

  const validateEmergencyName = (value) => {
    if (value === "") {
      setEmergencyNameError("required");
    } else {
      setEmergencyNameError("");
    }
  };

  const validateEmergencyRelation = (value) => {
    if (value === "") {
      setEmergencyRelationError("required");
    } else {
      setEmergencyRelationError("");
    }
  };

  const validateEmergencyNumber = (value) => {
    if (value === "") {
      setEmergencyNumberError("required");
    } else {
      setEmergencyNumberError("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file);
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
    validateGenotype(genotype);
    validateBloodPressure(bloodPressure);
    validateTemp(temp);
    validatePulse(pulse);
    validateMedications(medications);
    validateLastVisit(lastVisit);
    validateNextVisit(nextVisit);
    validateEmergencyName(emergencyName);
    validateEmergencyRelation(emergencyRelation);
    validateEmergencyNumber(emergencyNumber);

    // Check for errors directly from current values
    const hasErrors =
      !fullname.trim() ||
      !age.trim() ||
      !gender.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !address.trim() ||
      !genotype.trim() ||
      !bloodPressure.trim() ||
      !temp.trim() ||
      !pulse.trim() ||
      !lastVisit.trim() ||
      !nextVisit.trim() ||
      !medications.trim() ||
      !emergencyName.trim() ||
      !emergencyRelation.trim() ||
      !emergencyNumber.trim() ||
      fullNameError ||
      ageError ||
      genderError ||
      phoneError ||
      emailError ||
      addressError ||
      genotypeError ||
      bloodPressureError ||
      tempError ||
      pulseError ||
      lastVisitError ||
      nextVisitError ||
      medicationsError ||
      emergencyNameError ||
      emergencyRelationError ||
      emergencyNumberError;

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
        address,
        genotype,
        bloodPressure,
        temp,
        pulse,
        lastVisit,
        nextVisit,
        medications,
        emergencyName,
        emergencyRelation,
        emergencyNumber
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
        setGenotype("");
        setBloodPressure("");
        setTemp("");
        setPulse("");
        setLastVisit("");
        setNextVisit("");
        setMedications("");
        setEmergencyName("");
        setEmergencyRelation("");
        setEmergencyNumber("");
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
      <div className="relative w-full h-full tablet:w-auto tablet:h-auto overflow-y-auto mb-5">
        <h2 className="text-2xl font-semibold mt-4 mb-8 text-center">
          Patient's record
        </h2>

        <form onSubmit={(e) => handleSubmit(e)}>
          <h4 className="font-primary font-bold text-xl mb-4 pl-4">
            Personal Information
          </h4>
          <section className="grid grid-cols-1 gap-8 px-4 tablet:grid-cols-2">
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
                Date of Birth
              </label>
              <input
                type="date"
                name="age"
                placeholder="Enter date of birth"
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
                placeholder="enter address"
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

            Photo Upload 
            <div className="flex flex-col">
              <span className="mb-4 font-secondary">Add patient's photo</span>
              <div>
                <label className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer">
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    value={upload}
                    onChange={handleFileChange}
                  />
                </label>
                <span className="ml-2 text-gray-300">
                  {selectedFile ? selectedFile.name : "No file chosen"}
                </span>
              </div>
               {uploadError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {uploadError}
                </div>
              )} 
            </div>
           
          </section>

          <h4 className="font-primary font-bold text-xl mb-4 mt-8 pl-4">
            Medical Information
          </h4>
          <section className="grid grid-cols-1 gap-8 px-4 tablet:grid-cols-2">
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="genotype" className="font-secondary">
                Genotype
              </label>
              <select
                name="bloodtype"
                value={genotype}
                onChange={(e) => setGenotype(e.target.value)}
                onBlur={(e) => validateGenotype(e.target.value)}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2 w-full font-primary"
              >
                <option value="">Select gender</option>
                <option value="o+">O+</option>
                <option value="o-">O-</option>
                <option value="a-">A-</option>
                <option value="a+">A+</option>
                <option value="b+">B+</option>
                <option value="b-">B-</option>
                <option value="ab-">AB-</option>
                <option value="ab+">AB+</option>
              </select>
              {genotypeError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {genotypeError}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="bloodpressure" className="font-secondary">
                Blood Pressure
              </label>
              <input
                type="text"
                placeholder="enter value"
                name="bloodpressure"
                value={bloodPressure}
                onChange={(e) => {
                  setBloodPressure(e.target.value);
                  validateBloodPressure(e.target.value);
                }}
                onBlur={(e) => validateBloodPressure(e.target.value)}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
              />
              {bloodPressureError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {bloodPressureError}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="temperature" className="font-secondary">
                Temperature
              </label>
              <input
                type="text"
                placeholder="enter value"
                name="temperature"
                value={temp}
                onChange={(e) => {
                  setTemp(e.target.value);
                  validateTemp(e.target.value);
                }}
                onBlur={(e) => validateTemp(e.target.value)}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
              />
              {tempError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {tempError}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="pulse" className="font-secondary">
                Pulse
              </label>
              <input
                type="text"
                placeholder="enter value"
                name="pulse"
                value={pulse}
                onChange={(e) => {
                  setPulse(e.target.value);
                  validatePulse(e.target.value);
                }}
                onBlur={(e) => validatePulse(e.target.value)}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
              />
              {pulseError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {pulseError}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="lastvisit" className="font-secondary">
                Last Visit
              </label>
              <input
                type="date"
                name="lastvisit"
                value={lastVisit}
                onChange={(e) => {
                  setLastVisit(e.target.value);
                  validateLastVisit(e.target.value);
                }}
                onBlur={(e) => validateLastVisit(e.target.value)}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
              />
              {lastVisitError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {lastVisitError}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="nextvisit" className="font-secondary">
                Next Visit
              </label>
              <input
                type="date"
                name="nextvisit"
                value={nextVisit}
                onChange={(e) => {
                  setNextVisit(e.target.value);
                  validateNextVisit(e.target.value);
                }}
                onBlur={(e) => validateNextVisit(e.target.value)}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
              />
              {nextVisitError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {nextVisitError}
                </div>
              )}
            </div>
          </section>

          <div className="grid grid-cols-1 gap-2 px-4 mt-4">
            <label htmlFor="medications" className="font-secondary">
              Medications
            </label>
            <textarea
              placeholder="enter medication"
              name="medications"
              value={medications}
              onChange={(e) => {
                setMedications(e.target.value);
                validateMedications(e.target.value);
              }}
              onBlur={(e) => validateMedications(e.target.value)}
              className="h-30 outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
            />
            {medicationsError && (
              <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                {medicationsError}
              </div>
            )}
          </div>

          <h4 className="font-primary font-bold text-xl mb-4 mt-8 pl-4">
            Emergency Contact Information
          </h4>

          <section className="grid grid-cols-1 gap-8 px-4 tablet:grid-cols-2">
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="emergenc o" className="font-secondary">
                Name
              </label>
              <input
                type="text"
                placeholder="enter name"
                name="emergencyname"
                value={emergencyName}
                onChange={(e) => {
                  setEmergencyName(e.target.value);
                  validateEmergencyName(e.target.value);
                }}
                onBlur={(e) => validateEmergencyName(e.target.value)}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
              />
              {emergencyNameError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {emergencyNameError}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="emergencyrelationship" className="font-secondary">
                Relationship
              </label>
              <input
                type="text"
                placeholder="enter relationship"
                name="emergencyrelation"
                value={emergencyRelation}
                onChange={(e) => {
                  setEmergencyRelation(e.target.value);
                  validateEmergencyRelation(e.target.value);
                }}
                onBlur={(e) => validateEmergencyRelation(e.target.value)}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
              />
              {emergencyRelationError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {emergencyRelationError}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="emergencynumber" className="font-secondary">
                Phone
              </label>
              <input
                type="number"
                placeholder="enter phone number"
                name="emergencynumber"
                value={emergencyNumber}
                onChange={(e) => {
                  setEmergencyNumber(e.target.value);
                  validateEmergencyNumber(e.target.value);
                }}
                onBlur={(e) => validateEmergencyNumber(e.target.value)}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              {emergencyNumberError && (
                <div className="text-red-500 p-2 bg-gray-200 rounded-xl font-medium mt-1 mb-1">
                  {emergencyNumberError}
                </div>
              )}
            </div>
          </section>

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
