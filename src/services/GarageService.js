const axios = require('axios');
const api = 'https://localhost:7205/api';

export async function getAllGarage() {
    try {
        const response = await axios.get(api + '/Garages');
        console.log('response ', response)
        return response.data;
    }
    catch (error) {
        return [];
    }
}

export async function getGarageByID(id) {
    try {
        const response = await axios.get(`${api}/Garages/${id}`);
        console.log('response', response)
        return response.data
    }
    catch (error) {
        return [];
    }
}

export async function getGarage(data) {
    try {
        const response = await axios.get(api + '/Garages', { garage: data });
        console.log('response ', response)
        return response.data;
    }
    catch (error) {
        return [];
    }
}

