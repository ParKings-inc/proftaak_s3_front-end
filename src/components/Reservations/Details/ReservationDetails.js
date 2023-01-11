import { useLocation } from 'react-router-dom';
import "../../../style/ReservationsPage.css";
import {
    TextField,
    FormControl,
    Button,
    Typography,
} from "@mui/material";
import { goToCheckoutPage, getPaymentById, createPayment } from '../../../services/PaymentService';
import { putReservation, getReservationById } from '../../../services/ReservationService';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useState, useEffect } from 'react';
import { getReceiptsByReservation } from '../../../services/ReceiptService';


const ReservationDetails = () => {
    const [stateShow, setstateShow] = useState(false);
    const [receipt, setReceipt] = useState(null);
    const location = useLocation();
    let reservation = location.state.reservation[0];
    const navigate = useNavigate();

    function UpdateReservation() {
        navigate("/reservation/Update", { state: { reservation: [reservation] } });
    }

    function CancelReservation() {
        navigate("/reservation/Delete", { state: { reservation: [reservation] } });
    }

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

    useEffect(() => {
        if (reservation.Status === "Awaiting payment") {
            setstateShow(true);
            getReceiptsByReservation(reservation.ReservationID).then((e) => {
                setReceipt(e);
                console.log(reservation)
                console.log(e);
            })
        }
    }, [])



    return (
        <div>
            {/* Get garage */}
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Typography><b>Garage:</b> {reservation.GarageName}</Typography>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Typography><b>LicensePlate:</b> {reservation.Kenteken}</Typography>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Typography><b>Parkingspace:</b> {reservation.SpaceID + "-" + reservation.SpaceFloor + "-" + reservation.SpaceRow}</Typography>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Typography><b>ArrivalTime:</b> {dayjs(reservation.ArrivalTime).format("DD-MM-YYYY HH:mm")}</Typography>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Typography><b>DepartureTime:</b> {dayjs(reservation.DepartureTime).format("DD-MM-YYYY HH:mm")}</Typography>
                </FormControl>
            </div>

            {reservation.Status === "Awaiting payment" ? null :
                <div className="input-group mb-3">
                    <FormControl sx={{ m: 1 }}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={CancelReservation}
                        >
                            Cancel
                        </Button>
                    </FormControl>
                    <FormControl sx={{ m: 1 }}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="success"
                            onClick={UpdateReservation}
                        >
                            Edit reservation
                        </Button>
                    </FormControl>
                </div>
            }
            {
                stateShow &&
                <Button sx={{ width: "100%" }}
                    variant="contained"
                    type="submit"
                    color="primary"
                    className='w-full'
                    onClick={() => { handlePayment(reservation.ReservationID, receipt.Price === 0 ? 0.01 : receipt.Price) }}>
                    Pay fees
                </Button>
            }


        </div>

    );
};

export default ReservationDetails;
