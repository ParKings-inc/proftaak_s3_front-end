import axios from 'axios';
import dayjs from "dayjs";

export async function createPayment(reservationCost, reservationID){
    try {
        const response = await axios.post("https://localhost:7205/api/Payments", {
            Cost: reservationCost,
            ReservationID: reservationID
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getPaymentById(id){
    try {
        const response = await axios.get(`https://localhost:7205/api/Payments/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export function goToCheckoutPage(url){
    window.location.href = url;
}

export async function getRevenue(date) {
  try {
    https://localhost:7205/api/Receipts/byday
    return axios.get(`https://localhost:7205/api/Receipts/byday/${dayjs(date).format("YYYY-MM-DD")}`);
  } catch (error) {
    console.log(error);
  }
}