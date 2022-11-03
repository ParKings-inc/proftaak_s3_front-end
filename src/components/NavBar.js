import React from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ReservationOverviewPage from "../pages/ReservationPages/ReservationOverviewPage";
import AddCarPage from "../pages/AddCarPage";

import AccountService from "../services/AccountService";
import { userContext } from "../userContext";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";



const NavigationBar = (props) => {

    const [stateUser, setStateUser] = useState(null);
  const service = new AccountService();
  const value = {
    user: stateUser,
    userLogin: loginUser,
    userLogout: logoutUser,
  };

  function loginUser(stateCredentials) {
    console.log("PASSED IN USER");
    console.log(stateCredentials);
    setStateUser(stateCredentials);
  }

  function logoutUser() {
    console.log("uitgelogd");
    setStateUser(null);
    service.logoutUser();
  }

  useEffect(() => {
    async function assignCredential() {
      const user = await service.getUser();
      if (user !== "" && user !== null) {
        setStateUser(await service.parseJwt(user));
      }
    }
    assignCredential();
  });

  return (    
    <>
    <userContext.Provider value={value}>
        <BrowserRouter>
        <div class="collapse" id="navbarToggleExternalContent">
            <div class="bg-dark p-4">
                <h5 class="text-white h4">Collapsed content</h5>
                <span class="text-muted">Toggleable via the navbar brand.</span>
            </div>
        </div>
            
                <div class="collapse" id="navbarToggleExternalContent">
                    <div class="navbar navbar-dark bg-primary p-4">


                        <span><Link to="/"><span class="text-white h4">Home</span></Link></span>
                        <span><Link to="/"><span class="text-white h4">Home</span></Link></span>
                        
                        <Link to="/reservations">
                            <span class="text-white h4">Reservations</span>
                        </Link>
                        {stateUser == null ? (
                        <>
                            <Link to="/login">
                                <span class="text-white h4">Log In</span>
                            </Link>
                        </>
                        ) : (
                        <>
                            <Link to="/carpage">
                                <span class="text-white h4">Car page</span>
                            </Link>
                            <button class="navbar navbar-dark bg-primary p-4" id="logout" onClick={logoutUser}>
                                <span class="text-white h4">Log Out</span>
                            </button>
                        </>
                        )}




                    </div>
                </div>
                <nav class="navbar navbar-dark bg-primary">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </nav>
            
            <Routes>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                {stateUser != null ? (
                <Route
                    path="/carpage"
                    element={<AddCarPage></AddCarPage>}
                ></Route>
                ) : (
                <></>
                )}
                <Route
                path="/login"
                element={<LoginPage value={value}></LoginPage>}
                ></Route>
                <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
                <Route path="/reservations" element={<ReservationOverviewPage></ReservationOverviewPage>}></Route>
            </Routes>
        </BrowserRouter>
    </userContext.Provider>
    </>
  );
};



export default NavigationBar;