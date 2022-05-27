import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "react-bootstrap";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import DateFnsUtils from "@date-io/date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterDateFns";
import axios from "axios";
import DateTimePicker from "@mui/lab/DateTimePicker";

import Stack from "@mui/material/Stack";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import DesktopDateTimePicker from "@mui/lab/DesktopDateTimePicker";
//import Airports from '/airports.js'
import Autocomplete from "@mui/material/Autocomplete";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import MainScreen from "../../components/MainScreen";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./createFlight.css";
import * as location from "../../1055-world-locations.json";
import * as success from "../../1127-success.json";
import * as fail from "../../56947-icon-failed.json";
import Lottie from "react-lottie";


const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptions3 = {
  loop: true,
  autoplay: true,
  animationData: fail.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const colorG = "#3ABC5E";
const colorR = "#B2243C";

export default function CreateFlight({ history }) {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;



  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/homepage");
    }
  });

  const [flight, setFlight] = useState({
    Flight_No: "",
    From: "",
    To: "",
    DateD: "",
    DateA: "",
    FirstSeats: "",
    BusinessSeats: "",
    EconomySeats: "",
    FirstPrice: "",
    BusinessPrice: "",
    EconomyPrice: "",
    BaggageAllowanceFirst: "",
    BaggageAllowanceBusiness: "",
    BaggageAllowanceEconomy: "",
  });

  const createFlight = () => {
    if( new Date(flight.DateD).getDate() <=
    new Date(flight.DateA).getDate() &&
    (new Date(flight.DateD).getFullYear()>new Date().getFullYear()||new Date(flight.DateD).getDate()>=new Date().getDate())
    ){
      setloading(true);
      setConfirm(false);
      setOption(defaultOptions1);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      axios
        .post("http://localhost:8000/flights/createFlights", flight, config)
        .then((res) => {
          console.log(res.data)
          if(res.data=="1"){
            setOption(defaultOptions2);
            setMessage("Flight has been created  successfully");
            setmessageColor(colorG);
            setTimeout(() => {
              setloading(false);
              setOption(defaultOptions1);
              setMessage(null);
              setErrorMessage(null)
            }, 3000);
  
          }
          else{
            setOption(defaultOptions3);
            setMessage("Error , Invalid Flight");
            setmessageColor(colorR);
            setTimeout(() => {
              setloading(false);
              setOption(defaultOptions1);
              setMessage(null);
              setErrorMessage(null);
              
            }, 3000);
  
          }
       
  
        }).catch(err=>{
          setOption(defaultOptions3);
          setMessage("Error , please try again later");
          setmessageColor(colorR);
          setTimeout(() => {
            setloading(false);
            setOption(defaultOptions1);
            setMessage(null);
            
          }, 3000);
        })

    }
    else{
      setErrorMessage("Invalid Dates")
    }
 

  };
  const [errorMessage,setErrorMessage] = useState();

  const [processing, setProcessing] = useState(false);

  const [loading, setloading] = useState(false);

  const [confirm,setConfirm] = useState(false);

  const [option,setOption]= useState(defaultOptions1);
  const [message,setMessage]= useState("");
  const [messageColor,setmessageColor]=useState("#3ABC5E");

  return (
    <>
        <div>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap"
        rel="stylesheet"
      />
      <div className="inquiryMain">
    {!processing ?(    
      <>
      <div className="reservationContainer">
        <TableContainer
          className="searchSubContainer"
          sx={{ borderRadius: "0" }}
          component={Paper}
        >
          <h3
            className="heading"
            style={{ paddingLeft: "13px", color: "#3c5977" }}
          >
            Create A Flight
          </h3>
          <Table sx={{ width: "85ch" }} aria-label="simple table">
            <TableRow></TableRow>
            <TableRow>
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                variant="filled"
                label="Flight_No"
                required
                sx={{ m: 1, width: "82.5ch" }}
                type="number"
                value={flight.Flight_No}
                onChange={(event) => {
                  setFlight({ ...flight, Flight_No: event.target.value });
                }}
              />
            </TableRow>

            <TableRow>
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="From"
                variant="filled"
                required
                sx={{ m: 1, width: "40ch" }}
                value={flight.From}
                onChange={(event) => {
                  setFlight({ ...flight, From: event.target.value });
                }}
              />

              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="To"
                variant="filled"
                required
                sx={{ m: 1, width: "40ch" }}
                value={flight.To}
                onChange={(event) => {
                  setFlight({ ...flight, To: event.target.value });
                }}
              />
            </TableRow>

            <TableRow>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField
                      id="filled-basic"
                      InputLabelProps={{ className: "textfieldlabel" }}
                      InputProps={{ className: "textfieldinput" }}
                      label="Filled"
                      variant="filled"
                      required
                      {...props}
                      sx={{ m: 1, width: "40ch" }}
                    />
                  )}
                  label="Departure Date"
                  value={flight.DateD}
                  onChange={(newValue) => {
                    setFlight({ ...flight, DateD: newValue });
                  }}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField
                      id="filled-basic"
                      InputLabelProps={{ className: "textfieldlabel" }}
                      InputProps={{ className: "textfieldinput" }}
                      label="Filled"
                      required
                      variant="filled"
                      {...props}
                      sx={{ m: 1, width: "40ch" }}
                    />
                  )}
                  label="Arrival Date"
                  value={flight.DateA}
                  onChange={(newValue) => {
                    setFlight({ ...flight, DateA: newValue });
                  }}
                />
              </LocalizationProvider>
            </TableRow>

            <TableRow>
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="Filled"
                variant="filled"
                required
                label="First Seats"
                sx={{ m: 1, width: "26ch" }}
                value={flight.FirstSeats}
                type="Number"
                onChange={(event) => {
                  setFlight({ ...flight, FirstSeats: event.target.value });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                label="FirstPrice"
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                variant="filled"
                sx={{ m: 1, width: "26ch" }}
                value={flight.FirstPrice}
                type="Number"
                required
                onChange={(event) => {
                  setFlight({ ...flight, FirstPrice: event.target.value });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="Filled"
                variant="filled"
                label="Baggage allowance first"
                sx={{ m: 1, width: "26ch" }}
                value={flight.BaggageAllowanceFirst}
                type="Number"
                required
                onChange={(event) => {
                  setFlight({
                    ...flight,
                    BaggageAllowanceFirst: event.target.value,
                  });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </TableRow>

            <TableRow>
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="Filled"
                variant="filled"
                label="Business Seats"
                sx={{ m: 1, width: "26ch" }}
                value={flight.BusinessSeats}
                type="Number"
                required
                onChange={(event) => {
                  setFlight({ ...flight, BusinessSeats: event.target.value });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />

              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="Filled"
                variant="filled"
                label="BusinessPrice"
                sx={{ m: 1, width: "26ch" }}
                value={flight.BusinessPrice}
                type="Number"
                required
                onChange={(event) => {
                  setFlight({ ...flight, BusinessPrice: event.target.value });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />

              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="Filled"
                variant="filled"
                label="Baggage allowance business"
                sx={{ m: 1, width: "26ch" }}
                value={flight.BaggageAllowanceBusiness}
                type="Number"
                required
                onChange={(event) => {
                  setFlight({
                    ...flight,
                    BaggageAllowanceBusiness: event.target.value,
                  });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </TableRow>

            <TableRow>
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="Economy Seats"
                variant="filled"
                sx={{ m: 1, width: "26ch" }}
                value={flight.EconomySeats}
                type="Number"
                required
                onChange={(event) => {
                  setFlight({ ...flight, EconomySeats: event.target.value });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />

              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="Filled"
                variant="filled"
                label="EconomyPrice"
                sx={{ m: 1, width: "26ch" }}
                value={flight.EconomyPrice}
                type="Number"
                required
                onChange={(event) => {
                  setFlight({ ...flight, EconomyPrice: event.target.value });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />

              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="Filled"
                variant="filled"
                label="Baggage allowance economy"
                sx={{ m: 1, width: "26ch" }}
                value={flight.BaggageAllowanceEconomy}
                type="Number"
                required
                onChange={(event) => {
                  setFlight({
                    ...flight,
                    BaggageAllowanceEconomy: event.target.value,
                  });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </TableRow>

            <TableRow>
            <h4 style={{color:"red",textAlign:'center',marginTop: "20px"}}>{errorMessage}</h4>
              <Button
                className="createbutton"
                style={{ marginLeft: "195px" }}
                onClick={createFlight}
              >
                Save
              </Button>
              
            </TableRow>
          </Table>
        </TableContainer>
      </div>
    </>):(<></>)}
    <>
        {processing ? (
              <div  style={{width:"1519px",height:"690px",position:'absolute',top:"50px",paddingTop:"16%",}} >
            <Lottie options={defaultOptions1} height={200} width={200} />

           
                
           
              </div>
          ) : (<></> )}
       </>

       <>
    {loading ? (
      <>
        <div style={{width:"1519px",height:"815px",backgroundColor:"#282c34",opacity:"0.8",position:'absolute',top:"50px",paddingTop:"20%",}}>
        </div>
        <div  style={{width:"1519px",height:"815px",position:'absolute',top:"50px",paddingTop:"20%",}} >
            <Lottie options={option} height={200} width={200} />
            
            <h2 style={{color:messageColor,left :"670px" ,textAlign:'center'}}>{message}</h2>
            
        </div>
          </>
      ) : (<></>
      )}
    </>
    </div>
    </div>

    </>
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