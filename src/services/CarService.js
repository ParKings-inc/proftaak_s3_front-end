const axios = require("axios");

export async function getAllCars() {
  try {
    const response = await axios.get("https://localhost:7205/api/Autos");
    console.log("response ", response);
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getCarByUserId(id) {
  try {
    const response = await axios.get(
      `https://localhost:7205/api/Cars/User/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function AddCar(data)
{
    try{
        console.log(data)
        axios.post('https://localhost:7205/api/Cars', data)
    }
    catch(error){
        console.log(error)
    }
}

export async function getCarIdByLicensePlate(plate) {
  try {
    const response = await axios.get(
      `https://localhost:7205/api/Cars/License/${plate}`
    );
    console.log(response.data.id);
    return response.data.id;
  } catch (error) {
    return [];
  }
}
