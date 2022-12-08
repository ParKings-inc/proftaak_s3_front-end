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
import "bootstrap/dist/js/bootstrap";
//import ParkingspacesOverview from "./pages/ParkingspacesOverview";
import NavigationBar from "./components/NavBar";
import ReservationOverviewPage from "./pages/ReservationPages/View/ReservationOverviewPage";
import ReservationsCreatePage from "./pages/ReservationPages/Create/ReservationsCreatePage";
import ReservationAvailableSpaces from "./pages/ReservationPages/Create/ReservationAvailableSpaces"
import ReservationDetailsPage from "./pages/ReservationPages/View/Details/ReservationDetailsPage";
import ReservationUpdatePage from "./pages/ReservationPages/Update/ReservationUpdatePage";
import ReservationDeletePage from "./pages/ReservationPages/Delete/ReservationDeletePage";
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

    <>
    <ToastContainer></ToastContainer>
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
            <Route path="/reservations/create" element={<ReservationsCreatePage></ReservationsCreatePage>}></Route>
            <Route path="/reservations/availableSpaces/:LicensePlate/:ArrivalTime/:DepartureTime/:GarageId" element={<ReservationAvailableSpaces />} />
            {/* Details */}
            <Route path="/reservation/Details" element={<ReservationDetailsPage />}></Route>
            {/* Update */}
            <Route path="/reservation/Update" element={<ReservationUpdatePage />}></Route>
            {/* Delete */}
            <Route path="/reservation/Delete" element={<ReservationDeletePage />}></Route>
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>

  );
}

export default App;
