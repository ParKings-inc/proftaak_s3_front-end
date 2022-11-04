import React, { useEffect } from 'react'
import { getAllReservations } from "../../services/ReservationService";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "../../style/ReservationsPage.css";

const ReservationOverview = (props) => {

    let empty = []
    return (

        <div className='w-80'>
            {props.reservations.map((reservatie, index) => {
                const arrivalDate = new Date(reservatie.arrivalTime);
                const arrivalTime = `${arrivalDate.getHours()}:${arrivalDate.getMinutes()}`;

                const date = `${arrivalDate.getDay()}-${arrivalDate.getMonth()}-${arrivalDate.getFullYear()}`

                const departureDate = new Date(reservatie.departureTime);
                const departureTime = `${departureDate.getHours()}:${departureDate.getMinutes()}`;

                return (
                    <div className='w-100 mb-3' key={index}>
                        <Card className='left-border border-primary'>
                            <CardContent className='p-3'>
                                <div className='flex flex-row justify-between'>
                                    <Typography variant="h5" component="div">
                                        {arrivalTime + ' - ' + departureTime}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {reservatie.carID}
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

