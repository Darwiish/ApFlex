import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class PostDriver extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChangeSurName = this.handleInputChangeSurName.bind(this);
    this.handleInputVehicle = this.handleInputVehicle.bind(this);
    this.handleChangeCreatedDate = this.handleChangeCreatedDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      message: "Loading...",
      auth: false,
      driver_name: "",
      driver_surname: "",
      driver_vehicle: "",
      created_date: ""
    };
  }
  // driver name drivge
  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  // driver name drivge
  handleInputChangeSurName = event => {
    const { value, surname } = event.target;
    this.setState({
      [surname]: value
    });
  };

  // drivnel drivge
  handleInputVehicle = event => {
    const { value, drivnel } = event.target;
    this.setState({
      driver_vehicle: event.target.value
    });
    console.log(this.state);
    console.log(event.target.value);
  };

  handleChangeCreatedDate(date) {
    this.setState({
      created_date: date
    });
  }

  onSubmit = event => {
    event.preventDefault();
    const URL_REGDRIVER = process.env.REACT_APP_API_REGISTERDRIVER;
    const a = this.state;
    axios({
      method: "post",
      url: URL_REGDRIVER,
      data: JSON.stringify({
        driver_name: a.driver_name,
        driver_surname: a.driver_surname,
        driver_vehicle: a.driver_vehicle,
        created_date: new Date()
      }),
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            message: "driver stored"
          });
        } else {
          throw new Error(res.error);
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error on posting driver - PostDriver");
      });
  };

  ShowDriverPosting() {
    const { created_date } = this.state;

    if (this.state.auth === true) {
      return (
        <form onSubmit={this.onSubmit}>
          {/* <div className="form-group">
            <label>Driver Name</label>
            <input
              type="text"
              className="form-control"
              name="driver_name"
              placeholder="Enter driver name"
              value={this.state.driver_name}
              onChange={this.handleInputChange}
              required
            />
          </div> */}
          <div className="form-group">
            <label> Select Driver</label>
            <select
              value={this.state.driver_name}
              className="form-control"
              name="driver_name"
              onChange={this.handleInputChange}
            >
              <option value="Hans Ole">Hans Ole</option>
              <option value="Peter Lundin">Peter Lundin</option>
              <option value="James Brown">James Brown</option>
              <option value="Paludan Møller">Paludan Møller</option>
              <option value="Peter Thomsen">Peter Thomsen</option>
              <option value="Big Mike">Big Mike</option>
              <option value="Ahmed Aziz">Ahmed Aziz</option>
            </select>
          </div>
          <div className="form-group">
            <label> Select Vehicle </label>
            <select
              value={this.state.driver_vehicle}
              className="form-control"
              name="driver_vehicle"
              onChange={this.handleInputVehicle}
            >
              <option value="3917">3917</option>
              <option value="3919">3919</option>
              <option value="3927">3927</option>
              <option value="3929">3929</option>
              <option value="3937">3937</option>
              <option value="3943">3943</option>
              <option value="3947">3947</option>
              <option value="3957">3957</option>
              <option value="3969">3969</option>
            </select>
          </div>
          <b>Date</b>:
          <DatePicker
            selected={this.state.created_date}
            onChange={this.handleChangeCreatedDate}
          />
          <div className="form-group">
            <input
              type="submit"
              value="Create driver"
              className="btn btn-primary mb-2"
            />
          </div>
        </form>
      );
    }
  }

  componentDidMount() {
    const isLoggedIn = !!localStorage.getItem("token");
    console.log(isLoggedIn);
    if (isLoggedIn) {
      this.setState({
        auth: true
      });
    }

    const URL_LOGINPAGE = process.env.REACT_APP_API_LOGINPAGE;
    axios
      .get(URL_LOGINPAGE, {
        headers: { "x-access-token": localStorage.getItem("token") }
      })
      .then(response => {
        this.setState({
          message: response.data
        });
        if (response.data === "Success, please post your AD!") {
          this.setState({
            auth: true
          });
        }
      });
  }

  render() {
    return (
      <div>
        <h1>Create new AD</h1>
        <p>{this.state.message}</p>
        <div>{this.ShowDriverPosting()}</div>
      </div>
    );
  }
}

export default PostDriver;
