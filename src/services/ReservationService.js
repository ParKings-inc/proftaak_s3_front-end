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
  try {
    const response = await axios.post(api + `Reservations`, data);

    return response.data;
  } catch (error) {
    console.log(error.response.status);
    return error.response.status;
  }
}

export async function putReservation(reservationbody) {
  try {
    const response = await axios.put(api + `Reservations/${reservationbody.Id}`, reservationbody)
    console.log(response.data);

  } catch (error) {
    return error.response.status;
  }

}

export async function deleteReservation(reservationId) {
  try {
    const response = await axios.delete(api + `Reservations/${reservationId}`)
    return response.data;
  } catch (error) {
    return [];
  }
}
