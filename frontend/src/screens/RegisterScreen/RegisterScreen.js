import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./RegisterScreen.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import pic from "../../register.png";

function RegisterScreen({ history }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [passport, setPassport] = useState("");

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const userInfo = localStorage.getItem("userInfo");
  // useEffect(() => {
  //   if (userInfo) {
  //     history.push("/");
  //   }
  // }, [history,userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmpassword) {
      setLoading(false);
      setError("Passwords do not match");
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:8000/flights/signup",
          {
            name: name,
            email: email,
            age: age,
            passport: passport,
            password: password,
          },
          config
        );

        if (data instanceof Array) {
          setLoading(false);
          setError(data);
        } else {
          localStorage.setItem("userInfo", JSON.stringify(data));
          setLoading(false);
          setError("");
          history.push("/homePage");
          window.location.reload();
        }
      } catch (err) {
        setLoading(false);
        setError("error try again");
      }
    }
  };

  return (
    <div className="Background">
      <div className="registerContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        <img
          src={pic}
          style={{ height: "200px", marginBottom: "-30px", marginTop: "-30px" }}
        ></img>
        <Form onSubmit={submitHandler}>
          <div className="form-group">
            <TextField
              id="filled-basic"
              InputLabelProps={{ className: "textfield__label" }}
              InputProps={{ className: "textfield__input" }}
              label="Filled"
              variant="filled"
              sx={{ m: 1, width: "60ch" }}
              type="name"
              value={name}
              label="Name"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </div>

          <div className="form-group">
            <TextField
              id="filled-basic"
              InputLabelProps={{ className: "textfield__label" }}
              InputProps={{ className: "textfield__input" }}
              label="Filled"
              variant="filled"
              sx={{ m: 1, width: "60ch" }}
              label="Email address"
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </div>
          <div className="form-group">
            <TextField
              id="filled-basic"
              InputLabelProps={{ className: "textfield__label" }}
              InputProps={{ className: "textfield__input" }}
              label="Filled"
              variant="filled"
              sx={{ m: 1, width: "60ch" }}
              label="Age"
              type="number"
              value={age}
              placeholder="Enter Your Age"
              onChange={(e) => setAge(e.target.value)}
            ></TextField>
          </div>
          <div className="form-group">
            <TextField
              id="filled-basic"
              InputLabelProps={{ className: "textfield__label" }}
              InputProps={{ className: "textfield__input" }}
              label="Filled"
              variant="filled"
              sx={{ m: 1, width: "60ch" }}
              label="Passport Number"
              value={passport}
              placeholder="Enter Passport Number"
              onChange={(e) => setPassport(e.target.value)}
            ></TextField>
          </div>

          <div className="form-group">
            <TextField
              id="filled-basic"
              InputLabelProps={{ className: "textfield__label" }}
              InputProps={{ className: "textfield__input" }}
              label="Filled"
              variant="filled"
              sx={{ m: 1, width: "60ch" }}
              label="Password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </div>

          <div className="form-group">
            <TextField
              id="filled-basic"
              InputLabelProps={{ className: "textfield__label" }}
              InputProps={{ className: "textfield__input" }}
              label="Filled"
              variant="filled"
              sx={{ m: 1, width: "60ch", color: "white" }}
              label="Confirm Password"
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></TextField>
          </div>
          <div className="form-group">
            <Button className="registerbutton" type="submit">
              Register
            </Button>
            {loading && <Loading />}
          </div>
        </Form>
        <Row className="py-3">
          <Col style={{ marginLeft: "21px", color: "white" }}>
            Have an Account ?{" "}
            <Link style={{ color: "#3c597" }} to="/login">
              Login
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default RegisterScreen;
