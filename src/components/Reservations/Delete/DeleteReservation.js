import "../../../style/ReservationsPage.css";
import {
    TextField,
    FormControl,
    Button,
    Modal,
    Box,
    Typography
} from "@mui/material";
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { deleteReservation } from '../../../services/ReservationService'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteReservation = (props) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    let reservation = props.reservation;
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    async function CancelReservation() {
        await deleteReservation(reservation.ReservationID);
        // Make into toaster
        toasrMessage("success", "Your reservation has been canceled.");
        navigate("/reservations");
    }


    function toasrMessage(type, message) {
        if (type == "error") {
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
        } else {
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
    }

    return (
        <div>
            {/* Get garage */}
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    Garage:
                    <TextField value={"Garage"} InputProps={{
                        readOnly: true,
                    }}></TextField>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    LicensePlate:
                    <TextField value={"License plate"} InputProps={{
                        readOnly: true,
                    }}></TextField>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    Parkingspace:
                    <TextField value={"space"} InputProps={{
                        readOnly: true,
                    }}></TextField>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    ArrivalTime:
                    <TextField value={reservation.ArrivalTime} InputProps={{
                        readOnly: true,
                    }}></TextField>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    DepartureTime:
                    <TextField value={reservation.DepartureTime} InputProps={{
                        readOnly: true,
                    }}></TextField>
                </FormControl>
            </div>

            <div className="input-group mb-3">
                <FormControl sx={{ m: 1 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        color="error"
                        onClick={handleOpen}
                    >
                        Yes, cancel this reservation
                    </Button>
                </FormControl>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <EventBusyIcon color={"error"} />
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure?
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        Your reservation will be removed from the garage. You can not undo this process.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Garage:garage , LicensePlate: LicensePlate,  ArrivalTime: {reservation.ArrivalTime} , DepartureTime: {reservation.DepartureTime}
                    </Typography>
                    <Button
                        variant="contained"
                        type="submit"
                        style={{
                            backgroundColor: "#9e9e9e",
                        }}
                        onClick={handleClose}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        color="error"
                        onClick={CancelReservation}
                    >
                        cancel reservation
                    </Button>
                </Box>
            </Modal>
        </div>

    );
};

export default DeleteReservation;
