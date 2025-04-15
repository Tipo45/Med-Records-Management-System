import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import DocLogin from "../../Components/Signin/DocLogin";
import NurseLogin from "../../Components/Signin/NurseLogin";
import { useParams } from "react-router-dom";
import Nopage from "../Nopage";

const Loginpage = () => {
  const { role } = useParams();

  const roles = ["doctor", "nurse"];

  const isValidPage = roles.includes(role);

  return (
    <section>
      {isValidPage ? (
        <section>
          <Header />
          <main>
            {role === "doctor" && <DocLogin />}
            {role === "nurse" && <NurseLogin />}
          </main>
          <Footer />
        </section>
      ) : (
        <Nopage />
      )}
    </section>
  );
};

export default Loginpage;
