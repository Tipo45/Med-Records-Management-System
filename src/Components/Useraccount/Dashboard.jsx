import { FaPlus, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usePatients } from "../../hooks/usePatient";

const Dashboard = () => {
  const navigate = useNavigate();
  const toggleAdd = () => {
    navigate("/user_account/add-patient");
  };
  const [selectedPatient, setSelectedPatient] = useState(null);

  const { data, isLoading, isError, error } = usePatients();

  console.log("Patients Data:", data);
  console.log("Is loading?", isLoading);
  console.log("Error?", isError, error);

  const handleViewRecord = (patient) => {
    setSelectedPatient(patient);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.get("registered") === "true") {
      toast.success("Successfully registered!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }, 5000);
    }

    if (searchParams.get("login") === "success") {
      toast.success("Successful login!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }, 500);
    }

    if (searchParams.get("update") === "success") {
      toast.success("Successfully added!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }, 500);
    }

    if (searchParams.get("delete") === "true") {
      toast.success("Successfully deleted!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }, 500);
    }

  }, []);
  return (
    <section>
      <ToastContainer />
      <div className="bg-gray-200 p-4 rounded-2xl">
        <div className="grid gap-2 grid-cols-1 tablet:grid-cols-2 xl:grid-cols-3">
          {!data?.length && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No patient&apos;s record available
              </p>
            </div>
          )}
          {data?.map((record) => (
            <div key={record.id} className="">
              <button
                onClick={() => handleViewRecord(record)}
                className="w-full cursor-pointer bg-gray-300 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col space-y-2 items-center justify-center h-30 px-2"
              >
                <h1 className="text-lg font-primary">{record.fullname}</h1>
                <span className="bg-text hover:bg-primary w-full rounded-2xl p-4 text-white mt-2 font-secondary">
                  View Record
                </span>
              </button>
            </div>
          ))}

          {selectedPatient && (
            <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                {/* Close button */}
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="absolute top-4 right-4 cursor-pointer text-white bg-text rounded-full w-10 h-10 text-2xl"
                >
                  <FaTimes className="text-lg inline-flex items-center" />
                </button>

                {/* Patient details */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold border-b pb-2 capitalize">
                    {selectedPatient.fullname}
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-medium text-gray-600">Age</label>
                      <p className="mt-1">{selectedPatient.age}</p>
                    </div>

                    <div>
                      <label className="font-medium text-gray-600">
                        Gender
                      </label>
                      <p className="mt-1 capitalize">
                        {selectedPatient.gender}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <label className="font-medium text-gray-600">Phone</label>
                      <p className="mt-1">{selectedPatient.phone}</p>
                    </div>

                    <div className="col-span-2">
                      <label className="font-medium text-gray-600">Email</label>
                      <p className="mt-1">{selectedPatient.email}</p>
                    </div>

                    <div className="col-span-2">
                      <label className="font-medium text-gray-600">
                        Address
                      </label>
                      <p className="mt-1 capitalize">
                        {selectedPatient.address}
                      </p>
                    </div>
                  </div>

                  {selectedPatient.photo && (
                    <div className="mt-4">
                      <label className="font-medium text-gray-600">
                        Patient Photo
                      </label>
                      <div className="mt-2">
                        <img
                          src={selectedPatient.photo}
                          alt="Patient"
                          className="mx-auto h-48 object-contain rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
              </div>
            </div>
          )}

          <button
            onClick={toggleAdd}
            className="w-full cursor-pointer bg-gray-300 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col space-y-2 items-center justify-center h-30"
          >
            <FaPlus className="text-2xl text-deep-teal" />
            <p className="text-sm font-primary">Add patient's record</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
