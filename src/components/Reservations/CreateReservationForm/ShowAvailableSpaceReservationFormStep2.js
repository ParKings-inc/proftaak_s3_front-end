import React, { useState } from 'react'
import { Button } from '@mui/material'
import { postReservation } from '../../../services/ReservationService'
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
const ShowAvailableSpaceReservationFormStep2 = (props) => {
    let spaces;
    const navigate = useNavigate();
    async function ClaimSpot(spaceID, carID, ArrivalTime, DepartureTime) {
        alert("reservation has been made " + ArrivalTime + " " + DepartureTime + " " + spaceID + " " + carID);
        await postReservation(spaceID, carID, dayjs(ArrivalTime).format('YYYY-MM-DDTHH:mm:00.000Z'), dayjs(DepartureTime).format('YYYY-MM-DDTHH:mm:00.000Z'));
        // navigate("/reservations");
    }
    if (props.AvailableSpaces != undefined && props.AvailableSpaces != null && Array.isArray(props.AvailableSpaces)) {
        console.log(props.AvailableSpaces)
        // if the available spaces array is empty return a message to let the user know
        spaces = <div> {props.AvailableSpaces.map(AvailableSpace => {

            return (
                <div key={AvailableSpace.ID}>
                    <h3>Space:  {' ' + AvailableSpace.ID}</h3>
                    <br />
                    <li>
                        <b> Space GarageID:</b>  {' ' + AvailableSpace.GarageID}
                    </li>
                    <li >
                        <b>  Space Floor:</b>  {' ' + AvailableSpace.Floor}
                    </li>
                    <li >
                        <b> Space Row:</b> {' ' + AvailableSpace.Row}
                    </li>
                    <li >
                        <b> Space Spot:</b> {' ' + AvailableSpace.Spot}
                    </li>
                    <Button onClick={() => { ClaimSpot(AvailableSpace.ID, 1, props.ArrivalTime, props.DepartureTime) }}>Reserve this space</Button>
                    <hr />
                </div>
            )
        })}</div>
    }
    else {
        // do something fun like some shadow boxes to signal that they're loading
        spaces = <div>Geen available spaces</div>
    }

    return (
        <div className="row">
            <div className="row justify-content-md-center">
                <Button onClick={() => { console.log("from step 2 " + props.DepartureTime + " " + props.ArrivalTime) }}>grappen</Button>
                {spaces}
            </div>
        </div>
    )
}

export default ShowAvailableSpaceReservationFormStep2
