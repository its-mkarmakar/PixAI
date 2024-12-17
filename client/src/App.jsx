import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import ResetPassword from "./pages/ResetPassword";
import Verify from "./pages/Verify";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Header from "./components/Header";
import Steps from "./components/Steps";
import Description from "./components/Description";
import GenerateBtn from "./components/GenerateBtn";
import Footer from "./components/Footer";

const App = () => {
  const { showLogin } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollDirection, setScrollDirection] = useState("down");
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    const top = window.scrollY <= 100;
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;

    if (top) {
      setScrollDirection("down");
    } else if (bottom) {
      setScrollDirection("up");
    }
  };

  const handleScrollButtonClick = () => {
    if (scrollDirection === "down") {
      const footer = document.getElementById('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (scrollDirection === "up") {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        navbar.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (location.pathname === '/reset-password') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="relative px-4 sm:px-10 md:px-14 lg:px-28 text-white">
        <ToastContainer position="bottom-right" />

        {isLoading ? (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50">
            <img src="/preloader.gif" alt="Loading..." className="w-12 h-12" />
          </div>
        ) : (
          <>
            {location.Navbar !== '/reset-password' && <Navbar id="navbar" />}

            {showLogin && <Login />}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/result" element={<Result />} />
              <Route path="/buy" element={<BuyCredit />} />
              <Route path="/verify" element={<Verify />} />
              <Route
                path="/reset-password"
                element={
                  <>
                    <Header />
                    <Steps />
                    <Description />
                    <GenerateBtn />
                    <ResetPassword />
                  </>
                }
              />
            </Routes>

            {location.Footer !== '/reset-password' && <Footer id="footer" />}
          </>
        )}

        {location.pathname === '/' && !isLoading && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50">
            <button
              onClick={handleScrollButtonClick}
              className="bg-yellow-500 hover:bg-gradient-to-r from-yellow-500 to-orange-400 text-white p-3 rounded-full shadow-lg transition-all opacity-50 hover:opacity-100">
              {scrollDirection === "down" ? (
                <FontAwesomeIcon icon={faArrowDown} />
              ) : (
                <FontAwesomeIcon icon={faArrowUp} />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
