import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';
import dayjs from "dayjs";
import { getRevenue } from '../services/RevenueService';

const WebSocketsGetSpacePage = () => {
    const [ spaces, setSpaces ] = useState([]);
    const [date, setDate] = useState();
    const [revenue, setRevenue] = useState(0);
    const latestPlaces = useRef(null);

    latestPlaces.current = spaces;

    const isInitialMount = useRef(true);

    useEffect(() => {
        getRevenue(date).then((e) => {
          console.log(e);
          setRevenue(e.data);
        });
      }, [date]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return
        }

        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:7205/hubs/spaces')
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(result => {
                console.log('Connected!');

                connection.on('ReceiveAvailableSpaces', message => {
                    const updatedSpaces = [...latestPlaces.current];
                    updatedSpaces.push(message);

                    console.log('received spaces', message);

                    setSpaces(updatedSpaces);
                });
            })
            .catch(e => console.log('Connection failed: ', e));
        isInitialMount.current = true;
    }, []);

    const requestSpaces = async () => {
        try {
            await axios.get("https://localhost:7205/api/Spaces/garage/2")
                    .then((Response) => console.log(Response));
        }
        catch(e) {
            console.log('Sending spaces failed.', e);
        }
    }

    const ChangeRevenue = async () => {
        try {
            await axios.get(`https://localhost:7205/api/Receipts/byday/${dayjs(date).format("YYYY-MM-DD")}`)
                    .then((Response) => console.log(Response));
        }
        catch(e) {
            console.log('Changing revenue failed.', e);
        }
    }

  return (
    <>
    <button onClick={requestSpaces}>spaces</button>
    <button onClick={ChangeRevenue}>revenue</button>
    </>    
  )
}

export default WebSocketsGetSpacePage