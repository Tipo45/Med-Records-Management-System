import React from "react";
import Registration from "../../Components/Signin/Registration";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

const Registrationpage = () => {
  return (
    <section>
      <Header />
      <main>
        <Registration />
      </main>
      <Footer />
    </section>
  );
};

export default Registrationpage;
