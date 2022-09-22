const axios = require('axios');

export async function getAllParking()
{
    try{
        const response = await axios.get('/api/Parkings');
        console.log('response ', response)
        return response.data;
    }
    catch(error) {
        return [];
    }
}

export async function getAllParkingPerCar(data)
{
    try{
        const response = await axios.get('/api/Parkings', {car: data});
        console.log('response ', response)
        return response.data;
    }
    catch(error) {
        return [];
    }
}