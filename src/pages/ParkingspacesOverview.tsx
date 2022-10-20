import React, { Component, ReactNode } from 'react'
import FreeSpaceDisplay from '../components/FreeSpaceDisplay';
import ParkingSpaceList from '../components/ParkingSpaceList';

export default class ParkingspacesOverview extends Component {
  public override render(): ReactNode {
    return (
      <div className="d-flex flex-column align-items-center pt-1">
        <div>ParkingspacesOverview</div>
        <FreeSpaceDisplay/>
        <ParkingSpaceList/>
      </div>
    )
  }
}