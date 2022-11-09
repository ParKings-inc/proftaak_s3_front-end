import dayjs from "dayjs";
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

export async function getReservationAvailableSpaces(ArrivalTime, DepartureTime, garageId) {
  console.log("from service " + garageId)
  ArrivalTime = dayjs(ArrivalTime).format("YYYY-MM-DDTHH:mm:00.000Z")
  DepartureTime = dayjs(DepartureTime).format("YYYY-MM-DDTHH:mm:00.000Z")
  try {
    const response = await axios.get(
      encodeURI(api + `Spaces/reservations/create/getavailableSpace/${ArrivalTime}/${DepartureTime}/${garageId}`)
    );
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function postReservation(data) {
  try {
    console.log(data.DepartureTime - data.ArrivalTime)
    if (data.DepartureTime - data.ArrivalTime >= 1800000) {
      data.ArrivalTime = dayjs(data.ArrivalTime).format("YYYY-MM-DDTHH:mm:00.000Z")
      data.DepartureTime = dayjs(data.DepartureTime).format("YYYY-MM-DDTHH:mm:00.000Z")
      const response = await axios.post(api + `Reservations`, data);
      console.log("from service " + response);
      return response.data;
    } else {
      return "Reservation must be longer than 30 minutes";
    }
  }
  catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export async function putReservation(reservationbody) {
  try {
    // if you don't format the times the times get confused and put back by 1 hour.
    // I know its bad practice to put the format here. But this is temporary, I want to discuss this bug. So to keep this clear, I will keep it here. haha that rhymes.
    if (reservationbody.DepartureTime - reservationbody.ArrivalTime >= 1800000) {
      reservationbody.ArrivalTime = dayjs(reservationbody.ArrivalTime).format("YYYY-MM-DDTHH:mm:00.000Z")
      reservationbody.DepartureTime = dayjs(reservationbody.DepartureTime).format("YYYY-MM-DDTHH:mm:00.000Z")
      const response = await axios.put(api + `Reservations/${reservationbody.Id}`, reservationbody);
      return "success";
    } else {
      return "Reservation must be longer than 30 minutes";
    }
  } catch (error) {
    return error.response.data;
  }

}

export async function deleteReservation(id) {
  try {
    const response = await axios.delete(api + `Reservations/${id}`)
    return response.data;
  } catch (error) {
    console.log(error)
    return error.response.data;
  }
}