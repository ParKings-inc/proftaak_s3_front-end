const axios = require("axios");

export async function getAllCars() {
  try {
    const response = await axios.get("https://localhost:7205/api/Cars");
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
  if(/*(DoesLicenseExist(data.kenteken) == false) &&*/ (data.kenteken.length > 0) && (data.kenteken.length <20)){
    console.log('succes');
    try{
        console.log(data);
        axios.post('https://localhost:7205/api/Cars', data);
    }
    catch(error){
        console.log(error);
    }
  }
  else{
  console.log('helaas')}
}
async function DoesLicenseExist(id){
    try {
      const response = await axios.get(
        `https://localhost:7205/api/Cars/LicenseExists/${id}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return [];
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

export async function DeleteCar(id) {
  try {
    const response = await axios.delete(
      `https://localhost:7205/api/Cars/${id}`
    );
  } catch (error) {
    return [];
  }
}
