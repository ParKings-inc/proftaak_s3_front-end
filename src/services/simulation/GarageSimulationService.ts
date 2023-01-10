import axios, { AxiosResponse } from 'axios';
import urlJoin from 'url-join';
import Data from '../../App.json';

export default class GarageSimulationService {
    private static readonly GARAGE_ID: number = 1;

    public static async enterGarage(licence: string): Promise<boolean> {
        try {
            let path: string = urlJoin("/api/Garages/EnterGarage", GarageSimulationService.GARAGE_ID.toString(), licence);
            let url: URL = new URL(path, Data.serverAddress);
            let response: AxiosResponse<boolean> = await axios.post(url.toString());
            return response.data;
        } catch (e) {
            console.error(e);
        }
        return false;
    }

    public static async leaveGarage(licence: string): Promise<boolean> {
        try {
            let path: string = urlJoin("/api/Garages/LeaveGarage", GarageSimulationService.GARAGE_ID.toString(), licence);
            let url: URL = new URL(path, Data.serverAddress);
            let response: AxiosResponse<boolean> = await axios.put(url.toString());
            return response.data;
        } catch (e) {
            console.error(e);
        }
        return false;
    }
}
