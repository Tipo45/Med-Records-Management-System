import { FaPlus, FaSpinner } from "react-icons/fa";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usePatients } from "../../hooks/usePatient";

const Dashboard = () => {
  const navigate = useNavigate();
  const toggleAdd = () => {
    navigate("/user_account/add-patient");
  };

  const { data, isLoading, isError, error } = usePatients();

  console.log("Patients Data:", data);
  console.log("Is loading?", isLoading);
  console.log("Error?", isError, error);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

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
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-primary" />
          </div>
        ) : (
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
                  onClick={() => navigate(`/user_account/patient-information/${record.id}`)}
                  className="w-full cursor-pointer bg-gray-300 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col space-y-2 items-center justify-center h-30 px-2"
                >
                  <h1 className="text-lg font-primary">{record.fullname}</h1>
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
              <p className="text-sm font-primary">Add patient's record</p>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
