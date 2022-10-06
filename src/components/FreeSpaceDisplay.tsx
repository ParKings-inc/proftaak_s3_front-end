import React, { Component } from "react";
import { getFreeSpaces } from "../services/ParkingService";
import "../style/shapes.css";

interface State {
    freespaces: number;
}

export default class FreeSpaceDisplay extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
        freespaces: 0,
    }
  }

  //#region Methods
  async assignFreeSpaces(garageId: Number) {
    let Spaces = await getFreeSpaces(garageId);
    console.log(Spaces)
    let freespaces = Spaces.data[1] - Spaces.data[0];
    this.setState({freespaces: freespaces});
    this.setColor(freespaces,Spaces.data[1]);
  }

  setColor(freeSpaces: number,totalSpaces:number){
    let circle =document.getElementById("colorCircle")
    let percentageValue = freeSpaces/totalSpaces*100;
    console.log(percentageValue)
    let color = `hsla(${10+percentageValue},100%,50%)`;
    if(circle)
    circle.style.backgroundColor = color;
  }

  componentDidMount(): void {
    this.assignFreeSpaces(1);
    
  }
//#endregion
  
render() {
    return (
      <>
        <div className="d-flex flex-row justify-content-center">
          <div id="colorCircle" className="circle align-self-center me-1"></div>{" "}
          <h2 className="m-0">Free Spaces: {this.state.freespaces}</h2>
        </div>
      </>
    );
  }
}
