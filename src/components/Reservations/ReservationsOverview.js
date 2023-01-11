import React, { useEffect, useState } from 'react'
import { getAllReservations } from "../../services/ReservationService";
import { getSpaceById } from "../../services/SpaceService";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "../../style/ReservationsPage.css";
import dayjs from "dayjs";
const ReservationOverview = (props) => {

    useEffect(() => {
        async function getReservationSpace(id) {
            await getSpaceById(id);
        }
    });

    function ToDetailsPage(reservation) {
        navigate('/reservation/Details/', { state: { reservation: [reservation] } })
    }
    const navigate = useNavigate();
    let empty = []
    return (

        <div className='w-80'>
            {props.reservations.map((reservation, index) => {
                const arrivalDate = new Date(reservation.ArrivalTime);
                const arrivalTime = `${arrivalDate.getHours()}:${String(arrivalDate.getMinutes()).padStart(2, '0')}`;
                const date = dayjs(reservation.ArrivalTime).format("DD-MM-YYYY")
                const departureDate = new Date(reservation.DepartureTime);
                const departureTime = `${departureDate.getHours()}:${String(departureDate.getMinutes()).padStart(2, '0')}`;
                return (
                    <div className='w-100 mb-3' key={index}>
                        <Card onClick={() => ToDetailsPage(reservation)} className='left-border border-primary'>
                            <CardContent className='p-3'>
                                <div className='flex flex-row justify-between'>
                                    {/* Maybe add "Arrival time - End time" in front more information. */}
                                    <Typography variant="h5" component="div">
                                        {console.log(reservation)}
                                        {reservation.GarageName}
                                    </Typography>

                                </div>
                                <div className='flex flex-row justify-between'>
                                    <Typography color="text.secondary">
                                        <b>Date:</b> {date}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        <b>Time:</b> {arrivalTime + ' - ' + (reservation.DepartureTime == null ? "Now" : departureTime)}
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
                                <Typography className={reservation.Status == "Accepted" ? "text-success" : reservation.Status == "Pending" ? "text-warning" : "text-danger"} sx={{ marginTop: 1 }} color="text.primary">
                                    {reservation.Status}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                )
            })}

        </div>
    )
}

export default ReservationOverview

