import React, { useEffect } from 'react'
import { getAllReservations } from "../../services/ReservationService";
import "../../style/ReservationsPage.css";

const ReservationOverviewPage = (props) => {

    let empty = []
    console.log(props)
    return (
        <div className='w-65'>
            {props.reservations.map(reservatie => {
                return (
                    <div>
                        <h3>Reservation:  {' ' + reservatie.id}</h3>
                        <br />
                        <li>
                            <b> Reservation spaceID:</b>  {' ' + reservatie.spaceID}
                        </li>
                        <li>
                            <b> Reservation carID:</b>  {' ' + reservatie.carID}
                        </li>
                        <li>
                            <b>  Reservation arrivalTime:</b>  {' ' + reservatie.arrivalTime}
                        </li>
                        <li>
                            <b> Reservation departureTime:</b> {' ' + reservatie.departureTime}
                        </li>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}

export default ReservationOverviewPage

