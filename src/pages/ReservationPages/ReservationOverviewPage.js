import React, { useEffect, useState } from 'react'
import { getAllReservations } from "../../services/ReservationService";
import ReservationsOverview from "../../components/Reservations/ReservationsOverview";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
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
                <div className='w-auto bg-primary px-1 rounded flex centered'>
                    {/* <h5 className='m-0 text-white'>X</h5> */}
                    <KeyboardArrowLeftIcon className='scale-2 white' />
                </div>
                {/* Align text vertically */}
                <div className='w-auto flex flex-col items-center'>
                    <Typography variant='h5'>My Reservations</Typography>
                </div>
            </div>
            <div className='flex w-80 justify-between mb-3'>
                <div className='bg-primary w-47 text-center'>
                    <h6 className='text-sm text-white my-1'>MANAGE CARS</h6>
                </div>

                <div className='bg-success w-47 text-center'>
                    <h6 className='text-sm text-white my-1'>NEW RESERVATION</h6>
                </div>
            </div>
            <ReservationsOverview reservations={reservations}></ReservationsOverview>
        </div>
    )
}

export default ReservationOverviewPage