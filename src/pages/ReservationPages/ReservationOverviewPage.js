import React, { useEffect, useState } from 'react'
import { getAllReservations } from "../../services/ReservationService";
import ReservationsOverview from "../../components/Reservations/ReservationsOverview";

const ReservationOverviewPage = () => {

    useEffect(() => {
        async function AsignValue(){
            setReservations( await getAllReservations())
        }
        AsignValue();
    }, [])
    const [reservations, setReservations] = useState([])


    return (
        <div>
            <ReservationsOverview reservations={reservations}></ReservationsOverview>
        </div>
    )
}

export default ReservationOverviewPage