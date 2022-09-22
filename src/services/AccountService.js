import axios from "axios";

const ACCOUNT_BASE_REST_API_URL = "https://localhost:7205/api/Authentication";
class AccountService {
  loginUser(jwt) {
    console.log(jwt);
    return axios.post(
      ACCOUNT_BASE_REST_API_URL,
      { encryptedJWT: jwt.credential },
      {
        withCredentials: true,
      }
    );
  }

  getUser() {
    const response = axios.get(ACCOUNT_BASE_REST_API_URL, { withCredentials: true }).then(jwt => { console.log(jwt.data); });
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
