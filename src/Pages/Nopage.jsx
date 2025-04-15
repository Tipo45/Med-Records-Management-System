import React from "react";
import Lottie from "lottie-react";
import NopageAnimation from "../assets/Animated Icons/404-Aimation.json";

const Nopage = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="mt-10">
        <Lottie animationData={NopageAnimation} />
      </div>
    </section>
  );
};

export default Nopage;
