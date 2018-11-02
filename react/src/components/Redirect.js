import React, { Component } from 'react';
import { Alert } from 'react';
import '../App.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Table, Label } from 'react-bootstrap';


class Redirect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      valueID: '',
      valueName: '',
      users: [],
      employees: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
  }

  componentDidMount() {
    this.getProducts();
    this.getEmployees();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleChangeId(event) {
    this.setState({ valueID: event.target.value });
  }

  handleChangeName(event) {
    this.setState({ valueName: event.target.value });
  }

  handleSubmit(event) {
    this.insertProduct();
    console.log("console works");
    this.getProducts();

  }

  handleSubmitUpdate(event) {
    this.updateProduct();
  }


  updateProduct = async () => {
    try {
      let url = "http://127.0.0.1:8080/products/updateName?id=" + this.state.valueID + "&noulNume=" + this.state.valueName;
      const response = await fetch(url, {
        method: 'PUT',
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

  insertProduct = async () => {
    try {
      let url = "http://127.0.0.1:8080/products/products?name=" + this.state.value;
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

  getProducts() {
    let url = "http://192.168.209.75:8080/products/productss";
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("response", data);
        this.setState({ users: data })
      })
  }


  delete(id, e) {
    console.log("eventu de delete", id);
    let url = "http://127.0.0.1:8080/products/deleteId?id=" + id;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(() => this.getProducts());
  }


  getEmployees() {
    let url = "http://192.168.209.75:8080/employee/getall";
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("response", data);
        this.setState({ employees: data })
      })
  }



  render() {
    const list = [];
    this.state.users.forEach((item, index) => {
      const color = item.name === 'Relu SQLu' ? "danger" : "info";     
      list.push(
        <tr key={index}>
          <td>
           <Label bsStyle={color}>{item.id}.</Label>{' '}
          </td>          
          <td><Label bsStyle={color}>{item.name}.</Label>{' '}</td>
          <td>
            <IconButton onClick={this.delete.bind(this, item.id)} aria-label="Delete" disabled={item.name === 'Relu SQLu'}>
              <DeleteIcon />
            </IconButton>
          </td>
          <td>
           <Label bsStyle={color}>Label</Label>{' '}
          </td>
        </tr>

      )
    })

    const employeeList = [];
    this.state.employees.forEach((item, index) => (
      employeeList.push(
        <tr key={index}>
          <td>{item.id}.</td>
          <td><Label bsStyle="info">{item.name}</Label>{' '}</td>
          <td>{item.surname}</td>
          <td>{item.department}</td>
          <td>{item.product.name}</td>          
          <td>
            <IconButton onClick={this.delete.bind(this, item.id)} aria-label="Delete" disabled>
              <DeleteIcon />
            </IconButton>
          </td>
          <td>
           <Label bsStyle="info">Disabled</Label>{' '}
          </td>
        </tr>
      )
    ))

    return (
      <div className="container">
        <div className="row" style={{ paddingTop: '10px' }}>
          <div className="col-md-6" >
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Insert" />
            </form>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th> Name</th>
                </tr>
              </thead>
              <tbody>
                {list}
              </tbody>
            </Table>
          </div>
          <div className="col-md-6">
            <form onSubmit={this.handleSubmitUpdate}>
              <label>
                ID:
          <input type="text" value={this.state.valueID} onChange={this.handleChangeId} />
              </label>
              <label>
                New Name:
          <input type="text" value={this.state.valueName} onChange={this.handleChangeName} />
              </label>
              <input type="submit" value="Update" />
            </form>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th><Label bsStyle="info">#</Label>{' '}</th>
                  <th> <Label bsStyle="warning">Name</Label>{' '}</th>
                  <th> <Label bsStyle="success">Surname</Label>{' '}</th>
                  <th> <Label bsStyle="default">Department</Label>{' '}</th>
                  <th> <Label bsStyle="primary">Product</Label>{' '}</th>
                </tr>
              </thead>
              <tbody>
                {employeeList}
              </tbody>
            </Table>
            
          </div>
        </div>


      </div>
    );
  }
}

export default Redirect;
