import { Component, ReactNode } from "react";
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { Typography } from "@mui/material";

interface Props {}

interface State {
    inside: boolean;
}

export default class GarageSimulationButton extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            inside: false
        };
    }

    public render(): ReactNode {
        return (
            <div onClick={() => this.toggleGarage()} className="w-40 full-height border rounded-3 shadow flex column vertical-center horizontal-center">
                <LocalParkingIcon className="text-primary" sx={{ fontSize: "60px", marginBottom: "10px" }} />
                <Typography variant="body1">{this.getGarageText()}</Typography>
            </div>
        );
    }

    private toggleGarage(): void {
        this.setState({
            inside: !this.state.inside
        });
    }

    private getGarageText(): string {
        return this.state.inside ? "Leave Garage" : "Enter Garage";
    }
}
