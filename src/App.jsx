import { useEffect } from "react";
import "./App.css";
import Aos from "aos";
import "aos/dist/aos.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Nopage from "./Pages/Nopage";
import Landingpage from "./Pages/Landingpage";
import Loginpage from "./Pages/SignInPages/Loginpage";
import Registrationpage from "./Pages/SignInPages/Registrationpage";
import Useraccountpage from "./Pages/UserAccountPage/Useraccountpage";

function App() {

  const queryClient = new QueryClient();

  useEffect(() => {
    Aos.init({
      duration: 800,
      once: false,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login/:role" element={<Loginpage />} />
        <Route path="/registration" element={<Registrationpage />} />
        <Route path="/user_account/:activepage" element={<Useraccountpage />} />
        <Route path="" element />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
