import { Component, ReactNode } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import AddCarPage from "../pages/AddCarPage";
import ReservationOverviewPage from "../pages/ReservationPages/ReservationOverviewPage";

interface Props {
    stateUser?: any;
    value: any;
    logout(): void;
}

export default class Navbar extends Component<Props> {
    public render(): ReactNode {
        return (
            <BrowserRouter>
                <div>
                    <nav>
                        <ul className="router">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="">
                                <Link to="/reservations">Reservations</Link>
                            </li>
                            {this.props.stateUser == null ? (
                                <>
                                    <li className="router-space">
                                        <Link to="/login">Log In</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/carpage">car page</Link>
                                    </li>
                                    <li className="router-space">
                                        <button id="logout" onClick={() => this.props.logout()}>
                                            Log Out
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
                <Routes>
                    <Route path="/" element={<HomePage></HomePage>}></Route>
                    {this.props.stateUser != null ? (
                        <Route
                            path="/carpage"
                            element={<AddCarPage></AddCarPage>}
                        ></Route>
                    ) : (
                        <></>
                    )}
                    <Route
                        path="/login"
                        element={<LoginPage value={this.props.value}></LoginPage>}
                    ></Route>
                    <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
                    <Route path="/reservations" element={<ReservationOverviewPage></ReservationOverviewPage>}></Route>
                </Routes>
            </BrowserRouter>
        );
    }
}
