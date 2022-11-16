import dayjs from "dayjs";
// import Typography from '@mui/material/Typography';
import "../../../style/ReservationsPage.css";
import {
    TextField,
    FormControl,
    Button,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../userContext"
import {
    getCarByUserId,
    getCarIdByLicensePlate,
} from "../../../services/CarService";
import { putReservation } from "../../../services/ReservationService";
import { getReservationAvailableSpaces } from "../../../services/ReservationService";
import { width } from "@mui/system";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateReservation = (props) => {
    const [LicensePlate, setLicensePlate] = useState("");
    const [ArrivalTime, setArrivalTime] = useState(null);
    const [DepartureTime, setDepartureTime] = useState(null);
    const [TotalLicensePlate, setTotalLicensePlate] = useState([]);
    const [LicensePlateLabel, setLicensePlateLabel] = useState(null);
    const { user } = useContext(userContext);
    const navigate = useNavigate();
    let reservation = props.reservation;
    useEffect(() => {

        async function AsignValue() {
            setLicensePlate(reservation.Kenteken);
            setArrivalTime(reservation.ArrivalTime);
            setDepartureTime(reservation.DepartureTime);
            if (user !== null) {
                setTotalLicensePlate(await getCarByUserId(user.sub));
            }
        }
        AsignValue();
    }, [user]);

    useEffect(() => {
        // if (TotalLicensePlate.length > 0)
        // setLicensePlate(TotalLicensePlate[0].kenteken);
    }, [TotalLicensePlate]);



    async function updateReservationClick(e) {
        // check if all fields are answered
        if (ArrivalTime !== null && DepartureTime !== null && LicensePlate !== null) {
            // compare new times to old times to see if times have changed, if yes check for new spaces. Otherwise the user has only changed the license plate, which is allowed without question
            // TODO:  Make sure car is eligiable for the space type.

            let car = await getCarIdByLicensePlate(LicensePlate);

            if (ArrivalTime !== reservation.ArrivalTime || DepartureTime !== reservation.DepartureTime) {
                e.preventDefault();
                let AllSpaces = await getReservationAvailableSpaces(
                    ArrivalTime,
                    DepartureTime,
                    reservation.GarageID
                );

                if (AllSpaces.length > 0) {
                    let reservationbody = {
                        Id: reservation.ReservationID,
                        spaceID: AllSpaces[0].ID,
                        carID: car,
                        Status: "Pending",
                        ArrivalTime: dayjs(ArrivalTime),
                        DepartureTime: dayjs(DepartureTime),
                    };

                    try {
                        var response = await putReservation(reservationbody)

                        if (response === "success") {
                            toasrMessage("success", "Reservation updated successfully");
                            navigate("/reservations");
                        }
                        else {
                            toasrMessage("error", response);
                        }
                    } catch (error) {
                        toasrMessage("error", error.response.data);
                    }

                } else {
                    toasrMessage("error", "No spaces available for this time");
                }
            }
            else {   // update reservation without question. The space will remain the same.
                //update 

                let reservationbody = {
                    Id: reservation.ReservationID,
                    spaceID: reservation.SpaceID,
                    carID: car,
                    Status: "Pending",
                    ArrivalTime: dayjs(ArrivalTime),
                    DepartureTime: dayjs(DepartureTime),
                };
                try {
                    var response = await putReservation(reservationbody)
                    console.log("under here");
                    console.log(reservationbody);
                    if (response === "success") {
                        toasrMessage("success", "Reservation updated successfully");
                        navigate("/reservations");
                    }
                    else {
                        toasrMessage("error", response);
                    }
                } catch (error) {
                    toasrMessage("error", error.response.data);
                }

            }
        }
        else {
            alert("Make sure all fields are answered.")
        }
    }

    function toasrMessage(type, message) {
        if (type === "error") {
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



    console.log(reservation);


    return (
        <div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel id="demo-simple-select-label">LicensePlate</InputLabel>
                    <Select
                        labelId="LicensePlate"
                        id="LicensePlate"
                        name="LicensePlate"
                        value={LicensePlate}
                        label="LicensePlate"
                        onChange={(newValue) => {
                            console.log(newValue);
                            console.log(reservation);
                            setLicensePlate(newValue.target.value);
                        }}
                    >
                        {TotalLicensePlate.map((v) => {
                            return (
                                <MenuItem key={v.kenteken} value={v.kenteken}>
                                    {v.kenteken}
                                </MenuItem>
                            );
                        })}

                    </Select>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Arrival time"
                            ampm={false}
                            value={ArrivalTime}
                            onChange={(newValue) => {
                                setArrivalTime(newValue);
                            }}
                            minDate={dayjs(new Date())}
                            required
                        />
                    </LocalizationProvider>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl fullWidth sx={{ m: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="departure time"
                            ampm={false}
                            value={DepartureTime}
                            onChange={(newValue) => {
                                setDepartureTime(newValue);
                            }}
                            minDate={dayjs(new Date())}
                            required
                        />
                    </LocalizationProvider>
                </FormControl>
            </div>
            <div className="input-group mb-3">
                <FormControl sx={{ m: 1 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        color="success"
                        onClick={updateReservationClick}
                    >
                        Confirm reservation changes
                    </Button>
                </FormControl>
                {/* Dont think you need a back btn, but possible to make it more consistent with the other pages */}
                {/* <FormControl sx={{ m: 1 }}>
                    <Button
                        variant="outlined"
                        type="submit"
                        color="error"
                    >
                        Cancel
                    </Button>
                </FormControl> */}
            </div>
        </div>

    );
};

export default UpdateReservation;
