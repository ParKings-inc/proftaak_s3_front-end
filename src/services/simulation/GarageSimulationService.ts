import axios, { AxiosResponse } from 'axios';
import urlJoin from 'url-join';
import Data from '../../App.json';

export default class GarageSimulationService {
    public static async enterGarage(licence: string): Promise<boolean> {
        try {
            let path: string = urlJoin("/api/Garages/EnterGarage", "1", licence);
            let url: URL = new URL(path, Data.serverAddress);
            console.log(url.toString());
            let response: AxiosResponse<boolean> = await axios.post(url.toString());
            return response.data;
        } catch (e) {
            console.error(e);
        }
        return false;
    }
}
