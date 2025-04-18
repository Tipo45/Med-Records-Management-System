import React from "react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TiArrowLeft } from "react-icons/ti";
import {  useSinglePatient } from "../../hooks/usePatient";

const Patientinformation = ({ id }) => {
   

const { data: patient, isLoading, isError } = useSinglePatient(id);

console.log("Patient Data:", patient);

  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  if (isError || !patient) {
    return (
      <div className="text-center p-8 text-red-500 bg-red-50 rounded-lg">
        Failed to load patient data. Please try again later.
      </div>
    );
  }

  return (
    <section className="p-4">
      <Link to="/user_account/dashboard">
        <TiArrowLeft className="text-2xl bg-primary text-white rounded-2xl transition-all duration-300 hover:-translate-x-1" />
      </Link>

     
  <div
    key={patient.id}
    className="bg-white rounded-xl shadow-md overflow-hidden mb-6 grid grid-cols-1 gap-4 p-4"
  >
    {/* Patient Basic Info */}
    <div className="col-span-1">
      <h1 className="text-2xl font-bold text-gray-800 mb-2 capitalize font-secondary">
        {patient.fullname}
      </h1>
      {patient.upload && (
    <img
      // src={`http://127.0.0.1:8090/api/files/patients/${patient.id}/${patient.upload}`}
      src={`https://service-konnect.pockethost.io/api/files/patients/${patient.id}/${patient.upload}`}
      alt="Patient"
      className="w-32 h-32 object-cover rounded-full mb-4 border"
    />
  )}
      <div className="flex flex-wrap gap-4">
        <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-primary">
          Date of Birth: {patient.dateOfBirth}
        </div>
        <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-primary capitalize">
          Gender: {patient.gender}
        </div>
      </div>
    </div>

    {/* Contact Info */}
    <div className="space-y-2">
      <h2 className="font-semibold text-gray-700 font-secondary">Contact</h2>
      <div className="text-gray-600 font-primary">{patient.phone}</div>
      <div className="text-gray-600 font-primary text-sm truncate">{patient.email}</div>
      <div className="text-gray-600 font-primary capitalize text-sm">
        {patient.address}
      </div>
    </div>

    {/* Medical Info */}
    <div className="space-y-2">
      <h2 className="font-semibold text-gray-700 font-secondary">Medical</h2>
      <div className="text-gray-600 capitalize font-primary">
        Genotype: {patient.genotype}
      </div>
      <div className="text-gray-600 font-primary">BP: {patient.bloodPressure} mmHg</div>
      <div className="text-gray-600 font-primary">Temp: {patient.temp} °C</div>
      <div className="text-gray-600 font-primary">Pulse: {patient.pulse} bpm</div>
    </div>

    {/* Visit Info */}
    <div className="space-y-2">
      <h2 className="font-semibold text-gray-700 font-secondary">Visits</h2>
      <div className="text-gray-600 font-primary">Last: {patient.lastVisit}</div>
      <div className="text-gray-600 font-primary">Next: {patient.nextVisit}</div>
      <div className="text-gray-600 font-primary capitalize truncate">
        Medications: {patient.medications}
      </div>
    </div>

    {/* Emergency Contact */}
    <div className="space-y-2 sm:col-span-2">
      <h2 className="font-semibold text-gray-700 font-secondary">Emergency Contact</h2>
      <div className="text-gray-600 capitalize font-primary">
        {patient.emergencyName}
      </div>
      <div className="text-gray-600 capitalize font-primary">
        {patient.emergencyRelation}
      </div>
      <div className="text-gray-600 font-primary">{patient.emergencyNumber}</div>
    </div>
  </div>


    </section>
  );
};

export default Patientinformation;
