import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import logo from "./logo.svg";
import AccountService from "./services/AccountService";
import { userContext } from "./userContext";
import { useState, useEffect } from "react";
import "./App.css";
import AddCarPage from "./pages/AddCarPage";
import EntranceScannerPage from "./pages/EntranceScannerPage";

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
      console.log("is dis parsed user");
      console.log(user);
      if (user != "") {
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
                <li><Link to="/entrancescannerpage">scanner page</Link></li>
                {stateUser == null ? (<>
                  <li className="router-space">
                    <Link to="/login">Log In</Link>
                  </li></>
                ) : (
                  <><li><Link to="/carpage">car page</Link></li>
                  <li className="router-space">
                    <button id="logout" onClick={logoutUser}>Log Out</button>
                  </li></>
                )}
              </ul>
            </nav>
          </div>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/entrancescannerpage" element={<EntranceScannerPage></EntranceScannerPage>}></Route>
            {stateUser != null? <Route path="/carpage" element={<AddCarPage></AddCarPage>}></Route>: <></>}
            <Route
              path="/login"
              element={<LoginPage value={value}></LoginPage>}
            ></Route>
            <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
