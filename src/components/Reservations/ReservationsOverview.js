import React, { useEffect } from 'react'
import { getAllReservations } from "../../services/ReservationService";

const ReservationOverview = (props) => {

    let empty = []
    return (

        <div>
            <ul>
                <hr />
                {props.reservations.map(reservatie => {
                    return (
                        <div>
                            <h3>Reservation:  {' ' + reservatie.Id}</h3>
                            <br />
                            <li>
                                <b> Reservation spaceID:</b>  {' ' + reservatie.SpaceID}
                            </li>
                            <li>
                                <b> Reservation carID:</b>  {' ' + reservatie.CarID}
                            </li>
                            <li>
                                <b>  Reservation arrivalTime:</b>  {' ' + reservatie.ArrivalTime}
                            </li>
                            <li>
                                <b> Reservation departureTime:</b> {' ' + reservatie.DepartureTime}
                            </li>
                            <hr />
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default ReservationOverview

