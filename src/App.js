import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AccountService from "./services/AccountService";
import { userContext } from "./userContext";
import { useState, useEffect } from "react";
import "./App.css";
import AddCarPage from "./pages/AddCarPage";
import EntranceScannerPage from "./pages/EntranceScannerPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
//import ParkingspacesOverview from "./pages/ParkingspacesOverview";
import ReservationOverviewPage from "./pages/ReservationPages/ReservationOverviewPage";
import NavigationBar from "./components/NavBar";

function App() {
  return (
    <>
    <NavigationBar></NavigationBar>
    </>
  );
}

export default App;
