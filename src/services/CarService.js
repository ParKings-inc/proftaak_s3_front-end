const axios = require('axios');

export async function getAllCars()
{
    try{
        const response = await axios.get('/api/Autos');
        console.log('response ', response)
        return response.data;
    }
    catch(error) {
        return [];
    }
}