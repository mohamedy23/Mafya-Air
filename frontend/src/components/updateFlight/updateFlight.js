import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "react-bootstrap";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
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
import { Component, useState, useEffect, useParams } from "react";
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
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./updateFlight.css";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function CreateFlight(props) {
  const theme = useTheme();
  const history = props.history;

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;


  useEffect(() => {
    setProcessing(true);
    if (!userInfo || !userInfo.isAdmin) {
     
      history.push("/homepage");
    } else {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      axios
        .get(
          `http://localhost:8000/flights/updateFlights/${props.match.params.id}`,
          config
        )
        .then((res) => {
      
          setFlight(res.data);
          setTimeout(() => {
            setProcessing(false);
          }, 1500);
        });
    }
  }, []);

  const [DseatsF, setDseatsF] = useState([]);
  const [DseatsB, setDseatsB] = useState([]);
  const [DseatsE, setDseatsE] = useState([]);

  const [DseatsFR, setDseatsFR] = useState([]);
  const [DseatsBR, setDseatsBR] = useState([]);
  const [DseatsER, setDseatsER] = useState([]);

  const [flight, setFlight] = useState({
    Flight_No: "",
    From: "",
    To: "",
    DateD: "",
    DateA: "",
    FirstSeats: "",
    ReservedFirstSeats: "",
    FirstPrice: "",
    FirstSeatsNumbers: [],
    ReservedFirstSeatsNumbers: [],
    BusinessSeats: "",
    ReservedBusinessSeats: "",
    BusinessPrice: "",
    BusinessSeatsNumbers: [],
    ReservedBusinessSeatsNumbers: [],
    EconomySeats: "",
    ReservedEconomySeats: "",
    EconomyPrice: "",
    EconomySeatsNumbers: [],
    ReservedEconomySeatsNumbers: [],
    BaggageAllowanceFirst: "",
    BaggageAllowanceBusiness: "",
    BaggageAllowanceEconomy: "",
  });

  const updateFlight = () => {
    setMessage(null);
    setErrorMessage(null);
    if( new Date(flight.DateD).getDate() <=
    new Date(flight.DateA).getDate() && 
    (new Date(flight.DateD).getFullYear()>new Date().getFullYear()||new Date(flight.DateD).getDate()>=new Date().getDate()) ){
      
      try {
        setloading(true);
        setConfirm(false);
        setOption(defaultOptions1);
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        handleDiff();
  
        axios
          .post(
            `http://localhost:8000/flights/doUpdateFlights/${props.match.params.id}`,
            flight,
            config
          )
          .then((res) => {
            if(res.data=="1"){
              setOption(defaultOptions2);
              setMessage("Flight has been Updated  successfully");
              setmessageColor(colorG);
              setTimeout(() => {
                setloading(false);
                setOption(defaultOptions1);

                window.location.reload(false);
              }, 3000);
            }
            else{
              setOption(defaultOptions3);
              setMessage("Error , Invalid Flight Data");
              setmessageColor(colorR);
              setTimeout(() => {
                setloading(false);
                setOption(defaultOptions1);
                setMessage(null);
                
              }, 3000);
            }
           
          });
      } catch (error) {
        setOption(defaultOptions3);
        setMessage("Error , please try again later");
        setmessageColor(colorR);
        setTimeout(() => {
          setloading(false);
          setOption(defaultOptions1);
          setMessage(null);
          
        }, 3000);

      }

    }
    else{
      setErrorMessage("Invalid Dates")
    }
   

  };
  const handleDiff = () => {
    diffSets(flight.FirstSeatsNumbers, DseatsF);
    diffSets(flight.ReservedFirstSeatsNumbers, DseatsFR);
    diffSets(flight.BusinessSeatsNumbers, DseatsB);
    diffSets(flight.ReservedBusinessSeatsNumbers, DseatsBR);
    diffSets(flight.EconomySeatsNumbers, DseatsE);
    diffSets(flight.ReservedEconomySeatsNumbers, DseatsER);
  };

  const diffSets = (arr1, arr2) => {
    let n = arr2.length;
    let i = 0;
    for (i = 0; i < n; i++) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }

    return arr1;
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
    {!processing ? (    
      <>
      <div className="reservationContainer">
        <div>

          <TableContainer
            className="searchSubContainer"
            sx={{ borderRadius: "0" }}
            component={Paper}
          >
            <h3
              className="heading"
              style={{ paddingLeft: "13px", color: "#3c5977" }}
            >
              Update A Flight
            </h3>
            <Table sx={{ width: "85ch" }} aria-label="simple table">
              <TableRow></TableRow>

              <TableRow>
                <TextField
                  id="filled-basic"
                  InputLabelProps={{ className: "textfield_label" }}
                  InputProps={{ className: "textfield_input" }}
                  variant="filled"
                  label="Flight_No"
                  sx={{ m: 1, width: "86.5ch" }}
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
                  InputLabelProps={{ className: "textfield_label" }}
                  InputProps={{ className: "textfield_input" }}
                  variant="filled"
                  label="From"
                  sx={{ m: 1, width: "42ch" }}
                  value={flight.From}
                  onChange={(event) => {
                    setFlight({ ...flight, From: event.target.value });
                  }}
                />
                <TextField
                  id="filled-basic"
                  InputLabelProps={{ className: "textfield_label" }}
                  InputProps={{ className: "textfield_input" }}
                  variant="filled"
                  label="To"
                  sx={{ m: 1, width: "42ch" }}
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
                        InputLabelProps={{ className: "textfield_label" }}
                        InputProps={{ className: "textfield_input" }}
                        variant="filled"
                        {...props}
                        sx={{ m: 1, width: "42ch" }}
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
                        InputLabelProps={{ className: "textfield_label" }}
                        InputProps={{ className: "textfield_input" }}
                        variant="filled"
                        {...props}
                        sx={{ m: 1, width: "42ch" }}
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
                <FormControl sx={{ m: 1, width: "42ch" }}>
                  <InputLabel
                    sx={{
                      color: "#3c5977",
                      fontFamily: "Montserrat",
                      fontSize: "15px",
                      fontWeight: "700",
                      alignItems: "left",
                    }}
                    classname="test-label"
                    id="demo-multiple-name-label"
                  >
                    Remove available first seats
                  </InputLabel>
                  <Select
                    sx={{ backgroundColor: "#f0f0f0" }}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={DseatsF}
                    onChange={(event) => {
                      setDseatsF(
                        typeof event.target.value === "string"
                          ? event.target.value.split(",")
                          : event.target.value
                      );
                    }}
                    input={
                      <OutlinedInput label="Remove available first seats" />
                    }
                    MenuProps={MenuProps}
                  >
                    {flight.FirstSeatsNumbers.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, DseatsF, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, width: "42ch" }}>
                  <InputLabel
                    sx={{
                      color: "#3c5977",
                      fontFamily: "Montserrat",
                      fontSize: "15px",
                      fontWeight: "700",
                      alignItems: "center",
                    }}
                    id="demo-multiple-name-label"
                  >
                    Cancel reserved first seats
                  </InputLabel>
                  <Select
                    sx={{ backgroundColor: "#f0f0f0" }}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={DseatsFR}
                    onChange={(event) => {
                      setDseatsFR(
                        typeof event.target.value === "string"
                          ? event.target.value.split(",")
                          : event.target.value
                      );
                    }}
                    input={
                      <OutlinedInput label="Remove reserved first seats" />
                    }
                    MenuProps={MenuProps}
                  >
                    {flight.ReservedFirstSeatsNumbers.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, DseatsFR, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableRow>

              <TableRow>
                <FormControl sx={{ m: 1, width: "42ch" }}>
                  <InputLabel
                    sx={{
                      color: "#3c5977",
                      fontFamily: "Montserrat",
                      fontSize: "15px",
                      fontWeight: "700",
                      alignItems: "center",
                    }}
                    id="demo-multiple-name-label"
                  >
                    Remove available business seats
                  </InputLabel>
                  <Select
                    sx={{ backgroundColor: "#f0f0f0" }}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={DseatsB}
                    onChange={(event) => {
                      setDseatsB(
                        typeof event.target.value === "string"
                          ? event.target.value.split(",")
                          : event.target.value
                      );
                    }}
                    input={
                      <OutlinedInput label="Remove available business seats" />
                    }
                    MenuProps={MenuProps}
                  >
                    {flight.BusinessSeatsNumbers.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, DseatsB, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, width: "42ch" }}>
                  <InputLabel
                    sx={{
                      color: "#3c5977",
                      fontFamily: "Montserrat",
                      fontSize: "15px",
                      fontWeight: "700",
                      alignItems: "center",
                    }}
                    id="demo-multiple-name-label"
                  >
                    Cancel reserved business seats
                  </InputLabel>
                  <Select
                    sx={{ backgroundColor: "#f0f0f0" }}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={DseatsBR}
                    onChange={(event) => {
                      setDseatsBR(
                        typeof event.target.value === "string"
                          ? event.target.value.split(",")
                          : event.target.value
                      );
                    }}
                    input={
                      <OutlinedInput label="Cancel reserved business seats" />
                    }
                    MenuProps={MenuProps}
                  >
                    {flight.ReservedBusinessSeatsNumbers.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, DseatsBR, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableRow>

              <TableRow>
                <FormControl sx={{ m: 1, width: "42ch" }}>
                  <InputLabel
                    sx={{
                      color: "#3c5977",
                      fontFamily: "Montserrat",
                      fontSize: "15px",
                      fontWeight: "700",
                      alignItems: "center",
                    }}
                    id="demo-multiple-name-label"
                  >
                    Remove available economy seats
                  </InputLabel>
                  <Select
                    sx={{ backgroundColor: "#f0f0f0" }}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={DseatsE}
                    onChange={(event) => {
                      setDseatsE(
                        typeof event.target.value === "string"
                          ? event.target.value.split(",")
                          : event.target.value
                      );
                    }}
                    input={
                      <OutlinedInput label="Remove available economy seats" />
                    }
                    MenuProps={MenuProps}
                  >
                    {flight.EconomySeatsNumbers.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, DseatsE, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, width: "42ch" }}>
                  <InputLabel
                    sx={{
                      color: "#3c5977",
                      fontFamily: "Montserrat",
                      fontSize: "15px",
                      fontWeight: "700",
                      alignItems: "center",
                    }}
                    id="demo-multiple-name-label"
                  >
                    Cancel reserved economy seats
                  </InputLabel>
                  <Select
                    sx={{ backgroundColor: "#f0f0f0" }}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={DseatsER}
                    onChange={(event) => {
                      setDseatsER(
                        typeof event.target.value === "string"
                          ? event.target.value.split(",")
                          : event.target.value
                      );
                    }}
                    input={
                      <OutlinedInput label="Cancel reserved economy seats" />
                    }
                    MenuProps={MenuProps}
                  >
                    {flight.ReservedEconomySeatsNumbers.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, DseatsER, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableRow>

              <TableRow>
                <TextField
                  id="filled-basic"
                  InputLabelProps={{ className: "textfield_label" }}
                  InputProps={{ className: "textfield_input" }}
                  variant="filled"
                  label="FirstPrice"
                  sx={{ m: 1, width: "27.1ch" }}
                  value={flight.FirstPrice}
                  type="Number"
                  onChange={(event) => {
                    setFlight({ ...flight, FirstPrice: event.target.value });
                  }}
                  InputProps={{ inputProps: { min: 0 } }}
                />
                <TextField
                  id="filled-basic"
                  InputLabelProps={{ className: "textfield_label" }}
                  InputProps={{ className: "textfield_input" }}
                  variant="filled"
                  label="BusinessPrice"
                  sx={{ m: 1, width: "27.1ch" }}
                  value={flight.BusinessPrice}
                  type="Number"
                  onChange={(event) => {
                    setFlight({ ...flight, BusinessPrice: event.target.value });
                  }}
                  InputProps={{ inputProps: { min: 0 } }}
                />
                <TextField
                  id="filled-basic"
                  InputLabelProps={{ className: "textfield_label" }}
                  InputProps={{ className: "textfield_input" }}
                  variant="filled"
                  label="EconomyPrice"
                  sx={{ m: 1, width: "27.1ch" }}
                  value={flight.EconomyPrice}
                  type="Number"
                  onChange={(event) => {
                    setFlight({ ...flight, EconomyPrice: event.target.value });
                  }}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </TableRow>

              <TableRow>
                <TextField
                  id="filled-basic"
                  InputLabelProps={{ className: "textfield_label" }}
                  InputProps={{ className: "textfield_input" }}
                  variant="filled"
                  label="Baggage allowance first"
                  sx={{ m: 1, width: "27.1ch" }}
                  value={flight.BaggageAllowanceFirst}
                  type="Number"
                  onChange={(event) => {
                    setFlight({
                      ...flight,
                      BaggageAllowanceFirst: event.target.value,
                    });
                  }}
                  InputProps={{ inputProps: { min: 0 } }}
                />
                <TextField
                  id="filled-basic"
                  InputLabelProps={{ className: "textfield_label" }}
                  InputProps={{ className: "textfield_input" }}
                  variant="filled"
                  label="Baggage allowance business"
                  sx={{ m: 1, width: "27.1ch" }}
                  value={flight.BaggageAllowanceBusiness}
                  type="Number"
                  onChange={(event) => {
                    setFlight({
                      ...flight,
                      BaggageAllowanceBusiness: event.target.value,
                    });
                  }}
                  InputProps={{ inputProps: { min: 0 } }}
                />
                <TextField
                  id="filled-basic"
                  InputLabelProps={{ className: "textfield_label" }}
                  InputProps={{ className: "textfield_input" }}
                  variant="filled"
                  label="Baggage allowance economy"
                  sx={{ m: 1, width: "27.1ch" }}
                  value={flight.BaggageAllowanceEconomy}
                  type="Number"
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
                  style={{  marginLeft: "206.5px" }}
                  onClick={updateFlight}
                >
                  update
                </Button>
              </TableRow>
            </Table>
          </TableContainer>
        </div>
      </div>
      </>
      ):(<></>)}

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
        <div style={{width:"1519px",height:"870px",backgroundColor:"#282c34",opacity:"0.8",position:'absolute',top:"50px",paddingTop:"20%",}}>
        </div>
        <div  style={{width:"1519px",height:"870px",position:'absolute',top:"50px",paddingTop:"16%",}} >
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
