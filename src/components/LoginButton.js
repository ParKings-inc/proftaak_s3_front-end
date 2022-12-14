import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountService from "../services/AccountService";
import { useNavigate } from "react-router-dom";

 var SignUpPage = (props) => {
  const navigate = useNavigate();

  const service = new AccountService();
  return (
    <>
    <div className="">
      <GoogleOAuthProvider clientId="470134517886-f5sgc46163gim5b4dtba1j3egd06hmoa.apps.googleusercontent.com">
        <GoogleLogin
          buttonText="Sign In with Google"
          onSuccess={(response) => {
            service.setUser(response);
            console.log(service.parseJwt(response.credential));
            const userCredentials = service.parseJwt(response.credential);
            props.value.userLogin(userCredentials);
            navigate("/");
          }}
          onFailure={(response) => {
            console.log(response);
          }}
          isSignedIn={true}
          cookiePolicy={"single_host_origin"}
        />
      </GoogleOAuthProvider>
      </div>
    </>
  );
};

export default SignUpPage;
