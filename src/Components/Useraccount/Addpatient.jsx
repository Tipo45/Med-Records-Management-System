import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { create_Patient } from "../../lib/pocketbase";
import { useQueryClient } from "@tanstack/react-query";

const Addpatient = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    upload: null,
    genotype: "",
    bloodPressure: "",
    temp: "",
    pulse: "",
    medications: "",
    lastVisit: "",
    nextVisit: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyNumber: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  // Validate all required fields, including photo and all text/select fields
  const validateField = useCallback((name, value) => {
    let error = "";

    if (name === "upload") {
      if (!value) {
        error = "Photo is required";
      } else if (value && value.type && !value.type.startsWith("image/")) {
        error = "Only image files are allowed";
      }
    } else if (!value || (typeof value === "string" && !value.trim())) {
      error = "Required field";
    } else if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      error = "must be a valid email address";
    } else if (name === "phone" && !/^\d{10,15}$/.test(value)) {
      error = "Phone number must be 10-15 digits";
    } else if (name === "dateOfBirth" && new Date(value) > new Date()) {
      error = "Date cannot be in the future";
    } else if (name === "nextVisit" && new Date(value) < new Date()) {
      error = "Next visit must be in the future";
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  }, []);

  // Validate all fields on submit
  const validateAllFields = () => {
    let valid = true;
    Object.entries(formData).forEach(([name, value]) => {
      if (!validateField(name, value)) valid = false;
    });
    return valid;
  };

  const handleBlur = (e) => {
    const { name, value, files } = e.target;
    if (name === "upload") {
      validateField(name, files && files[0]);
    } else {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const valid = validateAllFields();
    if (!valid) {
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("dateOfBirth", formData.dateOfBirth);
    data.append("gender", formData.gender);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("address", formData.address);
    data.append("upload", formData.upload);
    data.append("genotype", formData.genotype);
    data.append("bloodPressure", formData.bloodPressure);
    data.append("temp", formData.temp);
    data.append("pulse", formData.pulse);
    data.append("lastVisit", formData.lastVisit);
    data.append("nextVisit", formData.nextVisit);
    data.append("medications", formData.medications);
    data.append("emergencyName", formData.emergencyName);
    data.append("emergencyRelation", formData.emergencyRelation);
    data.append("emergencyNumber", formData.emergencyNumber);

    try {
      const result = await create_Patient(data);

      if (result) {
        setFormData({
          fullname: "",
          dateOfBirth: "",
          gender: "",
          phone: "",
          email: "",
          address: "",
          upload: null,
          genotype: "",
          bloodPressure: "",
          temp: "",
          pulse: "",
          medications: "",
          lastVisit: "",
          nextVisit: "",
          emergencyName: "",
          emergencyRelation: "",
          emergencyNumber: ""
        });
        setErrors({});
         queryClient.invalidateQueries({ queryKey: ["patients"] });
        setTimeout(() => {
          navigate("/user_account/dashboard?update=success");
        }, 0);
      }
    } catch (error) {
      // Map backend field errors to form fields if available
      const apiErrors = error.response?.data;
      if (apiErrors && typeof apiErrors === "object") {
        setErrors(prev => ({ ...prev, ...apiErrors }));
      } else {
        setErrors(prev => ({
          ...prev,
          form: error.response?.data?.message || "Failed to submit patient data"
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-4">
      <div className="relative w-full h-full tablet:w-auto tablet:h-auto overflow-y-auto mb-5">
        <h2 className="text-2xl font-semibold mt-4 mb-8 text-center">
          Patient's Record
        </h2>

        {errors.form && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mx-4">
            <p>{errors.form}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <h4 className="font-primary font-bold text-xl mb-4 pl-4">
            Personal Information
          </h4>
          <section className="grid grid-cols-1 gap-8 px-4 tablet:grid-cols-2">
            {/* Full Name */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="fullname" className="font-secondary">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="Enter full name"
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                onBlur={handleBlur}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                required
              />
              {errors.fullname && (
                <div className="text-red-500 text-sm mt-1">{errors.fullname}</div>
              )}
            </div>

            {/* Date of Birth */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="dateOfBirth" className="font-secondary">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                onBlur={handleBlur}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                required
              />
              {errors.dateOfBirth && (
                <div className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</div>
              )}
            </div>

            {/* Gender */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="gender" className="font-secondary">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                onBlur={handleBlur}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2 w-full font-primary"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <div className="text-red-500 text-sm mt-1">{errors.gender}</div>
              )}
            </div>

            {/* Phone */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="phone" className="font-secondary">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                onBlur={handleBlur}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                required
              />
              {errors.phone && (
                <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
              )}
            </div>

            {/* Email */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="email" className="font-secondary">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onBlur={handleBlur}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                required
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="address" className="font-secondary">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                onBlur={handleBlur}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                required
              />
              {errors.address && (
                <div className="text-red-500 text-sm mt-1">{errors.address}</div>
              )}
            </div>

            {/* Photo Upload */}
            <div className="grid grid-cols-1 gap-2">
              <label className="font-secondary">
                Patient Photo <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <label className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 transition">
                  Choose File
                  <input
                    type="file"
                    name="upload"
                    id="upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      setFormData({ ...formData, upload: e.target.files[0] });
                      validateField("upload", e.target.files[0]);
                    }}
                    onBlur={handleBlur}
                  />
                </label>
                <span className="ml-3">
                  {formData.upload && formData.upload.name}
                </span>
              </div>
              {errors.upload && (
                <div className="text-red-500 text-sm mt-1">{errors.upload}</div>
              )}
            </div>
          </section>

          {/* Medical Information */}
          <h4 className="font-primary font-bold text-xl mb-4 mt-8 pl-4">
            Medical Information
          </h4>
          <section className="grid grid-cols-1 gap-8 px-4 tablet:grid-cols-2">
            {/* Genotype */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="genotype" className="font-secondary">
                Blood Group <span className="text-red-500">*</span>
              </label>
              <select
                name="genotype"
                value={formData.genotype}
                onChange={(e) => setFormData({ ...formData, genotype: e.target.value })}
                onBlur={handleBlur}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2 w-full font-primary"
                required
              >
                <option value="">Select blood group</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A-">A-</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB-">AB-</option>
                <option value="AB+">AB+</option>
              </select>
              {errors.genotype && (
                <div className="text-red-500 text-sm mt-1">{errors.genotype}</div>
              )}
            </div>

            {/* Blood Pressure */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="bloodPressure" className="font-secondary">
                Blood Pressure <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="bloodPressure"
                placeholder="e.g. 120/80"
                value={formData.bloodPressure}
                onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
                onBlur={handleBlur}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                required
              />
              {errors.bloodPressure && (
                <div className="text-red-500 text-sm mt-1">{errors.bloodPressure}</div>
              )}
            </div>

            {/* Temperature */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="temp" className="font-secondary">
                Temperature (°C) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="temp"
                placeholder="e.g. 36.5"
                value={formData.temp}
                onChange={(e) => setFormData({ ...formData, temp: e.target.value })}
                onBlur={handleBlur}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                required
              />
              {errors.temp && (
                <div className="text-red-500 text-sm mt-1">{errors.temp}</div>
              )}
            </div>

            {/* Pulse */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="pulse" className="font-secondary">
                Pulse (bpm) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pulse"
                placeholder="e.g. 72"
                value={formData.pulse}
                onChange={(e) => setFormData({ ...formData, pulse: e.target.value })}
                onBlur={handleBlur}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                required
              />
              {errors.pulse && (
                <div className="text-red-500 text-sm mt-1">{errors.pulse}</div>
              )}
            </div>

            {/* Last Visit */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="lastVisit" className="font-secondary">
                Last Visit Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="lastVisit"
                value={formData.lastVisit}
                onChange={(e) => setFormData({ ...formData, lastVisit: e.target.value })}
                onBlur={handleBlur}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                required
              />
              {errors.lastVisit && (
                <div className="text-red-500 text-sm mt-1">{errors.lastVisit}</div>
              )}
            </div>

            {/* Next Visit */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="nextVisit" className="font-secondary">
                Next Visit Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="nextVisit"
                value={formData.nextVisit}
                onChange={(e) => setFormData({ ...formData, nextVisit: e.target.value })}
                onBlur={handleBlur}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                required
              />
              {errors.nextVisit && (
                <div className="text-red-500 text-sm mt-1">{errors.nextVisit}</div>
              )}
            </div>
          </section>

          {/* Medications */}
          <div className="grid grid-cols-1 gap-2 px-4 mt-4">
            <label htmlFor="medications" className="font-secondary">
              Current Medications <span className="text-red-500">*</span>
            </label>
            <textarea
              name="medications"
              placeholder="List all current medications and dosages"
              value={formData.medications}
              onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
              onBlur={handleBlur}
              rows="5"
              className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
              required
            />
            {errors.medications && (
              <div className="text-red-500 text-sm mt-1">{errors.medications}</div>
            )}
          </div>

          {/* Emergency Contact */}
          <h4 className="font-primary font-bold text-xl mb-4 mt-8 pl-4">
            Emergency Contact Information
          </h4>
          <section className="grid grid-cols-1 gap-8 px-4 tablet:grid-cols-2">
            {/* Emergency Name */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="emergencyName" className="font-secondary">
                Emergency Contact Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="emergencyName"
                placeholder="Enter full name"
                value={formData.emergencyName}
                onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                onBlur={handleBlur}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                required
              />
              {errors.emergencyName && (
                <div className="text-red-500 text-sm mt-1">{errors.emergencyName}</div>
              )}
            </div>

            {/* Emergency Relation */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="emergencyRelation" className="font-secondary">
                Relationship to Patient <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="emergencyRelation"
                placeholder="e.g. Spouse, Parent"
                value={formData.emergencyRelation}
                onChange={(e) => setFormData({ ...formData, emergencyRelation: e.target.value })}
                onBlur={handleBlur}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                required
              />
              {errors.emergencyRelation && (
                <div className="text-red-500 text-sm mt-1">{errors.emergencyRelation}</div>
              )}
            </div>

            {/* Emergency Number */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="emergencyNumber" className="font-secondary">
                Emergency Contact Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="emergencyNumber"
                placeholder="Enter phone number"
                value={formData.emergencyNumber}
                onChange={(e) => setFormData({ ...formData, emergencyNumber: e.target.value })}
                onBlur={handleBlur}
                className="outline-1 outline-primary hover:outline-secondary focus:outline-secondary rounded-2xl p-2"
                required
              />
              {errors.emergencyNumber && (
                <div className="text-red-500 text-sm mt-1">{errors.emergencyNumber}</div>
              )}
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-center mt-8 mb-8">
            <button
              type="submit"
              disabled={loading}
              className={`w-full max-w-md rounded-2xl p-4 text-white mt-2 font-secondary ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-text hover:bg-primary cursor-pointer"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Processing...
                </span>
              ) : (
                "Add Patient"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Addpatient;