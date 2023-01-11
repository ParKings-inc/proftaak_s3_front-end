import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "../../../style/ReservationsPage.css";
import dayjs from "dayjs";

const ReceiptOverview = (props) => {

    function ToDetailsPage(Receipts) {
        navigate('/receipt/Details', { state: { Receipts: [Receipts] } })
    }

    const navigate = useNavigate();
    let empty = []
    return (

        <div className='w-80'>
            {props.Receipts.map((Receipts, index) => {
                const arrivalDate = new Date(Receipts.ArrivalTime);
                const arrivalTime = `${arrivalDate.getHours()}:${String(arrivalDate.getMinutes()).padStart(2, '0')}`;
                const date = dayjs(Receipts.ArrivalTime).format("DD-MM-YYYY")
                const departureDate = new Date(Receipts.DepartureTime);
                const departureTime = `${departureDate.getHours()}:${String(departureDate.getMinutes()).padStart(2, '0')}`;
                return (
                    <div className='w-100 mb-3' key={index}>
                        <Card onClick={() => ToDetailsPage(Receipts)} className='left-border border-primary'>
                            <CardContent className='p-3'>
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
                                        <b>Price:</b> {(Receipts.Price === 0 ? 0.01 : Receipts.Price) + " Euro"}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        <b>Status:</b> <span style={{ color: Receipts.Status == "Paid" ? "green" : "orange" }} > {Receipts.Status}</span>
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )
            })}

        </div >
    )
}

export default ReceiptOverview

