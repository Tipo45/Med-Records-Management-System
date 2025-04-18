import React from "react";
import { useParams } from "react-router-dom";
import Nopage from "../Nopage";
import Usersidebar from "../../Components/Useraccount/Usersidebar";
import Dashboard from "../../Components/Useraccount/Dashboard";
import Accountinfo from "../../Components/Useraccount/Accountinfo";
import Addpatient from "../../Components/Useraccount/Addpatient";
import Patientinformation from "../../Components/Useraccount/Patientinformation";

const Useraccountpage = () => {
  const { activepage, id } = useParams();

const validPages =["dashboard", "account-information", "add-patient", "patient-information"];
  
const isValidPage =
validPages.includes(activepage) &&
// For "patient-information", require an ID
(activepage !== "patient-information" || !!id);

  return (
    <section>
      {isValidPage ? (
        <section className="flex">
          <Usersidebar activepage={activepage} />
          <div className="flex-grow pr-2 pl-6 ml-13 mt-1 mb-1 tablet:ml-40 transition-all duration-300 ease-in-out">
            {activepage === "dashboard" && <Dashboard />}
            {activepage === "account-information" && <Accountinfo />}
            {activepage === "add-patient" && <Addpatient />}
            {activepage === "patient-information" && <Patientinformation id={id} /> }
          </div>
        </section>
      ) : (
        <Nopage />
      )}
    </section>
  );
};

export default Useraccountpage;
