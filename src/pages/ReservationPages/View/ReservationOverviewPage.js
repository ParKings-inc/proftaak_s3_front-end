
import React, { useContext, useEffect, useState, useRef } from 'react'
import { getReservationsByUser, getReservationById, putReservation } from "../../../services/ReservationService";
import ReservationsOverview from "../../../components/Reservations/ReservationsOverview";
import { createPayment, getPaymentById, goToCheckoutPage, getRevenue } from "../../../services/PaymentService";

import AccountService from "../../../services/AccountService";
import { toast } from 'react-toastify';
import { HubConnectionBuilder } from '@microsoft/signalr';

import { userContext } from '../../../userContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import "../../../style/ReservationsPage.css";
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { getAllReservations } from '../../../services/ReservationService';



const ReservationOverviewPage = () => {
    const user = useContext(userContext);
    const service = new AccountService();
    const toastrShownRef = useRef(false);
    const [reservations, setReservations] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [date, setDate] = useState();
    const navigate = useNavigate();

    function toasrMessage(message) {
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        })
    }

    function toastrMessageError(message) {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        })
    }


    useEffect(() => {
        async function AsignValue() {



            setReservations(await getReservationsByUser(service.parseJwt(service.getUser()).sub))

        }

        if (toastrShownRef.current) return;
        toastrShownRef.current = true;

        const ridParam = searchParams.get("rid");
        async function CheckForPayment() {

            if (ridParam != null) {
                try {
                    const reservation = await getReservationById(ridParam);
                    const payment = await getPaymentById(reservation.payment_id);

                    if (payment.status == "paid") {
                        reservation.status = "Paid";
                        reservation.Id = reservation.id;
                        reservation.arrivalTime = new Date(reservation.arrivalTime);
                        reservation.departureTime = new Date(reservation.departureTime);

                        reservation.ArrivalTime = new Date(reservation.arrivalTime);
                        reservation.DepartureTime = new Date(reservation.departureTime);

                        console.log(reservation)
                        const message = await putReservation(reservation, true);
                        toasrMessage("You have succesfully paid");
                        //WebSocket
                        getRevenue(date)
                        getAllReservations();
                    }

                    if (payment.status != "paid") {
                        toastrMessageError("You have not paid");
                    }

                } catch (error) {
                    console.log(error);
                }
                navigate('/');
            }
        }
        AsignValue();
        CheckForPayment();
    }, [user])

    useEffect(() => {

        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:7205/hubs/reservation')
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(result => {
                console.log('Connected!');

                connection.on('ReceiveUpdatedStatus', message => {
                    console.log(message);

                    setReservations(message)
                });
            })
            .catch(e => console.log('Connection failed: ', e));
    }, []);


    function Home() {
        navigate("/")
    }

    function createButtonCallback() {
        navigate("/reservations/create")
    }

    function goToHome() {
        navigate("/");
    }

    return (

        <div className='center mt-25'>
            <div className='flex row mb-25'>

                <div onClick={goToHome} className='w-auto bg-primary px-1 rounded flex centered'>
                    {/* <h5 className='m-0 text-white'>X</h5> */}
                    <KeyboardArrowLeftIcon onClick={Home} className='scale-2 white' />
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