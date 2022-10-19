import { Component, ReactNode } from "react";
import '../style/SignUpPage.css';
import AccountService from "../services/AccountService";
import LoginButton from "../components/LoginButton"

interface Properties {
    value: {}
}

export default class LoginPage extends Component<Properties> {
    public override render(): ReactNode {
        return (
            <div className="centre">
                <div className="title">Log In</div>
                <div className="login-container">
                    <LoginButton value={this.props.value}/>
                </div>
            </div>
        );
    }

    private loginGoogle(): void {
        const service = new AccountService();
        console.warn("Login")
        service.setUser();
    }
}
