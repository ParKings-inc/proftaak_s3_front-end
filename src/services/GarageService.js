const axios = require('axios');

export async function getAllGarage()
{
    try{
        const response = await axios.get('https://localhost:7205/api/Garages');
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
        const response = await axios.get('https://localhost:7205api/Garages', {garage: data});
        console.log('response ', response)
        return response.data;
    }
    catch(error){
        return [];
    }
}

