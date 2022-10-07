const axios = require('axios');

export async function getAllCars()
{
    try{
        const response = await axios.get('https://localhost:7205/api/Cars');
        console.log('response ', response)
        return response.data;
    }
    catch(error) {
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