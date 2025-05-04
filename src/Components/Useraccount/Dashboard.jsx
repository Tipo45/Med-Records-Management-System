import { FaPlus, FaSpinner, FaSearch, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usePatients } from "../../hooks/usePatient";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { data, isLoading, isError, error } = usePatients();

  // Filter patients whenever searchTerm or data changes
  useEffect(() => {
    if (!data) return;
    
    if (!searchTerm) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(
      (patient) =>
        patient.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.patientID?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const toggleAdd = () => {
    navigate("/user_account/add-patient");
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Toast notifications
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const toastConfig = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    if (searchParams.get("login") === "success") {
      toast.success("Successful login!", toastConfig);
    }

    if (searchParams.get("update") === "success") {
      toast.success("Successfully added!", toastConfig);
    }

    if (searchParams.get("delete") === "true") {
      toast.success("Successfully deleted!", toastConfig);
    }

    const cleanUrl = window.location.origin + window.location.pathname;
    const timer = setTimeout(() => {
      window.history.replaceState({}, document.title, cleanUrl);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error loading patients: {error?.message}</p>
      </div>
    );
  }

  return (
    <section>
      <ToastContainer />
      <div className="bg-gray-200 p-4 rounded-2xl">
        {/* Search Bar */}
        <div className="mb-4 relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search patients by name or ID..."
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label="Clear search"
            >
              <FaTimes className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-primary" />
          </div>
        ) : (
          <div className="grid gap-2 grid-cols-1 tablet:grid-cols-2 xl:grid-cols-3">
            {!filteredData.length ? (
              <div className="text-center py-12 col-span-full">
                <p className="text-gray-500">
                  {searchTerm
                    ? "No matching patients found"
                    : "No patient records available"}
                </p>
                {!searchTerm && (
                  <button
                    onClick={toggleAdd}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    <FaPlus className="inline mr-2" />
                    Add First Patient
                  </button>
                )}
              </div>
            ) : (
              <>
                {filteredData.map((record) => (
                  <div key={record.id} className="h-full">
                    <button
                      onClick={() =>
                        navigate(`/user_account/patient-information/${record.id}`)
                      }
                      className="w-full cursor-pointer bg-gray-300 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col space-y-2 items-center justify-center h-40 px-2"
                    >
                      <h1 className="text-lg font-primary capitalize">{record.fullname}</h1>
                      <p className="font-primary font-medium">{record.patientID}</p>
                      <span className="flex justify-center bg-text hover:bg-primary w-full rounded-2xl p-4 text-white mt-2 font-secondary">
                        View Record
                      </span>
                    </button>
                  </div>
                ))}
                <button
                  onClick={toggleAdd}
                  className="w-full cursor-pointer bg-gray-300 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col space-y-2 items-center justify-center h-30"
                >
                  <FaPlus className="text-2xl text-deep-teal" />
                  <p className="text-sm font-primary">Add patient record</p>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;