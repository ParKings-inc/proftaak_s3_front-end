import { Component, ReactNode } from "react";
import '../style/SignUpPage.css';
import GoogleLogo from '../assets/logos/google.svg';

export default class LoginPage extends Component {
    public override render(): ReactNode {
        return (
            <div className="centre">
                <div className="title">Log In</div>
                <div className="login-container">
                    <button className="login-button">
                        <img src={GoogleLogo} alt="Google Logo"></img>
                        <div className="login-text">Sign up with Google</div>
                    </button>
                </div>
            </div>
        );
    }
}
