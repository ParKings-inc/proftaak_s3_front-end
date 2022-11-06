import React, { useState } from 'react'
import CreateReservationForm from '../../../components/Reservations/CreateReservationForm';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import "../../../style/ReservationsPage.css";
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ReservationsCreatePage = () => {
    const navigate = useNavigate();

    function Back() {
        navigate("/Reservations")
    }

    return (
        <div className="center mt-25">
            <div className='flex row mb-25'>
                {/* Change Icon */}
                <div className='w-auto bg-primary px-1 rounded flex centered'>
                    {/* <h5 className='m-0 text-white'>X</h5> */}
                    <KeyboardArrowLeftIcon onClick={Back} className='scale-2 white' />
                </div>
                {/* Align text vertically */}
                <div className='w-auto flex flex-col items-center'>
                    <Typography variant='h5'>New reservation</Typography>
                </div>
            </div>
            <CreateReservationForm></CreateReservationForm>
        </div>
    )
}

export default ReservationsCreatePage