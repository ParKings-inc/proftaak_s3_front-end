import dayjs from "dayjs";
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
import { userContext } from "../../../userContext";
import {
  getCarByUserId,
  getCarIdByLicensePlate,
} from "../../../services/CarService";
import { postReservation } from "../../../services/ReservationService";
import { getReservationAvailableSpaces } from "../../../services/ReservationService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateReservationFormStep1 = () => {
  const [LicensePlate, setLicensePlate] = useState("");
  const [ArrivalTime, setArrivalTime] = useState(null);

  const [DepartureTime, setDepartureTime] = useState(null);
  const [TotalLicensePlate, setTotalLicensePlate] = useState([]);
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function AsignValue() {
      if (user != null) {
        setTotalLicensePlate(await getCarByUserId(user.sub));
      }
    }
    AsignValue();
  }, [user]);

  useEffect(() => {
    if (TotalLicensePlate.length > 0)
      setLicensePlate(TotalLicensePlate[0].kenteken);
  }, [TotalLicensePlate]);

  async function ClaimSpot(e) {
    e.preventDefault();

    if (ArrivalTime != null && DepartureTime != null && LicensePlate != "") {
      let AllSpaces = await getReservationAvailableSpaces(
        ArrivalTime,
        DepartureTime,
        1
      );
      let car = await getCarIdByLicensePlate(LicensePlate);

      if (AllSpaces.length > 0) {
        let reservationbody = {
          spaceID: AllSpaces[0].ID,
          carID: car,
          ArrivalTime: ArrivalTime,
          DepartureTime: DepartureTime,
          Status: "Pending",
        };

        try {
          let response = await postReservation(reservationbody);
          if (response.id >= 0) {
            toast.success("Reservation Success", {
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
          navigate("/reservations");
        } catch (error) {
          toast.error("Reservation Failed", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          })
          console.log(error);
        }
      } else {
        toast.error("No free spaces left", {
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
    } else {
      toast.error("Please fill in all fields", {
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



    // navigate("/reservations");
  }

  function CancelReservation() {
    navigate("/reservations");
  }

  

  return (
    <>

      <div className="row justify-content-md-center">
        <div className="col-md-6">
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
                  minDateTime={dayjs(new Date())}
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
                  value={DepartureTime == null ? ArrivalTime : DepartureTime}
                  onChange={(newValue) => {
                    setDepartureTime(newValue);
                  }}
                  minDateTime={ArrivalTime}
                  required
                  disabled={ArrivalTime == null}
                />
              </LocalizationProvider>
            </FormControl>
          </div>
          <div className="input-group mb-3">
            <FormControl sx={{ m: 1 }}>
              <Button
                variant="outlined"
                onClick={CancelReservation}
                color="error"
              >
                Cancel
              </Button>
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <Button
                variant="contained"
                type="submit"
                onClick={ClaimSpot}
                color="success"
              >
                Create
              </Button>
            </FormControl>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateReservationFormStep1;
