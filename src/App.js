import "./App.css";
import AccountService from "./services/AccountService";
import { userContext } from "./userContext";
import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

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
      const user = service.getUser();
      if (user !== "" && user !== null) {
        setStateUser(await service.parseJwt(user));
      }
    }
    assignCredential();
  });

  return (
    <div>
      <userContext.Provider value={value}>
        <Navbar stateUser={stateUser} value={value} logout={() => logoutUser()} />
      </userContext.Provider>
    </div>
  );
}

export default App;
