const axios = require("axios");
const api = "https://localhost:7205/api/";

export async function getAllReservations() {
  try {
    const response = await axios.get(api);

    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getReservationsByUser(id) {
  try {
    const response = await axios.get(api + `Reservations/User/${id}`);
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getReservationAvailableSpaces(
  arrivalTime,
  DepartureTime,
  garageId
) {
  try {
    const response = await axios.get(
      api +
        `Spaces/reservations/create/getavailableSpace/${arrivalTime}/${DepartureTime}/${garageId}`
    );
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function postReservation(data) {
  console.log("geteget " + data);
  try {
    const response = await axios.post(api + `Reservations`, data);
    console.log("from service " + response);
    return response.data;
  } catch (error) {
    return [];
  }
}
