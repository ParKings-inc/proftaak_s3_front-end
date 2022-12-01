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

const ReservationDetails = () => {
    const location = useLocation();
    let reservation = location.state.reservation[0];
    const navigate = useNavigate();

    function UpdateReservation() {
        navigate("/reservation/Update", { state: { reservation: [reservation] } });
    }

    function CancelReservation() {
        navigate("/reservation/Delete", { state: { reservation: [reservation] } });
    }


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
