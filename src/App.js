import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ListOfDrivers from "./components/ListOfDrivers";
import UserLogin from "./components/UserLogin";
import Vehicles from "./components/Vehicles";
import DriverPage from "./components/DriverPage";
import PostDriver from "./components/PostDriver";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App h1">ApFlex</div>
      <div className="container">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/postDriver"} className="nav-link">
                Post Drivers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/loginpage"} className="nav-link">
                LoginPage
              </Link>{" "}
            </li>
          </ul>
        </nav>
        <br />
        <Switch>
          <Route
            exact
            path="/loginpage"
            render={props => <UserLogin {...props} />}
          />
          <Route
            exact
            path="/postDriver"
            render={props => <PostDriver {...props} />}
          />
          <Route
            exact
            path="/driver/alldrivers"
            render={props => <ListOfDrivers />}
          />
          <Route exact path="/" render={props => <Vehicles />} />
          <Route
            path="/show-driver/:id"
            render={props => <DriverPage {...props} />}
          />
          <Route
            path="/driver/:driv"
            render={props => <DriverPage {...props} />}
          />
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
