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
        to={"/show-driver/" + props.Drivers._id}
        className="btn btn-primary"
      >
        Details
      </Link>
    </td>
  </tr>
);

class FilterDrivers extends Component {
  constructor(props) {
    super(props);
    this.state = { Drivers: [], Nodrivers: false };
  }

  componentDidMount() {
    let vehicle = this.props.match.params.driv;
    switch (drivnel) {
      case "3917":
        vehicle = "3917";
        break;
      case "3919":
        vehicle = "3919";
        break;
      case "3927":
        vehicle = "3927";
        break;
      case "3929":
        vehicle = "3929";
        break;
      case "3937":
        vehicle = "3937";
        break;
      case "3943":
        vehicle = "3943";
        break;
      case "3947":
        vehicle = "3947";
        break;
      default:
        vehicle = "3957";
    }
    const URL_FILTEREDDRIVERS = process.env.REACT_APP_API_FILTEREDDRIVERS;
    axios
      .get(URL_FILTEREDDRIVERS, {
        params: {
          driv: vehicle
        }
      })
      .then(response => {
        if (response.data && response.data.length > 0) {
          this.setState({ Drivers: response.data });
        } else {
          this.setState({ Nodrivers: "Sorry, no drivers found" });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  DriversList() {
    return this.state.Drivers.map(function(currentDriver, i) {
      return <Drivers Drivers={currentDriver} key={i} />;
    });
  }
  ShowTable() {
    const nodrivers = this.state.Nodrivers;
    if (!nodrivers) {
      return (
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>firstName</th>
              <th>SurName</th>
              <th>Vehicle</th>
              <th>Credit</th>
              <th>Cash</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          <tbody>{this.DriversList()}</tbody>
        </table>
      );
    }
    return <h1>{this.state.Nodrivers}</h1>;
  }

  render() {
    return (
      <div>
        <h3>Driver list</h3>
        {this.ShowTable()}
      </div>
    );
  }
}
export default FilterDrivers;
