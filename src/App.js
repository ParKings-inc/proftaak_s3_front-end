import logo from "./logo.svg";
import SignUpPage from "./components/SignUpPage";
import AccountService from "./services/AccountService";
import "./App.css";

function App() {
  const service = new AccountService();
  return (
    <div className="App">
      <SignUpPage />

      <button onClick={() => service.getUser()}>hello</button>
    </div>
  );
}

export default App;
