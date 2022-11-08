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
                const arrivalDate = new Date(reservatie.ArrivalTime);
                const arrivalDateString = arrivalDate.toLocaleDateString();
                
                const arrivalTime = `${arrivalDate.getHours()}:${arrivalDate.getMinutes()}`;
            
                const departureDate = new Date(reservatie.DepartureTime);
                const departureTime = `${departureDate.getHours()}:${departureDate.getMinutes()}`;
                
                const border = "left-border";

                let status = "";
                let statusTextColor = "";
                let statusBorderColor = "";

                switch (reservatie.Status) {
                    case "Pending":
                        status = "Pending";
                        statusTextColor = "text-warning";
                        statusBorderColor = "border-warning";
                        break;
                    case "Approved":
                        status = "Approved";
                        statusTextColor = "text-success";
                        statusBorderColor = "border-success";
                        break;

                    case "Denied":
                        status = "Denied";
                        statusTextColor = "text-danger";
                        statusBorderColor = "border-danger";
                        break;
                }
                return (
                    <div className='w-100 mb-3' key={index}>
                        <Card className={'left-border ' + statusBorderColor}>
                            <CardContent className='p-3'>
                                <div className='flex flex-row justify-between mb-10'>
                                    <Typography variant="h5" component="div">
                                        {arrivalTime + ' - ' + departureTime}
                                    </Typography>
                                    <Typography className="w-35 word-break" variant="h5" component="div">
                                        Space:{ reservatie.SpaceNumber }, Floor:{ reservatie.SpaceFloor }            
                                    </Typography>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <Typography color="text.secondary">
                                        { arrivalDateString }
                                    </Typography>

                                    <Typography color="text.secondary">
                                        { reservatie.Kenteken }
                                    </Typography>
                                </div>
                                <Typography className={statusTextColor} sx={{marginTop: 1}} color="text.primary">
                                    { status }
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

