import { Component, MouseEventHandler, ReactNode } from "react";

interface Properties {
    image: string;
    text: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default class AutoLoginButton extends Component<Properties> {
    public render(): ReactNode {
        return (
            <button className="login-button" onClick={this.props.onClick}>
                <img src={this.props.image} alt="Logo"></img>
                <div className="login-text">{this.props.text}</div>
            </button>
        );
    }
}
