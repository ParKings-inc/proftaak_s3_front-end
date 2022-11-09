import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AccountService from "./services/AccountService";
import { userContext } from "./userContext";
import { useState, useEffect } from "react";
import "./App.css";
import AddCarPage from "./pages/AddCarPage";
import EntranceScannerPage from "./pages/EntranceScannerPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
//import ParkingspacesOverview from "./pages/ParkingspacesOverview";
import ReservationOverviewPage from "./pages/ReservationPages/ReservationOverviewPage";
import NavigationBar from "./components/NavBar";

function App() {
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
        <NavigationBar value={stateUser} logout={logoutUser}></NavigationBar>
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
                element={<LoginPage value={value} ></LoginPage>}
                ></Route>
                <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
                <Route path="/reservations" element={<ReservationOverviewPage></ReservationOverviewPage>}></Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
    </>
  );
}

export default App;
