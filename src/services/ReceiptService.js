const axios = require("axios");
const api = "https://localhost:7205/api/";

export async function getAllReceipts() {
    try {
      const response = await axios.get(api + `Receipts`);
  
      return response.data;
    } catch (error) {
      return [];
    }
  }
  
  export async function getReceiptsByUser(id) {
    try {
      const response = await axios.get(api + `Receipts/User/${id}`);
      return response.data;
    } catch (error) {
      return [];
    }
  }