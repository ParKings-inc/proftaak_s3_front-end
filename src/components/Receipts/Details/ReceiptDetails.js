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

const ReceiptDetails = () => {
    const location = useLocation();
    let Receipts = location.state.Receipts[0];


    return (
        <div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Typography><b>ArrivalTime:</b> {dayjs(Receipts.ArrivalTime).format("DD-MM-YYYY HH:mm")}</Typography>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Typography><b>DepartureTime:</b> {dayjs(Receipts.DepartureTime).format("DD-MM-YYYY HH:mm")}</Typography>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Typography><b>Price:</b> {Receipts.Price}</Typography>
                </FormControl>
            </div>

            <div className="input-group mb-3">
                <FormControl sx={{ m: 1 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        color="success"
                    >
                        Betalen
                    </Button>
                </FormControl>
            </div>
        </div>

    );
};

export default ReceiptDetails;
