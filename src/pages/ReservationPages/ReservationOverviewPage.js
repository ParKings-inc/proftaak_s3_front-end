import React, { useEffect, useState, useContext } from 'react'
import { getAllReservations } from "../../services/ReservationService";
import ReservationsOverview from "../../components/Reservations/ReservationsOverview";

import { userContext } from '../../userContext';
import { useNavigate } from 'react-router-dom';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import "../../style/ReservationsPage.css";
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { userContext } from '../../userContext';


const ReservationOverviewPage = () => {
    const user = useContext(userContext);

    const [reservations, setReservations] = useState([])
    const { user } = useContext(userContext)
    const navigate = useNavigate();
    useEffect(() => {
        async function AsignValue() {
            if (user != null) {
                setReservations(await getReservationsByUser(user.user.sub))
            }
        }
        AsignValue();
    }, [user])

    function createButtonCallback() {
        navigate("/reservations/create")
    }

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
                <Link to="/carpage" className='bg-primary w-47 text-center'>
                    <h6 className='text-sm text-white my-1'>MANAGE CARS</h6>
                </Link>
                
                <Link to="/reservations/create" className='bg-success w-47 text-center decoration-none'>
                    <h6 className='text-sm text-white my-1'>NEW RESERVATION</h6>
                </Link>

            </div>

            <ReservationsOverview reservations={reservations}></ReservationsOverview>
        </div>
    )
}

export default ReservationOverviewPage