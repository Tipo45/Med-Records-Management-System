import React from "react";
import Footer from "../Components/Footer/Footer";
import Homebuttons from "../Components/Home/Homebuttons";
import Header from "../Components/Header/Header";

const Landingpage = () => {
  return (
    <section className="m-0 p-0 box-border">
        <Header />
      <main className="p-4 flex justify-center items-center mt-10"><Homebuttons /></main>
      <Footer />
    </section>
  );
};

export default Landingpage;
