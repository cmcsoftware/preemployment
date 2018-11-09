import React from "react";
import {NavLink} from "react-router-dom";

const Navigation = () => {
return(
    <div>
        <NavLink to="/">Home</NavLink>
        <br/>
        <NavLink to="/about">About</NavLink>
        <br/>
        <NavLink to="/contact">Contact</NavLink>
        <br/>
        <NavLink to="/register">Register</NavLink>
        <br/>
        <NavLink to="/show">Show Users</NavLink>        
        <br/>
        <NavLink to="/login">Login</NavLink>
        <br/>
        <NavLink to="/grid">Grid Example</NavLink>
        <br/>
    </div>
);

}

export default Navigation;