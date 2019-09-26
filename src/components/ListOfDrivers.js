import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Drivers = props => (
  <tr>
    <td>{props.Drivers.driver_name}</td>
    <td>{props.Drivers.driver_surname}</td>
    <td>{props.Drivers.driver_vehicle}</td>
    <td>{props.Drivers.credit}</td>
    <td>{props.Drivers.cash}</td>
    <td>{props.Drivers.created_date}</td>
    <td>
      <Link
        to={"/show-driver/" + props.drivers._id}
        className="btn btn-primary"
      >
        Details
      </Link>
    </td>
  </tr>
);

class ListOFDrivers extends Component {
  constructor(props) {
    super(props);
    this.state = { drivers: [] };
  }

  componentDidMount() {
    const URL_ALLDRIVERS = process.env.REACT_APP_API_DRIVERS;
    console.log(URL_ALLDRIVERS);
    axios
      .get(URL_ALLDRIVERS)
      .then(response => {
        this.setState({ drivers: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  DriversList() {
    return this.state.drivers.map(function(currentdriver, i) {
      return <Drivers drivers={currentdriver} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Driver list</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>firstName</th>
              <th>SurName</th>
              <th>Vehicle</th>
              <th>Credit</th>
              <th>Cash</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{this.DriversList()}</tbody>
        </table>
      </div>
    );
  }
}
export default ListOFDrivers;
