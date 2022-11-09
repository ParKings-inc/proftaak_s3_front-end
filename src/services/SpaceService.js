const axios = require('axios');
const api = 'https://localhost:7205/api';

export async function getSpaceById(id) {
    try {
        const response = await axios.get(`${api}/Spaces/${id}`);
        console.log('response', response)
        return response.data
    }
    catch (error) {
        return [];
    }
}