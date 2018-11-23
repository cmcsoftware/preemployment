import React from 'react'
import { Dropdown, Button, Label } from 'semantic-ui-react'
import DatePicker from "react-date-picker";
import moment from 'moment'; 
 
import "react-datepicker/dist/react-datepicker.css";
import 'semantic-ui-css/semantic.min.css';



class Teste extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      origin: this.fillOrigins(),        
      destination: [],
      selectedOrigin : "",
      selectedDestination : "",
      searchResult: undefined,
      date: new Date()
    };    
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleDestinationCity = this.handleDestinationCity.bind(this);
    this.insertFlight = this.insertFlight.bind(this);
    this.searchFlight = this.searchFlight.bind(this);
    
  }

  handleChange(newDate) {
    this.setState({
      date: newDate
    });
  }


  searchFlight(event){    
    var backendDate = moment(this.state.date).format('MM/DD/YYYY');
    let url = "http://192.168.209.75:8080/flight/getFlight?origin="+ this.state.selectedOrigin + "&destination=" + this.state.selectedDestination
    + "&date=" + backendDate;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })            
      .then(response => {
        console.log("response:==", response);
        response.text().then (text =>{
          console.log("text:==", text);
          this.setState({ searchResult: text })
        });        
      }); 
  }

  handleDestinationCity(event,selection) {    
    this.setState({selectedDestination:selection.value, searchResult:""});    
  }


  insertFlight(event){
    var backendDate = moment(this.state.date).format('DD/MM/YYYY');
    let url = "http://127.0.0.1:8080/flight/insert?origin=" + this.state.selectedOrigin + "&destination=" + this.state.selectedDestination
    + "&date=" + backendDate;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  handleChangeCity(event,selection) {
    this.setState({searchResult:"", selectedOrigin:selection.value});    
    let url = "http://192.168.209.75:8080/flight/getDestinations?origin=" + selection.value;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("response", data);
        const result = [];
        data.forEach(element => {
          result.push({ text: element, key:element, value:element})
        });
        this.setState({ destination: result });
      });    

  }

  fillOrigins = () => {
    let url = "http://192.168.209.75:8080/flight/getOrigins";
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("response", data);
        const result = [];
        data.forEach(element => {
          result.push({ text: element, key:element, value:element})
        });
        this.setState({ origin: result });
      });
  };


  render() {

    return (
      <div className="container">
      <Dropdown placeholder='Orasul de plecare' fluid search selection options={this.state.origin} onChange = {this.handleChangeCity} />
      <br/>
      <Dropdown placeholder='Orasul destinatie' fluid search selection options={this.state.destination} onChange = {this.handleDestinationCity} />      
      <br/>
      <DatePicker
          onChange={this.handleChange} locale="ro"
          value={this.state.date}
        />
        <br/>
        <Button  content='Search' onClick = {this.searchFlight} />
        <Button  content='Insert' onClick = {this.insertFlight} />
        {this.state.searchResult ? <Label content = {this.state.searchResult}/> : null }
           
        
      </div>
    );
  }

 
}

export default Teste;
