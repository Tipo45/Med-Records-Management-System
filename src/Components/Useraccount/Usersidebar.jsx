import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { logout } from "../../lib/pocketbase";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDoctorData } from "../../hooks/useDoctorData"; // Rename this hook to be more generic

const Usersidebar = ({ activepage }) => {
  const { data: userData } = useDoctorData(); // Now fetches all medical staff
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const userRole = userData?.role; // "Dr" or "nurse"

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 768 && screenWidth <= 1920) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigationItems = [
    { 
      to: "/user_account/dashboard", 
      icon: <MdOutlineDashboard className="h-6 w-6" />, 
      label: "Dashboard", 
      key: "dashboard" 
    },
  ];

  return (
    <section>
      <div className="flex">
        <div
          className={`bg-primary text-white h-full fixed left-0 top-0 transition-all duration-300 ease-in-out flex flex-col ${
            isExpanded ? "w-35 tablet:w-45" : "w-18 tablet:max-4xl:w-15"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center text-center justify-between p-4">
            {isExpanded && (
              <h1 className="font-semibold text-lg font-secondary capitalize">
                {userRole === "Dr" ? "Dr." : "Nurse"} {userData?.firstname}
              </h1>
            )}
            {!isExpanded && (
              <h1 className="font-semibold font-secondary text-sm/5 -ml-2.5 tablet:max-4xl:hidden capitalize">
                {userRole === "Dr" ? "Dr." : "Nrs."} {userData?.firstname}
              </h1>
            )}
          </div>

          {/* Sidebar Navigation */}
          <nav className="mt-4">
            <ul>
              {navigationItems.map(({ to, icon, label, key }) => (
                <li key={key}>
                  <Link
                    to={to}
                    className={`flex items-center p-3 ml-2 mb-4 transition-colors duration-200 relative group ${
                      activepage === key ? "bg-secondary mr-2 rounded-2xl" : "hover:bg-secondary rounded-2xl mr-2"
                    }`}
                  >
                    {icon}
                    {isExpanded && <span className="ml-2 font-primary text-sm">{label}</span>}
                    {!isExpanded && (
                      <span className="absolute font-primary left-13 z-100 ml-2 px-2 py-1 bg-secondary text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        {label}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="mt-auto p-4 border-t border-gray-200 animate-zoom-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center">
              <Link to="/user_account/account-information">
                {!isExpanded && <FaUser className="h-8 w-8 hover:text-gray-400" />}
                {isExpanded && (
                  <div className="ml-0">
                    <p className="text-sm font-medium mb-1 font-primary capitalize">
                      {userData?.firstname} {userData?.lastname}
                    </p>
                    <p className="text-xs text-gray-400 font-secondary">{userData?.email}</p>
                  </div>
                )}
              </Link>
            </div>

            <button
              onClick={() => { logout(); navigate("/"); }}
              className="mt-4 flex items-center p-2 rounded-lg cursor-pointer font-secondary hover:bg-red-500 transition-colors duration-200 w-full relative group"
            >
              <FaSignOutAlt className="h-6 w-6" />
              {isExpanded && <span className="ml-2">Logout</span>}
              {!isExpanded && (
                <span className="absolute left-16 -ml-2 px-2 py-1 bg-red-500 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Logout
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

Usersidebar.propTypes = {
  activepage: PropTypes.string.isRequired,
};

export default Usersidebar;