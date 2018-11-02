import React, { Component } from "react";
import { Alert } from "react";
import "../App.css";
import {
  FormGroup,
  Form,
  ControlLabel,
  FormControl,
  Button, Col, Checkbox
} from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      authorization : ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

 
  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit(event) {
    
    console.log("inainte");
    
    const response = await this.getLoginResult();
    console.log('aftere await: ', response);
    if (this.state.authorization ===true) {
      this.props.history.push("/show");
    } else{
      alert("The");
    }    
  }

  

  getLoginResult() {
    let url = "http://192.168.209.75:8080/user/getAuthUser?userName=" + this.state.username + "&password=" + this.state.password;
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("response", data);
        return this.setState({ authorization: data });
      
      });
  }

  render() {
 
    return (
      <div className="container">
        <div className="row" style={{ paddingTop: "10px" }}>
          <div className="col-md-6">
              <Form horizontal>
                <FormGroup controlId="formHorizontalUser">
                  <Col componentClass={ControlLabel} sm={2}>
                    User
                  </Col>
                  <Col sm={8}>
                    <FormControl type="text" placeholder="Username" value={this.state.username} onChange = {this.handleChangeUsername}/>
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={8}>
                    <FormControl type="password" placeholder="Password" value={this.state.password} onChange = {this.handleChangePassword}/>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Checkbox>Remember me</Checkbox>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button onClick={this.handleSubmit}>Sign in</Button>
                  </Col>
                </FormGroup>
              </Form>            
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
