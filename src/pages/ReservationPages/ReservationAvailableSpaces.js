import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ShowAvailableSpaceReservationFormStep2 from '../../components/Reservations/CreateReservationForm/ShowAvailableSpaceReservationFormStep2';
import { getReservationAvailableSpaces } from '../../services/ReservationService';
import { Button } from '@mui/material';
const ReservationOverviewPage = () => {

    const { LicensePlate, ArrivalTime, DepartureTime, GarageId } = useParams()
    const [AvailableSpaces, setAvailableSpaces] = useState([]);
    useEffect(() => {
        async function AsignValue() {
            setAvailableSpaces(await getReservationAvailableSpaces(ArrivalTime, DepartureTime, GarageId))
        }
        AsignValue();
    }, [])


    return (
        <div className="container">
            <h1>Available spaces for time {ArrivalTime + ' - ' + DepartureTime} </h1>
            <ShowAvailableSpaceReservationFormStep2 LicensePlate={LicensePlate} ArrivalTime={ArrivalTime} DepartureTime={DepartureTime} AvailableSpaces={AvailableSpaces} />
        </div>
    )
}

export default ReservationOverviewPage