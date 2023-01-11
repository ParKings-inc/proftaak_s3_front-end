import { Component, ReactNode } from "react";
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { Typography } from "@mui/material";
import GarageSimulationService from "../../services/simulation/GarageSimulationService";

interface Props {
    getReservation: any;
}

interface State {
    inside: boolean;

}

export default class GarageSimulationButton extends Component<Props, State> {
    private static readonly LICENCE_PLATE: string = "JJ-887-F";

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

    public async componentDidMount(): Promise<void> {
        console.log("setting inside")
        const inside = sessionStorage.getItem("inside");
        this.setState({ inside: inside === "true" });
    }

    private async toggleGarage(): Promise<void> {
        if (!this.state.inside) {
            await this.enterGarage();
            this.props.getReservation();
            return;
        }
        await this.leaveGarage();
        this.props.getReservation();
    }

    private async enterGarage(): Promise<void> {
        if (!await GarageSimulationService.enterGarage(GarageSimulationButton.LICENCE_PLATE)) {
            return;
        }
        sessionStorage.setItem("inside", "true");
        this.setState({
            inside: true
        });
    }

    private async leaveGarage(): Promise<void> {
        if (!await GarageSimulationService.leaveGarage(GarageSimulationButton.LICENCE_PLATE)) {
            return;
        }
        sessionStorage.setItem("inside", "false");
        this.setState({
            inside: false
        });
    }

    private getGarageText(): string {
        return this.state.inside ? "Leave Garage" : "Enter Garage";
    }
}
