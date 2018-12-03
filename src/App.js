import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import "./App.scss";

import { getInitialData } from "./actions/shared";

import Navigation from "./components/Navigation";
import Leaderboard from "./pages/Leaderboard";
import IndividualQuestion from "./pages/IndividualQuestion";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddQuestion from "./pages/AddQuestion";
import PrivateRoute from "./components/PrivateRoute";
import Error404 from './components/Error404';

class App extends Component {
  // load initial redux store data, users + questions
  componentDidMount() {
    this.props.dispatch(getInitialData());
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/leaderboard" component={Leaderboard} />
            <PrivateRoute path="/add" component={AddQuestion} />
            <PrivateRoute
              path="/question/:qid"
              component={IndividualQuestion}
            />
            <Route component={Error404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
