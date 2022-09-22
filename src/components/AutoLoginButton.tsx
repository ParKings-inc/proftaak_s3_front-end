import { Component, ReactNode } from "react";

interface Properties {
    image: string;
    text: string;
}

export default class AutoLoginButton extends Component<Properties> {
    public render(): ReactNode {
        return (
            <button className="login-button">
                <img src={this.props.image} alt="Logo"></img>
                <div className="login-text">{this.props.text}</div>
            </button>
        );
    }
}
