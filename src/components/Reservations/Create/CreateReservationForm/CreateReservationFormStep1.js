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
import { userContext } from "../../../../userContext";
import {
  getCarByUserId,
  getCarIdByLicensePlate,
} from "../../../../services/CarService";
import { postReservation } from "../../../../services/ReservationService";
import { getReservationAvailableSpaces } from "../../../../services/ReservationService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllGarage } from "../../../../services/GarageService"
import FreeSpaceDisplay from "../../../FreeSpaceDisplay";
import AvailableSpaceDisplay from "../../../AvailableSpaceDisplay";
import { getFreeSpaces } from "../../../../services/ParkingService";

const CreateReservationFormStep1 = () => {
  const [LicensePlate, setLicensePlate] = useState("");
  const [Garage, setGarage] = useState(null);
  const [ArrivalTime, setArrivalTime] = useState(null);
  const [OpeningTime, setOpeningTime] = useState(null);
  const [ClosingTime, setClosingTime] = useState(null);
  const [DepartureTime, setDepartureTime] = useState(null);
  const [TotalLicensePlate, setTotalLicensePlate] = useState([]);
  const [TotalGarage, setTotalGarage] = useState([]);
  const [AvailableSpaces, setAvailableSpaces] = useState(null);
  const { user } = useContext(userContext);
  const [updateDisplay, setUpdateDisplay] = useState(false);
  const [TotalSpaces, setTotalSpaces] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function AsignGarages() {
      setTotalGarage(await getAllGarage())
    }
    async function AsignValue() {
      if (user !== null) {
        setTotalLicensePlate(await getCarByUserId(user.sub));
      }
    }
    AsignValue();
    AsignGarages();

  }, [user]);

  useEffect(() => {
    async function AssignTotalSpaces() {
      if (Garage != null)
        setTotalSpaces(await getFreeSpaces(Garage.id));
      setOpeningTime(dayjs(Garage.openingTime));
      setClosingTime(dayjs(Garage.closingTime));
    }
    AssignTotalSpaces();

  }, [Garage])

  useEffect(() => {
    async function AssignAvailableSpaces() {
      if (Garage != null && ArrivalTime != null && DepartureTime != null) {
        setAvailableSpaces(await getReservationAvailableSpaces(ArrivalTime, DepartureTime, Garage.id));
      }
    }
    AssignAvailableSpaces();
    setUpdateDisplay(false)
  }, [updateDisplay])




  useEffect(() => {
    if (TotalLicensePlate.length > 0)
      setLicensePlate(TotalLicensePlate[0].kenteken);
  }, [TotalLicensePlate]);

  async function ClaimSpot(e) {
    e.preventDefault();




    if (ArrivalTime != null && DepartureTime != null && LicensePlate != "") {

      let allSpaces = await getReservationAvailableSpaces(
        ArrivalTime,
        DepartureTime,
        Garage.id
      )

      let car = await getCarIdByLicensePlate(LicensePlate);

      if (allSpaces.length > 0) {
        let reservationbody = {
          spaceID: allSpaces[0].ID,
          carID: car,
          ArrivalTime: ArrivalTime,
          DepartureTime: DepartureTime,
          Status: "Pending",
        };

        try {
          let response = await postReservation(reservationbody);
          if (response.id >= 0) {
            toasrMessage("success", "Reservation succesfully created");
            navigate("/reservations");
          } else {
            toasrMessage("error", response);
          }
        } catch (error) {
          toasrMessage("error", "Reservation Failed");
        }
      } else {
        toasrMessage("error", "No free spaces left");
      }
    } else {
      toasrMessage("error", "Please fill in all fields")
    }



    // navigate("/reservations");
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

  function CancelReservation() {
    navigate("/reservations");
  }



  return (
    <>

      <div className="row justify-content-md-center">
        <div style={{ "text-align": "center" }}>
          <p style={{ "color": "grey" }}>Available parking spaces visible after filling in garage and time</p>
          {OpeningTime != null ? (<p>Selected Garage open from {OpeningTime.format("HH:mm")} till {ClosingTime.format("HH:mm")}</p>) : <></>}
        </div>

        <div className="input-group mb-3">
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-label">Garage</InputLabel>
            <Select
              labelId="Garage"
              id="Garage"
              name="Garage"
              value={Garage != null ? Garage.id : null}
              label="Garage"
              onChange={(newValue) => {
                setGarage(TotalGarage.find(x => x.id == newValue.target.value));
                setUpdateDisplay(true);
              }}
            >
              {TotalGarage.map((garage) => {
                return (
                  <MenuItem key={garage.name} value={garage.id}>
                    {garage.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
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
                  console.log(newValue)
                  setArrivalTime(newValue);
                }}

                onAccept={(newValue) => {
                  setUpdateDisplay(true);
                }}
                minDate={dayjs(new Date())}
                minTime={Garage != null ? OpeningTime : null}
                maxTime={Garage != null ? ClosingTime : null}
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
                  console.log(ClosingTime)
                  setDepartureTime(newValue);
                }}
                onAccept={(newValue) => {
                  setUpdateDisplay(true);
                }}
                minTime={ArrivalTime}
                minDate={ArrivalTime}
                maxTime={Garage != null ? ClosingTime : null}
                required
                disabled={ArrivalTime == null}
              />
            </LocalizationProvider>
          </FormControl>
        </div>
        {Garage != null && ArrivalTime != null && DepartureTime != null && AvailableSpaces != null ? <AvailableSpaceDisplay totalSpaces={TotalSpaces} freeSpaces={AvailableSpaces.length}></AvailableSpaceDisplay> : <></>}

        <div className="input-group mb-3">
          <FormControl sx={{ m: 1 }}>
            <Button
              variant="outlined"
              onClick={CancelReservation}
              color="error"
            >
              Back
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
    </>
  );
};

export default CreateReservationFormStep1;
