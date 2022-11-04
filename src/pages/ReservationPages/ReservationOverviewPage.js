import React, { useContext, useEffect, useState } from 'react'
import { getReservationsByUser } from "../../services/ReservationService";
import ReservationsOverview from "../../components/Reservations/ReservationsOverview";
import { userContext } from '../../userContext';
import { useNavigate } from 'react-router-dom';

const ReservationOverviewPage = () => {

    const [reservations, setReservations] = useState([])
    const { user } = useContext(userContext)
    const navigate = useNavigate();
    useEffect(() => {
        console.log(user)

        async function AsignValue() {
            if (user != null) {
                setReservations(await getReservationsByUser(user.sub))
            }
        }
        AsignValue();
    }, [user])

    function createButtonCallback() {
        navigate("/reservations/create")
    }

    return (
        <div>
            <button className='btn btn-primary m-2' onClick={createButtonCallback}>Create Reservation</button>
            <ReservationsOverview reservations={reservations}></ReservationsOverview>
        </div>
    )
}

export default ReservationOverviewPage