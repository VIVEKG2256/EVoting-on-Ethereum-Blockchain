import React from "react";
import logo from './iiitm.png';
import './header.css';

function Header(){
    return(
        <div className="header"><h1 ><img  className="logo" src={logo}/>IIIT Manipur Voting System</h1></div>
    );
}
export default Header;