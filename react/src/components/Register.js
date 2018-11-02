import React, { Component } from 'react';
import { Alert } from 'react';
import '../App.css';
import {
    FormGroup,
    Form,
    ControlLabel,
    FormControl,
    Button, Col
  } from "react-bootstrap";

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      surname: '',
      stuff: ''
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSurname = this.handleChangeSurname.bind(this);
    this.handleChangeStuff = this.handleChangeStuff.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeSurname(event) {
    this.setState({ surname: event.target.value });
  }

  handleChangeStuff(event) {
    this.setState({ stuff: event.target.value });
  }

  handleSubmit(event) {
    this.registerUser();
    console.log("console works");   
    this.props.history.push("/show");

  }



  registerUser = async () => {
    try {
      let url = "http://127.0.0.1:8080/user/addUser?userName=" + this.state.username + "&password=" + this.state.password
      + "&name=" + this.state.name
      + "&surname=" + this.state.surname
      + "&stuff=" + this.state.stuff;
      const response = await fetch(url, {
        method: 'POST',
      });
      console.log("response:", response);
      if (!response.ok) {
        if (response.status === 400 || response.status === 401) {
          const json = await response.json();
          if (json.errorCode) {
            Alert.alert("", json.message);
          } else {
            throw Error("Match request - errorCode: " + response.errorCode + " and no json errorCode");
          }
        } else {
          console.log("Match request - status " + response.status);
          throw Error(response.message);
        }
      }
    } catch (error) {
      console.log("Error in match request :", error);
      Alert.alert("", error.message);
    }    
  };


  render() {  

    return (
        <div className="container">
        <div className="row" style={{ paddingTop: '10px' }}>
          <div className="col-md-6" >


        <Form horizontal>
                <FormGroup controlId="formHorizontalUser">
                  <Col componentClass={ControlLabel} sm={2}>
                  UserName
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

                
                <FormGroup controlId="formHorizontalName">
                  <Col componentClass={ControlLabel} sm={2}>
                  Name
                  </Col>
                  <Col sm={8}>
                    <FormControl type="text" placeholder="Name" value={this.state.name} onChange = {this.handleChangeName}/>
                  </Col>
                </FormGroup>


                <FormGroup controlId="formHorizontalSurname">
                  <Col componentClass={ControlLabel} sm={2}>
                  Surname
                  </Col>
                  <Col sm={8}>
                    <FormControl type="text" placeholder="Surname" value={this.state.surname} onChange = {this.handleChangeSurname}/>
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalStuff">
                  <Col componentClass={ControlLabel} sm={2}>
                  Stuff
                  </Col>
                  <Col sm={8}>
                    <FormControl type="text" placeholder="Stuff" value={this.state.stuff} onChange = {this.handleChangeStuff}/>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button onClick={this.handleSubmit}>Register</Button>
                  </Col>
                </FormGroup>
              </Form> 
          </div>
        </div>


      </div>
    );
  }
}

export default Register;
