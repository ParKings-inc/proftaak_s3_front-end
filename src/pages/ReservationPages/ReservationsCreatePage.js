import React, { useState } from 'react'
import CreateReservationForm from '../../components/Reservations/CreateReservationForm';
const ReservationsCreatePage = () => {
    const [dateValue, setDateValue] = useState();
    return (
        <div className="container">
            <h1>New reservation</h1>
            <CreateReservationForm></CreateReservationForm>
        </div>
    )
}

export default ReservationsCreatePage