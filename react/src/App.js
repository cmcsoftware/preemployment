import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import Navigation from "./components/Navigation";
import Register from "./components/Register";
import Redirect from "./components/Redirect";
import Login from "./components/Login";
import Users from "./components/Users";
import Grid from "./components/Grid";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation></Navigation>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/register" component={Register} />
            <Route path="/redirect" component={Redirect} />
            <Route path="/show" component={Users} />
            <Route path="/login" component={Login} />
            <Route path="/grid" component={Grid} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
