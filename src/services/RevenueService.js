import axios from "axios";
import dayjs from "dayjs";

export async function getRevenue(date) {
  try {
    https://localhost:7205/api/Receipts/byday
    return axios.get(`https://localhost:7205/api/Receipts/byday/${dayjs(date).format("YYYY-MM-DD")}`);
  } catch (error) {
    console.log(error);
  }
}
