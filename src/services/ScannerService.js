const axios = require('axios');

export async function KentekenExists(data)
{
    try{
        const response = await axios.get('https://localhost:7205/api/KentekenExists', data);
        console.log('response ', response)
        return response.data;
    }
    catch(error){
        console.log(error)
    }
}