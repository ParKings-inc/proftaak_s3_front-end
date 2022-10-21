import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { TextField, FormControl, InputLabel, OutlinedInput } from '@mui/material';
//import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const ReservationsCreatePage = () => {
    const [dateValue, setDateValue] = useState();
    return (

        <div style={{ backgroundColor: "blue" }} class="container">
            <h1>ReservationsCreatePage</h1>
            <form style={{ backgroundColor: "red", alignContent: 'center' }} class="m-2 row g-3">
                <br />
                <div class="row justify-content-md-center">
                    <div style={{ backgroundColor: "yellow" }} class="col-md-6">
                        <div class="m-2 mb-3">
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField label="kenteken" required placeholder="Kenteken" htmlFor="Kenteken-input">Kenteken</TextField>
                            </FormControl>
                        </div>
                        <div class="m-2 input-group mb-3">
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="Begintijd"
                                        value={dateValue}
                                        onChange={(newValue) => {
                                            setDateValue(newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </div>
                        <div class="m-2 input-group mb-3">
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="Eindtijd"
                                        value={dateValue}
                                        onChange={(newValue) => {
                                            setDateValue(newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ReservationsCreatePage