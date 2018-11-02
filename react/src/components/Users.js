import React, { Component } from 'react';
import '../App.css';
import { Table, Label } from 'react-bootstrap';


class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            surname: '',
            stuff: '',
            users: []
        };


    }

    componentDidMount() {
        this.getUsers();
    }




    getUsers() {
        let url = "http://192.168.209.75:8080/user/getAllUsers";
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




    render() {
        const list = [];
        this.state.users.forEach((item, index) => {
            const color = "info";
            list.push(
                <tr key={index}>
                    <td>
                        {item.username}{' '}
                    </td>
                    <td>{item.name}{' '}</td>
                    <td>{item.surname}{' '}</td>
                    <td><Label bsStyle={color}>{item.stuff}</Label>{' '}</td>                    
                </tr>

            )
        })



        return (
            <div className="container">
                <div className="row" style={{ paddingTop: '10px' }}>
                    <div className="col-md-6" >                        
                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Stuff</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list}
                            </tbody>
                        </Table>
                    </div>
                </div>


            </div>
        );
    }
}

export default Users;
