const axios = require("axios");

export async function getAllReservations(id) {
    try {
        const api = "https://localhost:7205/api/Reservations/User/" + id;
        const response = await axios.get(api);

        return response.data;
    } catch (error) {
        return [];
    }
}