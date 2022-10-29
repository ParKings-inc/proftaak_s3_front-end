import React, { useEffect, useState } from 'react'
import { getAllReservations } from "../../services/ReservationService";
import ReservationsOverview from "../../components/Reservations/ReservationsOverview";
import "../../style/ReservationsPage.css";
import { Typography } from '@mui/material';

const ReservationOverviewPage = () => {

    useEffect(() => {
        async function AsignValue(){
            setReservations( await getAllReservations())
        }
        AsignValue();
    }, [])
    const [reservations, setReservations] = useState([])


    return (
        <div className='center mt-25'>
            <div className='flex row mb-25'>
                {/* Change Icon */}
                <div className='w-auto bg-primary px-3 py-2 rounded'>
                    <h5 className='m-0'>X</h5>
                </div>
                {/* Align text vertically */}
                <Typography className='w-auto' variant='h5'>My Reservations</Typography>
            </div>
            <div className='flex row'>
                
            </div>
            <ReservationsOverview reservations={reservations}></ReservationsOverview>
        </div>
    )
}

export default ReservationOverviewPage