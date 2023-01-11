
import SettingsIcon from '@mui/icons-material/Settings';
import { CarouselItem } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import GarageSimulationButton from "../components/simulation/GarageSimulationButton";
import AccountService from "../services/AccountService";
import { getReservationsByUser, getAllReservations } from "../services/ReservationService";
import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FreeSpaceDisplay from "../components/FreeSpaceDisplay";
import Avatar from '@mui/material/Avatar';
import { toast } from 'react-toastify';
import '../style/HomePage.css';
import dayjs from "dayjs";



export default function HomePage() {
    const service = new AccountService();
    const navigate = useNavigate();
    const [stateReservations, setStatereservations] = useState<any[]>([]);
    const [stateUser, setstateUser] = useState<any>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const toastrShownRef = useRef(false);


    async function getReservationsOfToday() {

        console.log(stateUser)
        const reservations = await getReservationsByUser(stateUser.sub);
        console.log(reservations);
        let reservationsToday: any[] = [];

        reservations.map((reservation: any) => {
            const reservationDate = new Date(reservation.ArrivalTime).toDateString();
            const today = new Date().toDateString();

            if (today == reservationDate) {
                reservationsToday.push(reservation);
            }
        })

        console.log(reservationsToday);
        setStatereservations(reservationsToday);
    }



    function toasrMessage(message: String) {
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        })
    }

    function toastrMessageError(message: String) {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        })
    }

    function GoToReservations() {

        navigate("reservations");
    }

    useEffect(() => {
        if (service.getUser() == null) {
            navigate("/login");
            return;
        }

        setstateUser(service.parseJwt(service.getUser()));



    }, []);

    useEffect(() => {
        if (stateUser != null) {
            getReservationsOfToday();
        }
    }, [stateUser]);



    return (
        <div className="eighty-screen flex flex-column">
            <div className="full-width full-height" style={{ display: "Flex", flexDirection: "column" }}>
                <div className="bg-primary h-40 skew flex horizontal-center padding-top-50">
                    <div className="flex column vertical-center">
                        {stateUser != null && <Avatar alt={stateUser.name} src={stateUser.picture} sx={{ width: 100, height: 100, marginBottom: "20px" }} />}
                        {stateUser != null && <Typography className="text-white" variant="h5">{stateUser.name}</Typography>}
                    </div>
                </div>
                <div className="flex column vertical-center h-50">

                    <Typography className="text-black" variant="h6">You have <span className="text-primary text-26"> {stateReservations.length} </span> reservations today!</Typography>

                    <Carousel className="bg-primary" style={{ width: "80%", backgroundColor: "#b8b8b8", marginBottom: "20px", padding: "10px" }}>
                        {stateReservations.map((reservation, index) => {
                            const arrivalDate = new Date(reservation.ArrivalTime);
                            const arrivalTime = `${arrivalDate.getHours()}:${String(arrivalDate.getMinutes()).padStart(2, '0')}`;
                            const date = dayjs(reservation.ArrivalTime).format("DD-MM-YYYY")
                            const departureDate = new Date(reservation.DepartureTime);
                            const departureTime = `${departureDate.getHours()}:${String(departureDate.getMinutes()).padStart(2, '0')}`;
                            let textColor;

                            switch (reservation.Status) {
                                case "Paid":
                                    textColor = "text-success";
                                    break;
                                case "Awaiting payment":
                                    textColor = "text-purple";
                                    break;

                                default:
                                    textColor = "text-warning";
                                    break;
                            }
                            return (
                                <CarouselItem key={index}>
                                    <div className='w-80 h-40' style={{ margin: "auto", overflow: "auto" }}>
                                        <Card className=''>
                                            <CardContent className='p-3'>
                                                <div className='flex flex-column justify-between'>
                                                    <Typography color="text.secondary">
                                                        <b>Date:</b> {date}
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        <b>Time:</b> {arrivalTime + ' - ' + departureTime}
                                                    </Typography>
                                                </div>

                                                <div className='flex flex-row justify-between'>
                                                    <Typography color="text.secondary">
                                                        <b>Space:</b> {reservation.SpaceID}-{reservation.SpaceFloor}-{reservation.SpaceRow}
                                                    </Typography>

                                                </div>
                                                <div className='flex flex-row justify-between'>
                                                    <Typography color="text.secondary">
                                                        <b>License plate:</b> {reservation.Kenteken}
                                                    </Typography>
                                                </div>
                                                <Typography className={textColor} sx={{ marginTop: 1 }} color="text.primary">
                                                    {reservation.Status}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            )

                        })
                        }
                    </Carousel>

                    <div className="flex row full-width space-evenly full-height max-h-35 px-4">
                        <GarageSimulationButton getReservation={getReservationsOfToday} />
                        <div onClick={GoToReservations} className="w-40 full-height border rounded-3 shadow flex column vertical-center horizontal-center">
                            <SettingsIcon className="text-primary" sx={{ fontSize: "60px", marginBottom: "10px" }} />
                            <Typography variant="body1">Manage</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
