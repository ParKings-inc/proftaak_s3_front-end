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

const UpdateReservation = (props) => {
    const [LicensePlate, setLicensePlate] = useState("");
    const [ArrivalTime, setArrivalTime] = useState(null);
    const [DepartureTime, setDepartureTime] = useState(null);
    const [TotalLicensePlate, setTotalLicensePlate] = useState([]);
    const { user } = useContext(userContext);
    const navigate = useNavigate();
    let reservation = props.reservation;
    useEffect(() => {
        async function AsignValue() {
            setArrivalTime(reservation.ArrivalTime);
            setDepartureTime(reservation.DepartureTime);
            if (user !== null) {
                setTotalLicensePlate(await getCarByUserId(user.sub));
            }
        }
        AsignValue();
    }, [user]);

    useEffect(() => {
        if (TotalLicensePlate.length > 0)
            setLicensePlate(TotalLicensePlate[0].kenteken);
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
                    1
                );

                if (AllSpaces.length > 0) {
                    let reservationbody = {
                        Id: reservation.Id,
                        spaceID: AllSpaces[0].ID,
                        carID: car,
                        Status: "Pending",
                        ArrivalTime: dayjs(ArrivalTime),
                        DepartureTime: dayjs(DepartureTime),
                    };

                    try {
                        //update instead of post
                        if (await putReservation(reservationbody) !== 404) {
                            alert("reservation has been made ");
                        }
                        else {
                            alert("You already have a reservation around this time for this license plate");
                        }
                    } catch (error) {
                        console.log(error);
                    }
                    navigate("/reservations");
                } else {
                    alert("No available spaces for this time " + AllSpaces.length);
                    console.log("Not a valid reservation");
                }
            }
            else {   // update reservation without question. The space will remain the same.
                //update 
                let reservationbody = {
                    Id: reservation.Id,
                    spaceID: reservation.spaceID,
                    carID: car,
                    Status: "Pending",
                    ArrivalTime: ArrivalTime,
                    DepartureTime: DepartureTime,
                };
                try {
                    await putReservation(reservationbody);
                    console.log(reservationbody);
                    alert("reservation has been updated");
                } catch (error) {
                    console.log(error)
                }

                navigate("/reservations");
            }
        }
        else {
            alert("Make sure all fields are answered.")
        }
        // navigate("/reservations");
    }


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
