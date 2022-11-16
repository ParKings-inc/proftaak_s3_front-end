import { useLocation } from 'react-router-dom';
import "../../../style/ReservationsPage.css";
import {
    TextField,
    FormControl,
    Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReservationDetails = () => {
    const location = useLocation();
    let reservation = location.state.reservation[0];
    const navigate = useNavigate();

    const date = //"2022-11-17T13:05:00"; // <-- test date
        dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss");

    // logic should be changed once our scanner simulation is complete. Perhaps you should be able to cancel or update a reservation based on wheter you are in the garage or not.
    // instead of checking based of the time of a reservation.

    function UpdateReservation() {
        if (date < reservation.ArrivalTime) {
            navigate("/reservation/Update", { state: { reservation: [reservation] } });
        } else if (date > reservation.ArrivalTime) {
            toasrMessage("error", "Cannot update a active reservation.");
        }
    }

    function CancelReservation() {
        if (date < reservation.ArrivalTime) {
            navigate("/reservation/Delete", { state: { reservation: [reservation] } });
        } else if (date > reservation.ArrivalTime) {
            toasrMessage("error", "Cannot cancel a active reservation.");
        }
    }

    // toastr
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
                    <TextField value={reservation.GarageName} InputProps={{
                        readOnly: true,
                    }}></TextField>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    LicensePlate:
                    <TextField value={reservation.Kenteken} InputProps={{
                        readOnly: true,
                    }}></TextField>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    Parkingspace:
                    <TextField value={reservation.SpaceID + "-" + reservation.SpaceFloor + "-" + reservation.SpaceRow} InputProps={{
                        readOnly: true,
                    }}></TextField>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    ArrivalTime:
                    <TextField value={dayjs(reservation.ArrivalTime).format("DD-MM-YYYY HH:mm")} InputProps={{
                        readOnly: true,
                    }}></TextField>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    DepartureTime:
                    <TextField value={dayjs(reservation.DepartureTime).format("DD-MM-YYYY HH:mm")} InputProps={{
                        readOnly: true,
                    }}></TextField>
                </FormControl>
            </div>

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
        </div>

    );
};

export default ReservationDetails;
