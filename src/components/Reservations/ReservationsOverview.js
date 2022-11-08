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
                 getReservationSpace(reservation.SpaceID) 
                {/* let space = getSpaceById(reservation.SpaceID); */}
                console.log(space);
                return (
                    <div className='w-100 mb-3' key={index}>
                        <Card onClick={() => ToDetailsPage(reservation)} className='left-border border-primary'>
                            <CardContent className='p-3'>
                                <div className='flex flex-row justify-between'>
                                    {/* Maybe add "Arrival time - End time" in front more information. */}
                                    <Typography variant="h5" component="div">
                                        {arrivalTime + ' - ' + departureTime}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {reservation.carID}
                                    </Typography>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <Typography color="text.secondary">
                                        {date}
                                    </Typography>

                                    <Typography color="text.secondary">
                                        LICENSEPLATE
                                    </Typography>
                                </div>
                                <Typography className='text-warning' sx={{ marginTop: 1 }} color="text.primary">
                                    STATUS
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

