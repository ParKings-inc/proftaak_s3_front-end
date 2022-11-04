import "./App.css";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
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
//import ParkingspacesOverview from "./pages/ParkingspacesOverview";
import ReservationOverviewPage from "./pages/ReservationPages/ReservationOverviewPage";
import ReservationsCreatePage from "./pages/ReservationPages/ReservationsCreatePage";
import ReservationAvailableSpaces from "./pages/ReservationPages/ReservationAvailableSpaces"
import { ToastContainer } from "react-toastify";

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
      if (user !== [] && user !== null) {
        setStateUser(await service.parseJwt(user));
      }
    }
    assignCredential();
  }, []);

  return (
    <div>
      <userContext.Provider value={value}>
        <BrowserRouter>
          <div>
            <nav>
              <ul className="router">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className="">
                  <Link to="/reservations">Reservations</Link>
                </li>
                {stateUser == null ? (
                  <>
                    <li className="router-space">
                      <Link to="/login">Log In</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/carpage">car page</Link>
                    </li>
                    <li className="router-space">
                      <button id="logout" onClick={logoutUser}>
                        Log Out
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
          <ToastContainer />
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
            <Route path="/reservations/create" element={<ReservationsCreatePage></ReservationsCreatePage>}></Route>
            <Route path="/reservations/availableSpaces/:LicensePlate/:ArrivalTime/:DepartureTime/:GarageId" element={<ReservationAvailableSpaces />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
