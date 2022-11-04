import dayjs, { Dayjs } from 'dayjs';
import { TextField, FormControl, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateReservationFormStep1 = () => {

    const [LicensePlate, setLicensePlate] = useState();
    const [ArrivalTime, setArrivalTime] = useState(null);
    const [DepartureTime, setDepartureTime] = useState(null);
    const navigate = useNavigate();

    function CancelReservation() {
        navigate("/reservations")
    }
    function SubmitCheckAvailableSpacesAndRedirectToStep2() {
        if (LicensePlate != null && ArrivalTime != null && DepartureTime != null) {
            navigate(`/reservations/availableSpaces/${LicensePlate}/${dayjs(ArrivalTime.$d).format('D MMM YYYY HH:mm')}/${dayjs(DepartureTime.$d).format('D MMM YYYY HH:mm')}/${1}`)
        }
    }

    return (
        <div className="row justify-content-md-center">
            <div className="col-md-6">
                <div className="input-group mb-3">
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField label="Licenseplate number"
                            onChange={(newValue) => {
                                setLicensePlate(newValue.target.value);
                            }}
                            required
                            placeholder="licenseplate number"
                            htmlFor="Kenteken-input">
                        </TextField>
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
                        <Button variant="outlined" onClick={CancelReservation} color="error">Cancel</Button>
                    </FormControl>
                    <FormControl sx={{ m: 1 }}>
                        <Button variant="contained" type="submit" onClick={SubmitCheckAvailableSpacesAndRedirectToStep2} color="success">Next</Button>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}

export default CreateReservationFormStep1
