import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const WebSocketsGetSpacePage = () => {
    const [ spaces, setSpaces ] = useState([]);
    const latestPlaces = useRef(null);

    latestPlaces.current = spaces;

    const isInitialMount = useRef(true);

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
            await fetch("https://localhost:7205/api/Spaces/garage/2")
                    .then((Response) => console.log(Response));
        }
        catch(e) {
            console.log('Sending spaces failed.', e);
        }
    }

  return (
    <>
    <button onClick={requestSpaces}></button>
    </>    
  )
}

export default WebSocketsGetSpacePage