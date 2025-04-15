import React from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../lib/pocketbase";

const Homebuttons = () => {

    const isLoggedin = isUserLoggedIn();

    const navigate = useNavigate();

    const handleDoctorLogin = () => {
        navigate("/login/doctor"); 
    };

    const handleNurseLogin = () => {
        navigate("/login/nurse");
    };

    const toggleMyAccount = () => {
        navigate("/user_account/dashboard")
    }

    return (
        <section>
            {isLoggedin ? (<div className="grid grid-cols-1 gap-8 mt-10"><h1 className="text-3xl font-primary text-center font-extrabold">Logged In</h1>
                <button 
                        onClick={toggleMyAccount}
                        className="bg-secondary p-4 rounded-2xl text-white font-medium text-lg font-secondary cursor-pointer transition-all duration-300 hover:-translate-y-2"
                    data-aos="fade-right" data-aos-duration="1500" data-aos-delay="1000">
                        View Account
                    </button></div>) : (<div>
                <h1 className="text-3xl font-primary text-center font-extrabold">
                    Log in as 
                </h1>
                <div className="flex gap-8 mt-10">
                    <button 
                        onClick={handleDoctorLogin}
                        className="bg-secondary p-4 rounded-2xl text-white font-medium text-lg font-secondary cursor-pointer transition-all duration-300 hover:-translate-y-2"
                    data-aos="fade-right" data-aos-duration="1500" data-aos-delay="1000">
                        Doctor
                    </button>
                    <button 
                        onClick={handleNurseLogin}
                        className="bg-text p-4 rounded-2xl text-white font-medium text-lg font-secondary cursor-pointer transition-all duration-300 hover:-translate-y-2"
                    data-aos="fade-left" data-aos-duration="1500" data-aos-delay="1000">
                        Nurse
                    </button>
                </div>
            </div>)}
        </section>
    );
};

export default Homebuttons;