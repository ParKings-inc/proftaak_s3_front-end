import React from "react";

import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountService from "../services/AccountService";

const SignUpPage = () => {
  const service = new AccountService();
  return (
    <GoogleOAuthProvider clientId="470134517886-f5sgc46163gim5b4dtba1j3egd06hmoa.apps.googleusercontent.com">
      <GoogleLogin
        buttonText="Sign In with Google"
        onSuccess={(response) => {
          service.loginUser(response);
          console.log(response);
        }}
        onFailure={(response) => {
          console.log(response);
        }}
        isSignedIn={true}
        cookiePolicy={"single_host_origin"}
        useOneTap
        auto_select
      />
    </GoogleOAuthProvider>
  );
};

export default SignUpPage;
