import React, { Component } from "react";
import { Link } from "react-router-dom";

class Vehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [
        {
          url: "/alldrivers",
          name: "AllDrivers"
        },
        {
          url: "/hans Ole",
          name: "Hans Ole"
        },
        {
          url: "/peter lundin",
          name: "Peter Lundin"
        },
        {
          url: "/james brown",
          name: "James Brown"
        },
        {
          url: "/paludan møller",
          name: "Paludan Møller"
        },
        {
          url: "/bog mike",
          name: "Big Mike"
        },
        {
          url: "/ahmed aziz",
          name: "Ahmed Aziz"
        },
        {
          url: "/jojo",
          name: "JoJo"
        }
      ]
    };
  }
  VehicleList() {
    return this.state.vehicles.map(function(vehicle, i) {
      return (
        <Link
          to={"/vehicle" + vehicle.url}
          key={i}
          className="list-group-item list-group-item-action"
        >
          {vehicle.name}
        </Link>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Vehicles</h3>
        <div className="list-group">{this.VehicleList()}</div>
      </div>
    );
  }
}
export default Vehicles;
