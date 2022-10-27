import { Component, ReactNode } from "react";
import '../style/LoginPage.css';
import GoogleLogo from '../assets/logos/google.svg';
import AutoLoginButton from "../components/AutoLoginButton";

export default class SignUpPage extends Component {
    public render(): ReactNode {
        return (
            <div className="center">
                <div className="title">Log In</div>
                <div className="login-container">
                    <AutoLoginButton text="Sign up with Google" image={GoogleLogo} onClick={() => this.signupGoogle()} />
                </div>
            </div>
        )
    }

    private signupGoogle(): void {}
}
