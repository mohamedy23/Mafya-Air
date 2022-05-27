import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import MainScreen from "../../components/MainScreen";
import "./InquiryScreen.css";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DateFnsUtils from "@date-io/date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { width } from "@mui/system";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

function SearchScreen({ history }) {
  const [search, setSearch] = useState({
    From: "",
    To: "",
    DateD: "",
    DateA: "",
    FirstNumberOfSeats1: "0",
    BusinessNumberOfSeats1: "0",
    EconomyNumberOfSeats1: "0",
  });


  const [userInfo, setUserInfo] = useState("");
  const [errorMessage,setErrorMessage] = useState();

  const submitHandler = async (e) => {
    setErrorMessage(null);
    e.preventDefault();
    
    const x =
      (search.DateD == "" && search.DateA == "") ||
      (search.DateD == "" &&
      (search.DateA.getFullYear()>new Date().getFullYear()||search.DateA.getDate()>=new Date().getDate())) ||
      (search.DateA == "" &&
      (search.DateD.getFullYear()>new Date().getFullYear()||search.DateD.getDate()>=new Date().getDate())) ||
      (formatDate(search.DateD).getDate() <=
        formatDate(search.DateA).getDate() &&
        (search.DateD.getFullYear()>new Date().getFullYear()||search.DateD.getDate()>=new Date().getDate()));

    if (x) {

      history.push("/showInquiry");
    } else {
      setErrorMessage("invalid Dates");
  

    }
  };

  return (
    <div>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap"
        rel="stylesheet"
      />
    <div className="inquiryMain">
      <div className="reservationContainer">
        <div className="searchSubContainer">
         
     
          <h3
            className="heading"
            style={{ paddingLeft: "13px", color: "#3c5977" }}
          >
            Make An Inquiry
          </h3>
          <Form onSubmit={submitHandler}>
            <div className="form-group">
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                variant="filled"
                sx={{ m: 2, width: "60ch" }}
                label="From"
                value={search.From}
                onChange={(event) => {
                  setSearch({ ...search, From: event.target.value });
                }}
              />
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                label="Filled"
                variant="filled"
                sx={{ m: 2, width: "60ch" }}
                sx={{ m: 2, width: "60ch" }}
                label="To"
                value={search.To}
                onChange={(event) => {
                  setSearch({ ...search, To: event.target.value });
                }}
              />
            </div>

            <div className="form-group">
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                label="Filled"
                variant="filled"
                sx={{ m: 2, width: "38.5ch" }}
                label="First Number Of Seats "
                type="Number"
                value={search.FirstNumberOfSeats1}
                onChange={(event) => {
                  setSearch({
                    ...search,
                    FirstNumberOfSeats1: event.target.value,
                  });
                }}
              />

              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                label="Filled"
                variant="filled"
                sx={{ m: 2, width: "38.5ch" }}
                label="Business Number Of Seats"
                type="Number"
                value={search.BusinessNumberOfSeats1}
                onChange={(event) => {
                  setSearch({
                    ...search,
                    BusinessNumberOfSeats1: event.target.value,
                  });
                }}
              />

              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                label="Filled"
                variant="filled"
                sx={{ m: 2, width: "38.5ch" }}
                label="Economy Number Of Seats"
                type="Number"
                value={search.EconomyNumberOfSeats1}
                onChange={(event) => {
                  setSearch({
                    ...search,
                    EconomyNumberOfSeats1: event.target.value,
                  });
                }}
              />
            </div>

            <div className="form-group">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => (
                    <TextField
                      id="filled-basic"
                      InputLabelProps={{ className: "textfield_label" }}
                      InputProps={{ className: "textfield_inputDate" }}
                      label="Filled"
                      variant="filled"
                      {...props}
                      sx={{ m: 2, width: "60ch" }}
                    />
                  )}
                  label="Departure Date"
                  value={search.DateD}
                  onChange={(newValue) => {
                    setSearch({ ...search, DateD: newValue });
                  }}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => (
                    <TextField
                      id="filled-basic"
                      InputLabelProps={{ className: "textfield_label" }}
                      InputProps={{ className: "textfield_inputDate" }}
                      label="Filled"
                      variant="filled"
                      {...props}
                      sx={{ m: 2, width: "60ch" }}
                    />
                  )}
                  label="Arrival Date"
                  value={search.DateA}
                  onChange={(newValue) => {
                    setSearch({ ...search, DateA: newValue });
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="form-group">
              <h4 style={{color:"red",textAlign:'center'}}>{errorMessage}</h4>
              <Button
                className="inquirybutton"
                type="submit"
                onClick={() =>
                  sessionStorage.setItem(
                    "inquiryFlights",
                    JSON.stringify(search)
                  )
                }
              >
                Search
              </Button>
             
            </div>
          </Form>
        </div>
      </div>
    </div>
    </div>
  );
}

function formatDate(dateVal) {
  var newDate = new Date(dateVal);

  var sMonth = padValue(newDate.getMonth() + 1);
  var sDay = padValue(newDate.getDate());
  var sYear = newDate.getFullYear();
  var sHour = newDate.getHours();
  var sMinute = padValue(newDate.getMinutes());
  var sAMPM = "AM";

  var iHourCheck = parseInt(sHour);

  if (iHourCheck > 12) {
    sAMPM = "PM";
    sHour = iHourCheck - 12;
  } else if (iHourCheck === 0) {
    sHour = "12";
  }

  sHour = padValue(sHour);

  return new Date(sYear, sMonth, sDay, sHour, sMinute, 0);
}
function padValue(value) {
  return value < 10 ? "0" + value : value;
}

export default SearchScreen;
