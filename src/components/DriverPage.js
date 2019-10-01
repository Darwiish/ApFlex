import React, { Component } from "react";
import axios from "axios";

class DriverPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDrivers: []
    };
  }
  componentDidMount() {
    const URL_DRIVERS = process.env.REACT_APP_API_DRIVERS;
    axios.get(URL_DRIVERS).then(response => {
      console.log(response);
      console.log(
        response.data.filter(
          x => x.driver_vehicle == this.props.match.params.driv.toUpperCase()
        )
      );

      this.setState({
        currentDrivers: response.data.filter(
          x => x.driver_vehicle == this.props.match.params.driv.toUpperCase()
        )
      });
    });

    if (this.props.match.params.driv === "alldrivers") {
      axios.get(URL_DRIVERS).then(response => {
        this.setState({
          currentDrivers: response.data
        });
      });
    }
  }

  render() {
    if (this.state.currentDrivers.length) {
      return this.state.currentDrivers.map(x => {
        return (
          <div className="row push-bottom" key={x._id}>
            <div className="col-lg-8" style={{ backgroundColor: "#fff" }}>
              <h3>{x.driver_name}</h3>
              <p>{x.driver_name}</p>
            </div>
            <div className="col-lg-1" />
            <div className="col-lg-3" style={{ backgroundColor: "#fff" }}>
              <h4>Vogne</h4>
              <p className="driver_vehicle">{x.driver_vehicle}</p>
              <h4>Credit</h4>
              <p className="credit">{x.credit}</p>
              <h4>Cash</h4>
              <p className="cash">{x.cash}</p>
              <h4>Tid</h4>
              <p className=" created_date">{x.created_date}</p>
            </div>
          </div>
        );
      });
    } else {
      return <div>no driver</div>;
    }
  }
}
export default DriverPage;
