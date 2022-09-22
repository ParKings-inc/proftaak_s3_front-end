import logo from "./logo.svg";
import SignUpPage from "./components/SignUpPage";
import AccountService from "./services/AccountService";
import { userContext } from "./userContext";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [stateUser, setStateUser] = useState(null);
  const service = new AccountService();
  const value = {
    user: stateUser,
    userLogin: loginUser,
    userLogout: logoutUser
  }

  function loginUser(stateCredentials){
    console.log('PASSED IN USER');
    console.log(stateCredentials);
    setStateUser(stateCredentials);
  }

  function logoutUser(){
    console.log('uitgelogd');
    setStateUser(null);
    service.logoutUser();
  }

  useEffect(() => {
    async function assignCredential(){
      const user = await service.getUser();
      console.log('is dis parsed user');
      console.log(user);
      if(user.data != ""){
        setStateUser(await service.parseJwt(user.data));
      }
    }
    assignCredential();
  }, [])
  

  return (
    <div className="App">
      <userContext.Provider value={value}>
        <SignUpPage value={value}/>
      </userContext.Provider>
    </div>
  );
}

export default App;
