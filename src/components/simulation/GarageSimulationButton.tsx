import { Component, ReactNode } from "react";
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { Typography } from "@mui/material";
import GarageSimulationService from "../../services/simulation/GarageSimulationService";

interface Props {}

interface State {
    inside: boolean;
}

export default class GarageSimulationButton extends Component<Props, State> {
    private static readonly LICENCE_PLATE: string = "AB-123-CD";

    public constructor(props: Props) {
        super(props);
        this.state = {
            inside: false
        };
    }

    public render(): ReactNode {
        return (
            <div onClick={async () => await this.toggleGarage()} className="w-40 full-height border rounded-3 shadow flex column vertical-center horizontal-center">
                <LocalParkingIcon className="text-primary" sx={{ fontSize: "60px", marginBottom: "10px" }} />
                <Typography variant="body1">{this.getGarageText()}</Typography>
            </div>
        );
    }

    private async toggleGarage(): Promise<void> {
        if (!this.state.inside) {
            await this.enterGarage();
            return;
        }
        await this.leaveGarage();
    }

    private async enterGarage(): Promise<void> {
        if (!await GarageSimulationService.enterGarage(GarageSimulationButton.LICENCE_PLATE)) {
            return;
        }
        this.setState({
            inside: true
        });
    }

    private async leaveGarage(): Promise<void> {
        this.setState({
            inside: false
        });
    }

    private getGarageText(): string {
        return this.state.inside ? "Leave Garage" : "Enter Garage";
    }
}
