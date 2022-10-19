const axios = require("axios");
const api = "https://localhost:7205/api/Reservations";

export async function getAllReservations() {
    try {
        const response = await axios.get(api);

        return response.data;
    } catch (error) {
        return [];
    }
}