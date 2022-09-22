const axios = require('axios');

export async function getAllGarage()
{
    try{
        const response = await axios.get('/api/Garages');
        console.log('response ', response)
        return response.data;
    }
    catch(error) {
        return [];
    }
}

export async function getGarage(data)
{
    try{
        const response = await axios.get('api/Garages', {garage: data});
        console.log('response ', response)
        return response.data;
    }
    catch(error){
        return [];
    }
}