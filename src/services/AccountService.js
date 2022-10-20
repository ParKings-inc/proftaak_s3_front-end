import axios from "axios";

class AccountService {
  setUser(jwt) {
    console.log(jwt);
    this.SaveUser(jwt);
    sessionStorage.setItem("UserData", jwt.credential);
  }

  SaveUser(jwt) {
    return axios.post(
      "https://localhost:7205/api/Users",
      { encryptedJWT: jwt.credential },
      {
        withCredentials: true,
      }
    );
  }

  getUser() {
    return sessionStorage.getItem("UserData");
  }

  logoutUser() {
    console.log("logout");
    sessionStorage.removeItem("UserData");
  }

  parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
}

export default AccountService;
