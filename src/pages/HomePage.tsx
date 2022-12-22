import React, { Component, ReactNode, useEffect, useState } from "react";
import FreeSpaceDisplay from "../components/FreeSpaceDisplay";
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SettingsIcon from '@mui/icons-material/Settings';
import Carousel from 'react-bootstrap/Carousel';
import { Link, Navigate, useNavigate } from "react-router-dom";
import '../style/HomePage.css';
import { Button, Card, CardContent, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import AccountService from "../services/AccountService";
import { createPayment, getPaymentById, goToCheckoutPage } from "../services/PaymentService";
import { getReservationsByUser, getReservationById, putReservation } from "../services/ReservationService";
import { CarouselItem } from "react-bootstrap";
import dayjs from "dayjs";


export default function HomePage() {
    const service = new AccountService();
    const navigate = useNavigate();
    const [stateReservations, setStatereservations] = useState<any[]>([]);
    const [stateUser, setstateUser] = useState<any>(null);
    const unparsedJWT = service.getUser();

    let user: any;
    let dateToday: any;

    async function getReservationsOfToday(){
        const reservations = await getReservationsByUser(user.sub);
        let reservationsToday: any[] = [];

        reservations.map((reservation: any) => {
            const reservationDate = new Date(reservation.ArrivalTime).toDateString();

            if(dateToday == reservationDate){
                reservationsToday.push(reservation);
            }
        })

        setStatereservations(reservationsToday);
    }

    function GoToReservations(){
        navigate("reservations");
    }

    useEffect(() => {
        if(unparsedJWT == null) {
            navigate("/login");
            return;
        }
        
        user = service.parseJwt(unparsedJWT);
        dateToday = new Date().toDateString();

        setstateUser(user);
        getReservationsOfToday();

    }, [stateReservations.length]);

    return (
        <div className="eighty-screen flex flex-column">
            <div className="full-width full-height" style={{display: "Flex", flexDirection: "column"}}>
                <div className="bg-primary h-40 skew flex horizontal-center padding-top-50">
                    <div className="flex column vertical-center">
                        { stateUser != null && <Avatar alt={stateUser.name} src={stateUser.picture} sx={{ width: 100, height: 100, marginBottom: "20px" }}/> }
                        { stateUser != null && <Typography className="text-white" variant="h5">{ stateUser.name }</Typography> }
                    </div>
                </div>
                <div className="flex column vertical-center h-50">
                    <Typography className="text-black" variant="h6">You have <span className="text-primary text-26"> { stateReservations.length } </span> reservations today!</Typography>

                    <Carousel className="bg-primary" style={{width: "80%", backgroundColor: "#b8b8b8", marginBottom: "20px", padding: "10px"}}>
                            { stateReservations.map((reservation, index) => {
                                const arrivalDate = new Date(reservation.ArrivalTime);
                                const arrivalTime = `${arrivalDate.getHours()}:${String(arrivalDate.getMinutes()).padStart(2, '0')}`;
                                const date = dayjs(reservation.ArrivalTime).format("DD-MM-YYYY")
                                const departureDate = new Date(reservation.DepartureTime);
                                const departureTime = `${departureDate.getHours()}:${String(departureDate.getMinutes()).padStart(2, '0')}`;

                                return (
                                    <CarouselItem key={index}>
                                        <div className='w-80 h-40' style={{margin: "auto", overflow: "auto"}}>
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
                                                    <Typography className='text-warning' sx={{ marginTop: 1 }} color="text.primary">
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
                            <div className="w-40 full-height border rounded-3 shadow flex column vertical-center horizontal-center">
                                <LocalParkingIcon className="text-primary" sx={{fontSize: "60px", marginBottom: "10px"}}/>
                                <Typography variant="body1">Enter Garage</Typography>
                            </div>
                            <div onClick={GoToReservations} className="w-40 full-height border rounded-3 shadow flex column vertical-center horizontal-center">
                                <SettingsIcon className="text-primary" sx={{fontSize: "60px", marginBottom: "10px"}}/>
                                <Typography variant="body1">Manage</Typography>
                            </div>
                        </div>
                </div>
            </div>  
        </div>
    );
}
