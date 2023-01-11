import { useLocation } from 'react-router-dom';
import "../../../style/ReservationsPage.css";
import {
    TextField,
    FormControl,
    Button,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { userContext } from '../../../userContext';
import { useContext, useEffect, useState } from 'react';
import { goToCheckoutPage, getPaymentById, createPayment } from '../../../services/PaymentService';
import { putReservation, getReservationById } from '../../../services/ReservationService';


const ReceiptDetails = () => {
    const location = useLocation();
    const [Receipt, setReceipt] = useState(null)
    const navigate = useNavigate();


    useEffect(() => {
        console.log(location)
        setReceipt(location.state.Receipts[0])
    }, [])

    async function handlePayment(reservationId, cost) {
        let reservation;
        let paymentId;

        try {
            reservation = await getReservationById(reservationId);
            console.log("RESERVATION ID:");
            console.log(reservationId);
            paymentId = reservation.payment_id;
        } catch (error) {
            console.log(error);
        }

        try {
            const payment = await getPaymentById(paymentId);
            console.log("PAYMENT:");
            console.log(payment);
            if (payment.status == "open") {
                goToCheckoutPage(payment.links.checkout.href);
            } else if (payment.status == "paid") {
                navigate("/");
            } else {
                paymentId = null;
                reservation.payment_id = null;
            }

            if (paymentId == null) {
                const createdPayment = await createPayment(cost, reservation.id);
                console.log("CREATED PAYMENT:");
                console.log(createdPayment);
                reservation.Id = reservation.id
                reservation.payment_id = createdPayment.id;

                console.log("EDITED RESERVATION PAYMENT_ID TO" + reservation.payment_id);

                reservation.ArrivalTime = new Date(reservation.arrivalTime);
                reservation.DepartureTime = new Date(reservation.departureTime);

                // reservation.arrivalTime = new Date(reservation.arrivalTime);
                // reservation.departureTime = new Date(reservation.departureTime);

                // RESERVATION PAYMENT_ID IN DB WON'T EDIT
                const statusMessage = await putReservation(reservation, true);
                console.log("STATUS MESSAGE:");
                console.log(statusMessage);
                goToCheckoutPage(createdPayment.links.checkout.href);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            {Receipt != null ?
                <>
                    <div className="input-group mb-3">
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <Typography><b>ArrivalTime:</b> {dayjs(Receipt.ArrivalTime).format("DD-MM-YYYY HH:mm")}</Typography>
                        </FormControl>
                    </div>
                    <div className="input-group mb-3">
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <Typography><b>DepartureTime:</b> {dayjs(Receipt.DepartureTime).format("DD-MM-YYYY HH:mm")}</Typography>
                        </FormControl>
                    </div>
                    <div className="input-group mb-3">
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <Typography><b>Price:</b> {Receipt.Price === 0 ? 0.01 : Receipt.Price} Euro</Typography>
                        </FormControl>
                    </div>

                    <div className="input-group mb-3">
                        {Receipt.Status == "Paid" ? <></> :
                            <FormControl sx={{ m: 1 }}>
                                <Button sx={{ width: "100%" }}
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    className='w-full'
                                    onClick={() => { handlePayment(Receipt.Id, Receipt.Price === 0 ? 0.01 : Receipt.Price) }}>
                                    Pay fees
                                </Button>
                            </FormControl>
                        }

                    </div></> : <></>}


        </div>

    );
};

export default ReceiptDetails;
