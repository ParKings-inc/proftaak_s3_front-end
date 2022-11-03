import React, { Component, ReactNode } from "react";
import FreeSpaceDisplay from "../components/FreeSpaceDisplay";
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, Navigate } from "react-router-dom";
import '../style/HomePage.css';

export default class HomePage extends Component {
    public override render(): ReactNode {
        return (
            <div className="center bg-purple full-screen vertical-center">
                <div className="button-block vertical-center margin-bottom-30">
                    <div className="margin-bottom-15">
                        <LocalParkingIcon className="icon"/>
                    </div>
                    <div className="margin-top-15 full-width">
                        <Link className="text-dec-none" to="">
                            <div className="button">
                                ENTER GARAGE
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="button-block vertical-center margin-top-30">
                    <div className="margin-bottom-15">
                        <SettingsIcon className="icon"/>
                    </div>
                    <div className="margin-top-15 full-width">
                        <Link className="text-dec-none" to="/reservations">
                            <div className="button">
                                MANAGE
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        );
    }
}
