import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountService from "../services/AccountService";
import {userContext} from '../userContext';
import { useState } from "react";

const SignUpPage = (props) => {
  const [stateCredentials, setStateCredentials] = useState(null);
  const service = new AccountService();
  return (
    <>
      <GoogleOAuthProvider clientId="470134517886-f5sgc46163gim5b4dtba1j3egd06hmoa.apps.googleusercontent.com">
          <GoogleLogin
            buttonText="Sign In with Google"
            onSuccess={(response) => {
              service.loginUser(response);
              console.log(service.parseJwt(response.credential));
              const userCredentials = service.parseJwt(response.credential);
              props.value.userLogin(userCredentials)
            }}
            onFailure={(response) => {
              console.log(response);
            }}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        </GoogleOAuthProvider>
        <button onClick={() => props.value.userLogout()}>hello</button>
        <userContext.Consumer>
          {({user}) => {
            return(
                user == null ?
                <h2>U bent uitgelogd</h2> :
                <h2>U bent ingelogd als {user.given_name}</h2>              
            );
          }}
      </userContext.Consumer>
    </>
      
  );
};

export default SignUpPage;
