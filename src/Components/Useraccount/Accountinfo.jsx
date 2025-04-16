import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkVerifyStatus, deleteAccount } from "../../lib/pocketbase";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDoctorData } from "../../hooks/useDoctorData";
import { VscVerifiedFilled } from "react-icons/vsc";
import { MdErrorOutline } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

const Accountinfo = () => {
  const { data: userData } = useDoctorData();
  const navigate = useNavigate();
  const userRole = userData?.role;

  const toggleConfirm = () => {
    alert("confirmation link sent");
  };

  const [isVerified, setIsVerified] = useState(null); // null means "still checking"

  useEffect(() => {
    const fetchStatus = async () => {
      const status = await checkVerifyStatus();
      setIsVerified(status);
    };
    fetchStatus();
  }, []);

  return (
    <section>
      <div className="bg-text p-4 rounded-lg">
        <div className="text-center mt-2">
          <h1 className="text-2xl font-bold font-primary text-white">
            Account Information
          </h1>
        </div>
        <section className="grid grid-cols-1 gap-4 tablet:grid-cols-2 mt-8">
          <div
            className="bg-gray-300 p-4 rounded-2xl"
            data-aos="zoom-in-right"
            data-aos-delay="500"
            data-aos-duration="1000"
          >
            <span className="text-lg font-semibold font-secondary">
              Full Name:
            </span>
            <span className="block mt-2 text-lg font-bold font-primary text-gray-600 capitalize">
              {userRole === "Dr" ? "Dr." : "Nurse"} {userData?.firstname}{" "}
              {userData?.lastname}
            </span>
          </div>

          <div
            className="bg-gray-300 p-4 rounded-2xl"
            data-aos="zoom-in-right"
            data-aos-delay="500"
            data-aos-duration="1000"
          >
            <span className="text-lg font-semibold font-secondary">Email:</span>
            <span className="block mt-2 text-lg font-bold font-primary text-gray-600">
              {userData?.email}
            </span>
          </div>

          <div>
            <div
              className="bg-gray-300 p-4 rounded-2xl"
              data-aos="zoom-in-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h1 className="text-lg font-semibold font-secondary">
                Verification Status:
              </h1>

              <div className="block mt-2 text-lg font-bold font-primary">
  {isVerified === null ? (
    <span className="flex items-center text-gray-600">
      <FaSpinner className="animate-spin mr-2" />
      Checking verification status...
    </span>
  ) : isVerified ? (
    <span className="flex text-green-600">
      Verified <VscVerifiedFilled className="mt-1.5 ml-1" />
    </span>
  ) : (
    <span className="flex text-red-600">
      Not Verified <MdErrorOutline className="mt-1.5 ml-1" />
    </span>
  )}

  {!isVerified && isVerified !== null && (
    <div className="mt-2">
      <button
        onClick={toggleConfirm}
        className="bg-gray-500 hover:bg-gray-600 cursor-pointer font-primary font-medium flex items-center rounded-xl p-4 text-white text-sm"
      >
        Send Confirmation Link <FiSend className="ml-2 mt-1" />
      </button>
    </div>
  )}
</div>

            </div>
          </div>
        </section>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              deleteAccount(), navigate("/");
            }}
            className="flex items-center cursor-pointer bg-red-600 p-4 rounded-xl text-white font-semibold font-secondary text-xl hover:bg-red-500 transition duration-300"
          >
            <RiDeleteBin5Line className="text-2xl mr-2" />
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default Accountinfo;
