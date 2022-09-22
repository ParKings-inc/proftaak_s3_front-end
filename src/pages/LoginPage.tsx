import { Component, ReactNode } from "react";
import '../style/SignUpPage.css';
import GoogleLogo from '../assets/logos/google.svg';
import AutoLoginButton from "../components/AutoLoginButton";

export default class LoginPage extends Component {
    public override render(): ReactNode {
        return (
            <div className="centre">
                <div className="title">Log In</div>
                <div className="login-container">
                    <AutoLoginButton text="Log in with Google" image={GoogleLogo} />
                </div>
            </div>
        );
    }
}
