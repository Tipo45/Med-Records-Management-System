import React from "react";
import { usePatients } from "../../hooks/usePatient";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TiArrowLeft } from "react-icons/ti";

const Patientinformation = () => {
  const { data, isLoading, isError } = usePatients();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  if (isError) {
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
      {data?.map((record) => (
        <div
          key={record.id}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-6
            grid grid-cols-1 gap-4 p-4"
        >
          {/* Patient Basic Info */}
          <div className="col-span-1">
            <h1 className="text-2xl font-bold text-gray-800 mb-2 capitalize font-secondary">
              {record.fullname}
            </h1>
            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-primary">
                Date of Birth: {record.age}
              </div>
              <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-primary capitalize">
                Gender: {record.gender}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <h2 className="font-semibold text-gray-700 font-secondary">Contact</h2>
            <div className="text-gray-600 font-primary">{record.phone}</div>
            <div className="text-gray-600 font-primary text-sm truncate">{record.email}</div>
            <div className="text-gray-600 font-primary capitalize text-sm">
              {record.address}
            </div>
          </div>

          {/* Medical Info */}
          <div className="space-y-2">
            <h2 className="font-semibold text-gray-700 font-secondary">Medical</h2>
            <div className="text-gray-600 capitalize font-primary">
              Genotype: {record.genotype}
            </div>
            <div className="text-gray-600 font-primary">BP: {record.bloodPressure} mmHg</div>
            <div className="text-gray-600 font-primary">Temp: {record.temp} °C</div>
            <div className="text-gray-600 font-primary">Pulse: {record.pulse} bpm</div>
          </div>

          {/* Visit Info */}
          <div className="space-y-2">
            <h2 className="font-semibold text-gray-700 font-secondary">Visits</h2>
            <div className="text-gray-600 font-primary">Last: {record.lastVisit}</div>
            <div className="text-gray-600 font-primary">Next: {record.nextVisit}</div>
            <div className="text-gray-600 font-primary capitalize truncate">
              Medications: {record.medications}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-2 sm:col-span-2">
            <h2 className="font-semibold text-gray-700 font-secondary">Emergency Contact</h2>
            <div className="text-gray-600 capitalize font-primary">
              {record.emergencyName}
            </div>
            <div className="text-gray-600 capitalize font-primary">
              {record.emergencyRelation}
            </div>
            <div className="text-gray-600 font-primary">{record.emergencyNumber}</div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Patientinformation;
