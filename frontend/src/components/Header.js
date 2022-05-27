import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import {} from "react-router-dom";
import axios from "axios";
import "./Header.css";
import Loading from "./Loading"

function Header({history}) {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const logoutHandler = async () => {
    if (userInfo) {
    }

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const out = await axios.post(
      "http://localhost:8000/flights/logout",
      {},
      config
    );
    console.log(out.data);
    if (out.data == "ok") {
      localStorage.removeItem("userInfo");
      window.location.reload(false);
    }
  };

  const admin = userInfo ? userInfo.isAdmin : false;

  useEffect(() => {}, [userInfo]);
  const test = () => {
    if (userInfo && admin) {
      return (
        <>
        
          <Nav.Link href="/myflights" class="nav-link active">
            {" "}
            My Flights
          </Nav.Link>
          <NavDropdown title="Administration" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/adminSearch">
              Show Flights && Edit
            </NavDropdown.Item>

            <NavDropdown.Item href="/createFlight">
              Create Flights
            </NavDropdown.Item>

            <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
          </NavDropdown>
        </>
      );
    } else if (userInfo) {
      return (
        <>
          <Nav.Link href="/myflights">My Flights</Nav.Link>
          <NavDropdown title={`${userInfo.name}`} id="collasible-nav-dropdown">
            <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
          </NavDropdown>
        </>
      );
    } else {
      return (
        <>
          <Nav.Link href="/login">Login</Nav.Link>
        </>
      );
    }
  };

  return (
    <Navbar className="navbar navbar-custom" collapseOnSelect>
      <Container>
        {/* <a href="/homepage" class="navbar-left"> <img src="frontend\src\MAFYA-AIR.png"/></a> */}
        <Navbar.Brand href="/homepage">Mafya Air</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto"></Nav>
          <Nav>{test()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
