import React, { useEffect, useState } from "react";
import { getFreeSpaces } from "../services/ParkingService";
import "../style/shapes.css";


const AvailableSpaceDisplay = (props) => {

  const [FreeSpaces, setFreeSpaces] = useState(0);
  const [TotalSpaces, setTotalSpaces] = useState(null);

  useEffect(() => {
    console.log(props.totalSpaces)
    setFreeSpaces(props.freeSpaces)
    if (props.totalSpaces != null && props.totalSpaces.data !== undefined && props.totalSpaces.data.length > 1)
      setTotalSpaces(props.totalSpaces.data[1])
    console.log(props.totalSpaces)
    if (FreeSpaces !== 0 && TotalSpaces !== 0) {
      setColor(props.freeSpaces, props.totalSpaces);
    }
  }, [props.freeSpaces, props.totalSpaces])

  function setColor(free, total) {
    let circle = document.getElementById("colorCircle")
    let percentageValue = free / total * 100;
    console.log(percentageValue)
    let color = `hsla(${10 + percentageValue},100%,50%)`;
    if (circle)
      circle.style.backgroundColor = color;
  }


  return (
    <>
      <div className="d-flex flex-row justify-content-center">
        <div id="colorCircle" className="circle align-self-center me-1"></div>{" "}
        <h2 className="m-0">Free Spaces: {FreeSpaces} <small className="text-muted">(Out of {TotalSpaces})</small></h2>
      </div>
    </>
  )
}

export default AvailableSpaceDisplay