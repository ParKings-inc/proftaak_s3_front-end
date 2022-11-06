import { useLocation } from 'react-router-dom';
import "../../../style/ReservationsPage.css";
import {
    TextField,
    FormControl,
    Button,
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
                        variant="outlined"
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
