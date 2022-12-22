import axios, { AxiosResponse } from 'axios';
import urlJoin from 'url-join';
import Data from '../../App.json';

export default class GarageSimulationService {
    public static async enterGarage(licence: string): Promise<void> {
        try {
            let path: string = urlJoin("/api/Garages/EnterGarage", "1", licence);
            let url: URL = new URL(path, Data.serverAddress);
            console.log(url.toString());
            let x: AxiosResponse = await axios.post(url.toString());
            console.log(x.data);
        } catch (e) {
            console.error(e);
        }
    }
}
