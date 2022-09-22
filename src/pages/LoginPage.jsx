import { Component, ReactNode } from "react";
import '../style/SignUpPage.css';
import GoogleLogo from '../assets/logos/google.svg';
import AutoLoginButton from "../components/AutoLoginButton";
import AccountService from "../services/AccountService";
import LoginButton from "../components/LoginButton"

export default class LoginPage extends Component {
    constructor(props) {
        props =super(props);
    }
     render() {
        return (
            <div className="centre">
                <div className="title">Log In</div>
                <div className="login-container">
                    <LoginButton value={this.props.value}/>
                </div>
            </div>
        );
    }

 loginGoogle() {
        const service = new AccountService();
        console.warn("Login")
        service.loginUser();
    }
}
