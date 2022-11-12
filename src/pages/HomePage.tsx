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
import { getReservationsByUser } from "../services/ReservationService";
import { CarouselItem } from "react-bootstrap";
import dayjs from "dayjs";


export default function HomePage() {
    const service = new AccountService();
    const navigate = useNavigate();
    const [stateReservations, setStatereservations] = useState<any[]>([]);
    const unparsedJWT = service.getUser();

    if(unparsedJWT == null) {
        navigate("/login");
        navigate(0);
    }

    let user: any = service.parseJwt(unparsedJWT);
    const dateToday = new Date().toDateString();

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

    useEffect(() => {
        getReservationsOfToday();

    }, [stateReservations.length]);

    return (
        <div className="eighty-screen flex flex-column">
            <div className="full-width full-height" style={{display: "Flex", flexDirection: "column"}}>
                <div className="bg-primary h-40 skew flex horizontal-center padding-top-100">
                    <div className="flex column vertical-center">
                        <Avatar alt={user.name} src={user.picture} sx={{ width: 100, height: 100, marginBottom: "20px" }}/>
                        <Typography className="text-white" variant="h5">{ user.name }</Typography>
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
                                    <CarouselItem>
                                        <div className='w-80 h-40' style={{margin: "auto"}} key={index}>
                                            <Card className=''>
                                                <CardContent className='p-3'>
                                                    <div className='flex flex-row justify-between'>
                                                        <Typography variant="h5" component="div">
                                                            {reservation.GarageName}
                                                        </Typography>

                                                    </div>
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

                        <div className="flex row full-width space-evenly full-height px-4">
                            <div className="w-40 full-height border rounded-3 shadow flex column vertical-center horizontal-center">
                                <LocalParkingIcon className="text-primary" sx={{fontSize: "60px", marginBottom: "10px"}}/>
                                <Typography variant="body1">Enter Garage</Typography>
                            </div>
                            <div className="w-40 full-height border rounded-3 shadow flex column vertical-center horizontal-center">
                                <SettingsIcon className="text-primary" sx={{fontSize: "60px", marginBottom: "10px"}}/>
                                <Typography variant="body1">Manage</Typography>
                            </div>
                        </div>
                </div>





                    {/* <Typography className="text-white" variant="h5">Logged in as:</Typography>
                    <div className="bg-blue-600" style={{width: "75%", height: "15%", borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px", borderTopRightRadius: "50px", borderBottomRightRadius: "50px"}}>
                        <div className="flex flex-row full-height">
                            <div style={{paddingLeft: "5%", marginRight: "5%", display: "flex", alignItems: "center"}}>
                                <Avatar alt={user.name} src={user.picture}/>
                            </div>
                            <div className="flex flex-column full-height vertical-center">
                                <Typography className="text-white" variant="h6">{ user.name }</Typography>
                                <Typography className="text-muted">{ user.email }</Typography>
                            </div>
                            
                        </div>
                    </div>

                    <div style={{width: "75%", marginTop: "5%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                        <Typography className="text-white margin-bottom-30" variant="h6">You have <span className="">{ stateReservations.length }</span> reservations today</Typography>

                        <Carousel className="h-65 full-width">
                            { stateReservations.map((reservation, index) => {
                                const arrivalDate = new Date(reservation.ArrivalTime);
                                const arrivalTime = `${arrivalDate.getHours()}:${String(arrivalDate.getMinutes()).padStart(2, '0')}`;
                                const date = dayjs(reservation.ArrivalTime).format("DD-MM-YYYY")
                                const departureDate = new Date(reservation.DepartureTime);
                                const departureTime = `${departureDate.getHours()}:${String(departureDate.getMinutes()).padStart(2, '0')}`;

                                return (
                                    <CarouselItem>
                                    <div className='w-100 mb-3 bg-black' key={index}>
                                        <Card className='left-border border-primary'>
                                            <CardContent className='p-3'>
                                                <div className='flex flex-row justify-between'>
                                                    <Typography variant="h5" component="div">
                                                        {reservation.GarageName}
                                                    </Typography>

                                                </div>
                                                <div className='flex flex-row justify-between'>
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
                    </div> */}

            </div>
            {/* <div className="full-width h-65 border-radius-40 p-3 skew" style={{backgroundColor: "#f4f4f4", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly"}}>

                <Button variant="contained" startIcon={<LocalParkingIcon />}>
                    Enter Garage
                </Button>
                
                <Button variant="contained" startIcon={<SettingsIcon />}>
                    Manage
                </Button>
            </div> */}
                            
        </div>
    );
}
