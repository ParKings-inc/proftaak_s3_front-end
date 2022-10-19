import React, { Component, ReactNode } from "react";
import FreeSpaceDisplay from "../components/FreeSpaceDisplay";

export default class HomePage extends Component {
    public override render(): ReactNode {
        return (
            <>
            <br></br>
                <FreeSpaceDisplay/>
            </>
        );
    }
}
