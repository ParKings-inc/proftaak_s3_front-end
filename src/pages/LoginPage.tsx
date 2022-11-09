import { Component, ReactNode } from "react";
import '../style/SignUpPage.css';
import AccountService from "../services/AccountService";
import LoginButton from "../components/LoginButton";

import GoogleLogo from "../assets/logos/google.svg";
import EmptyAvatarImg from "../assets/logos/EmptyAvatarImg.svg";

interface Properties {
    value: {}
}

export default class LoginPage extends Component<Properties> {
    public override render(): ReactNode {
        return (
            <>
                <div className="container d-flex justify-content-center">
                    <img className="centre" style={{ width: "15%", height: "15%" }} src={GoogleLogo} alt=""></img>
                </div>
                <div className="container d-flex justify-content-center">                
                    <div className="title h2">Log In</div>
                </div>
                <div className="container d-flex justify-content-center">
                    <div className="login-container">
                        <LoginButton value={this.props.value}/>
                    </div>
                </div>
            </>
        );
    }

    private loginGoogle(): void {
        const service = new AccountService();
        console.warn("Login")
        service.setUser();
    }
}
