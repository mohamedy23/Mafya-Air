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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { textAlign } from "@mui/system";
import Paper from "@mui/material/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./bookFlight.css";
import * as location from "../../1055-world-locations.json";
import * as success from "../../1127-success.json";
import Lottie from "react-lottie";


const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
//import TextField from '@material-ui/core/TextField';
//import createFlight from '../'

{
  /**Function must start with upper case */
}
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

export default function CreateFlight({ history }) {
  const theme = useTheme();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const [DseatsF, setDseatsF] = useState([]);
  const [DseatsB, setDseatsB] = useState([]);
  const [DseatsE, setDseatsE] = useState([]);
  const [AseatsF, setAseatsF] = useState([]);
  const [AseatsB, setAseatsB] = useState([]);
  const [AseatsE, setAseatsE] = useState([]);


  const [f1,setF1] = useState(0);;
  const [b1,setB1] = useState(0);;
  const [e1,setE1] = useState(0);;
  const [f2,setF2] = useState(0);;
  const [b2,setB2] = useState(0);;
  const [e2,setE2] = useState(0);;

  useEffect(() => {
    setProcessing(true);
    

    var firstId = JSON.parse(sessionStorage.getItem("flightsBook")).firstId;
    var secondId = JSON.parse(sessionStorage.getItem("flightsBook")).secondId;




    axios.get(`http://localhost:8000/flights/bookFlights/${firstId}`).then((res)=>{
      setF1(JSON.parse(sessionStorage.getItem("clientFlights")).FirstNumberOfSeats1*res.data.FirstPrice);
      setB1(JSON.parse(sessionStorage.getItem("clientFlights")).BusinessNumberOfSeats1*res.data.BusinessPrice);
      setE1(JSON.parse(sessionStorage.getItem("clientFlights")).EconomyNumberOfSeats1*res.data.EconomyPrice);
      console.log(res.data.FirstPrice);

      setFlight1({
        clientId:userInfo?userInfo._id:'',
        flightId:firstId,
        Flight_No:res.data.Flight_No,
        From:res.data.From,
        To:res.data.To,
        DateD:res.data.DateD,
        DateA:res.data.DateA,
        FirstNumberOfSeats:JSON.parse(sessionStorage.getItem("clientFlights")).FirstNumberOfSeats1,
        FirstPrice:res.data.FirstPrice,
        BusinessNumberOfSeats:JSON.parse(sessionStorage.getItem("clientFlights")).BusinessNumberOfSeats1,
        BusinessPrice:res.data.BusinessPrice,
        EconomyNumberOfSeats:JSON.parse(sessionStorage.getItem("clientFlights")).EconomyNumberOfSeats1,
        EconomyPrice:res.data.EconomyPrice,
        FirstSeatsNumbers:[],
        BusinessSeatsNumbers :[],
        EconomySeatsNumbers : [],
        TotalPrice:(JSON.parse(sessionStorage.getItem("clientFlights")).FirstNumberOfSeats1*res.data.FirstPrice)+
                     (JSON.parse(sessionStorage.getItem("clientFlights")).BusinessNumberOfSeats1*res.data.BusinessPrice)+
                     (JSON.parse(sessionStorage.getItem("clientFlights")).EconomyNumberOfSeats1*res.data.EconomyPrice),
        BaggageAllowanceFirst:res.data.BaggageAllowanceFirst,
        BaggageAllowanceBusiness:res.data.BaggageAllowanceBusiness,
        BaggageAllowanceEconomy:res.data.BaggageAllowanceEconomy,
        TotalBaggageAlowance:(JSON.parse(sessionStorage.getItem("clientFlights")).FirstNumberOfSeats1*res.data.BaggageAllowanceFirst)+
                             (JSON.parse(sessionStorage.getItem("clientFlights")).BusinessNumberOfSeats1*res.data.BaggageAllowanceBusiness)+
                             (JSON.parse(sessionStorage.getItem("clientFlights")).EconomyNumberOfSeats1*res.data.BaggageAllowanceEconomy),
        NumberOfChildren:JSON.parse(sessionStorage.getItem("clientFlights")).children1
      }) 

      setDseatsF(res.data.FirstSeatsNumbers)
      setDseatsB(res.data.BusinessSeatsNumbers)
      setDseatsE(res.data.EconomySeatsNumbers)
      
      
    
    })

      axios.get(`http://localhost:8000/flights/bookFlights/${secondId}`).then((res)=>{
        setF2(JSON.parse(sessionStorage.getItem("clientFlights")).FirstNumberOfSeats2*res.data.FirstPrice);
        setB2(JSON.parse(sessionStorage.getItem("clientFlights")).BusinessNumberOfSeats2*res.data.BusinessPrice);
        setE2(JSON.parse(sessionStorage.getItem("clientFlights")).EconomyNumberOfSeats2*res.data.EconomyPrice);
        setFlight2({
          clientId:userInfo?userInfo._id:'',
          flightId:secondId,
          Flight_No:res.data.Flight_No,
          From:res.data.From,
          To:res.data.To,
          DateD:res.data.DateD,
          DateA:res.data.DateA,
          FirstNumberOfSeats:JSON.parse(sessionStorage.getItem("clientFlights")).FirstNumberOfSeats2,
          FirstPrice:res.data.FirstPrice,
          BusinessNumberOfSeats:JSON.parse(sessionStorage.getItem("clientFlights")).BusinessNumberOfSeats2,
          BusinessPrice:res.data.BusinessPrice,
          EconomyNumberOfSeats:JSON.parse(sessionStorage.getItem("clientFlights")).EconomyNumberOfSeats2,
          EconomyPrice:res.data.EconomyPrice,
          FirstSeatsNumbers:[],
          BusinessSeatsNumbers :[],
          EconomySeatsNumbers : [],
          TotalPrice:(JSON.parse(sessionStorage.getItem("clientFlights")).FirstNumberOfSeats2*res.data.FirstPrice)+
                      (JSON.parse(sessionStorage.getItem("clientFlights")).BusinessNumberOfSeats2*res.data.BusinessPrice)+
                      (JSON.parse(sessionStorage.getItem("clientFlights")).EconomyNumberOfSeats2*res.data.EconomyPrice),
          BaggageAllowanceFirst:res.data.BaggageAllowanceFirst,
          BaggageAllowanceBusiness:res.data.BaggageAllowanceBusiness,
          BaggageAllowanceEconomy:res.data.BaggageAllowanceEconomy,
          TotalBaggageAlowance:(JSON.parse(sessionStorage.getItem("clientFlights")).FirstNumberOfSeats2*res.data.BaggageAllowanceFirst)+
                               (JSON.parse(sessionStorage.getItem("clientFlights")).BusinessNumberOfSeats2*res.data.BaggageAllowanceBusiness)+
                                (JSON.parse(sessionStorage.getItem("clientFlights")).EconomyNumberOfSeats2*res.data.BaggageAllowanceEconomy),
          NumberOfChildren:JSON.parse(sessionStorage.getItem("clientFlights")).children2

        
        })
        setAseatsF(res.data.FirstSeatsNumbers)
        setAseatsB(res.data.BusinessSeatsNumbers)
        setAseatsE(res.data.EconomySeatsNumbers)

      
        setTimeout(() => {
          setProcessing(false);
        }, 1500);

    
    
    })

  },[]);

  const [flight1, setFlight1] = useState({
    clientId: "",
    flightId: "",
    Flight_No: "",
    From: "",
    To: "",
    DateD: "",
    DateA: "",
    FirstNumberOfSeats: "0",
    FirstPrice: "0",
    BusinessNumberOfSeats: "0",
    BusinessPrice: "0",
    EconomyNumberOfSeats: "0",
    EconomyPrice: "0",
    FirstSeatsNumbers: [],
    BusinessSeatsNumbers: [],
    EconomySeatsNumbers: [],
    totalPrice: "0",
    BaggageAllowanceFirst: "0",
    BaggageAllowanceBusiness: "0",
    BaggageAllowanceEconomy: "0",
    BaggageAllowanceBusiness: "0",
    TotalBaggageAlowance: "0",
    NumberOfChildren: "0",
  });

  const [flight2, setFlight2] = useState({
    clientId: "",
    flightId: "",
    Flight_No: "",
    From: "",
    To: "",
    DateD: "",
    DateA: "",
    FirstNumberOfSeats: "0",
    FirstPrice: "0",
    BusinessNumberOfSeats: "0",
    BusinessPrice: "0",
    EconomyNumberOfSeats: "0",
    EconomyPrice: "0",
    FirstSeatsNumbers: [],
    BusinessSeatsNumbers: [],
    EconomySeatsNumbers: [],
    totalPrice: "0",
    BaggageAllowanceFirst: "0",
    BaggageAllowanceBusiness: "0",
    BaggageAllowanceEconomy: "0",
    BaggageAllowanceBusiness: "0",
    TotalBaggageAlowance: "0",
    NumberOfChildren: "0",
  });

  const bookSeats =async () =>{
    

    if(userInfo){
      if(flight1.FirstSeatsNumbers.length==flight1.FirstNumberOfSeats && flight1.BusinessSeatsNumbers.length==flight1.BusinessNumberOfSeats && flight1.EconomySeatsNumbers.length==flight1.EconomyNumberOfSeats&&
        flight2.FirstSeatsNumbers.length==flight2.FirstNumberOfSeats && flight2.BusinessSeatsNumbers.length==flight2.BusinessNumberOfSeats && flight2.EconomySeatsNumbers.length==flight2.EconomyNumberOfSeats){
          bookSeatsCon();
          
      }
      else{
        setErrorMessage('Invalid seats Numbers');

    }
    }
    else{
      setErrorMessage('You have to Login First');
      

    }
  
  }

  const bookSeatsCon =async () =>{
   
    sessionStorage.setItem('bookFlights',JSON.stringify({'flight1':flight1,'flight2':flight2}));
    const paymentInfo =[{"s":"First Class Depature Flight seats ","n":f1},{"s":"Business Depature Flight seats ","n":b1}, {"s":"Economy Depature Flight seats ","n":e1},{"s":"Total Depature Flight","n":f1+b1+e1},
                        {"s":"First Class Return Flight seats ","n":f2},{"s":"Business Return Flight seats ","n":b2}, {"s":"Economy Return Flight seats ","n":e2},{"s":"Total Return Flight","n":f2+b2+e2},{"s":"Total ","n":f1+b1+e1+f2+b2+e2}];
     sessionStorage.setItem('payment',JSON.stringify(paymentInfo));
     sessionStorage.setItem('amount',JSON.stringify(f1+b1+e1+f2+b2+e2));
     history.push("/payment")
 }
 const handleChange = (event,x,y) => {

    
  const {
    target: { value },
  } = event;

  return typeof value.length === 'string' ? (value.split(',').length>y?x: value.split(',')): (value.length>y?x:value)

};
const [processing, setProcessing] = useState(false);
const [errorMessage,setErrorMessage] = useState();
  return (
    <>
    <div>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap"
        rel="stylesheet"
      />
      <div className="TicketContainer">
    {!processing ? (      
    <>
      
      <div className="progressss">
        <button className="progressButtonnn" onClick={()=>history.push("/search")} >Search</button>
        <div className="progressbarrr1"></div>
        <button className="progressButtonnn1" onClick={()=>history.push("/show")} >Flights</button>
        <div className="progressbarrr2"></div>
        <button disabled className="progressButtonnn2">seats</button>
        <div className="progressbarrr3"></div>
        <button disabled className="progressButtonnn3">Payment</button>
      </div>
      <div className="TicketSubContainer1">
        <Card className="Ticketcard" sx={{ m: 3 }}>
          <h3 className="TicketHead">Mafya Air Ticket</h3>
          <CardContent>
            <TableContainer component={Paper} className="tableContainer1">
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" className="TableCell">
                      FlightNo :{" "}
                      <span style={{ color: "black" }}>
                        {flight1.Flight_No}
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" className="TableCell">
                      Total Price :{" "}
                      <span style={{ color: "black" }}>
                        {" "}
                        {flight1.TotalPrice} $
                      </span>
                    </TableCell>
                    <TableCell align="left" className="TableCell">
                      {" "}
                      Total Baggage Alowance :{" "}
                      <span style={{ color: "black" }}>
                        {flight1.TotalBaggageAlowance}
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="TableCell">
                      From :{" "}
                      <span style={{ color: "black" }}>{flight1.From}</span>
                    </TableCell>
                    <TableCell className="TableCell">
                      To :{" "}
                      <span style={{ color: "black" }}>{flight1.To}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="TableCell">
                      Departure Time :{" "}
                      <span style={{ color: "black" }}>
                        {departureHour(flight1.DateD)}{" "}
                      </span>
                    </TableCell>
                    <TableCell className="TableCell" align="left">
                      Arrival Time :{" "}
                      <span style={{ color: "black" }}>
                        {departureHour(flight1.DateA)}
                      </span>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="TableCell">
                      Departure Day :{" "}
                      <span style={{ color: "black" }}>
                        {departureDay(flight1.DateD)}
                      </span>
                    </TableCell>
                    <TableCell className="TableCell" align="left">
                      Arrival Day :{" "}
                      <span style={{ color: "black" }}>
                        {departureDay(flight1.DateA)}
                      </span>
                    </TableCell>
                    <TableCell
                      className="TableCell"
                      align="right"
                    ></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="TableCell">
                      <h5>First Class Seats Number</h5>
                    </TableCell>
                    <TableCell className="TableCell">
                      <div>
                        <FormControl className="ddList">
                          <InputLabel id="demo-multiple-name-label">
                            Select Seats
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={flight1.FirstSeatsNumbers}
                            onChange={(event) => {
                              setFlight1({
                                ...flight1,
                                FirstSeatsNumbers: handleChange(
                                  event,
                                  flight1.FirstSeatsNumbers,
                                  flight1.FirstNumberOfSeats
                                ),
                              });
                            }}
                            input={<OutlinedInput label="Select Seats" />}
                            MenuProps={MenuProps}
                          >
                            {DseatsF.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(
                                  name,
                                  flight1.FirstSeatsNumbers,
                                  theme
                                )}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="TableCell">
                      <h5>Business Seats Number</h5>
                    </TableCell>
                    <TableCell className="TableCell">
                      <div>
                        <FormControl className="ddList">
                          <InputLabel id="demo-multiple-name-label">
                            Select Seats
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={flight1.BusinessSeatsNumbers}
                            onChange={(event) => {
                              setFlight1({
                                ...flight1,
                                BusinessSeatsNumbers: handleChange(
                                  event,
                                  flight1.BusinessSeatsNumbers,
                                  flight1.BusinessNumberOfSeats
                                ),
                              });
                            }}
                            input={<OutlinedInput label="Select Seats" />}
                            MenuProps={MenuProps}
                          >
                            {DseatsB.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(
                                  name,
                                  flight1.FirstSeatsNumbers,
                                  theme
                                )}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="TableCell">
                      <h5>Economy Seats Number</h5>
                    </TableCell>
                    <TableCell className="TableCell">
                      <div>
                        <FormControl className="ddList">
                          <InputLabel id="demo-multiple-name-label">
                            Select Seats
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={flight1.EconomySeatsNumbers}
                            onChange={(event) => {
                              setFlight1({
                                ...flight1,
                                EconomySeatsNumbers: handleChange(
                                  event,
                                  flight1.EconomySeatsNumbers,
                                  flight1.EconomyNumberOfSeats
                                ),
                              });
                            }}
                            input={<OutlinedInput label="Select Seats" />}
                            MenuProps={MenuProps}
                          >
                            {DseatsE.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(
                                  name,
                                  flight1.FirstSeatsNumbers,
                                  theme
                                )}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>

      <div className="TicketSubContainer1">
        <Card className="Ticketcard" sx={{ m: 3 }}>
          <h3 className="TicketHead">Mafya Air Ticket</h3>
          <CardContent>
            <TableContainer component={Paper} className="tableContainer1">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="TableCell" align="left">
                      FlightNo :{" "}
                      <span style={{ color: "black" }}>
                        {flight2.Flight_No}
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="TableCell" align="left">
                      Total Price :{" "}
                      <span style={{ color: "black" }}>
                        {flight2.TotalPrice} $
                      </span>
                    </TableCell>
                    <TableCell className="TableCell" align="left">
                      Total Baggage Alowance :{" "}
                      <span style={{ color: "black" }}>
                        {flight2.TotalBaggageAlowance}
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="TableCell">
                      From :{" "}
                      <span style={{ color: "black" }}>{flight2.From}</span>
                    </TableCell>
                    <TableCell className="TableCell">
                      To :{" "}
                      <span style={{ color: "black" }}>{flight2.To}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="TableCell">
                      Departure Time :{" "}
                      <span style={{ color: "black" }}>
                        {departureHour(flight2.DateD)}
                      </span>
                    </TableCell>
                    <TableCell className="TableCell" align="left">
                      Arrival Time :{" "}
                      <span style={{ color: "black" }}>
                        {departureHour(flight2.DateA)}
                      </span>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="TableCell">
                      Departure Day :{" "}
                      <span style={{ color: "black" }}>
                        {departureDay(flight2.DateD)}
                      </span>
                    </TableCell>
                    <TableCell className="TableCell" align="left">
                      Arrival Day :{" "}
                      <span style={{ color: "black" }}>
                        {departureDay(flight2.DateA)}
                      </span>
                    </TableCell>
                    <TableCell
                      className="TableCell"
                      align="right"
                    ></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="TableCell">
                      <h5>First Class Seats Number</h5>
                    </TableCell>
                    <TableCell className="TableCell">
                      <div>
                        <FormControl className="ddList">
                          <InputLabel id="demo-multiple-name-label">
                            Select Seats
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={flight2.FirstSeatsNumbers}
                            onChange={(event) => {
                              setFlight2({
                                ...flight2,
                                FirstSeatsNumbers: handleChange(
                                  event,
                                  flight2.FirstSeatsNumbers,
                                  flight2.FirstNumberOfSeats
                                ),
                              });
                            }}
                            input={<OutlinedInput label="Select Seats" />}
                            MenuProps={MenuProps}
                          >
                            {AseatsF.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(
                                  name,
                                  flight2.FirstSeatsNumbers,
                                  theme
                                )}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="TableCell">
                      <h5>Business Seats Number</h5>
                    </TableCell>
                    <TableCell className="TableCell">
                      <div>
                        <FormControl className="ddList">
                          <InputLabel id="demo-multiple-name-label">
                            Select Seats
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={flight2.BusinessSeatsNumbers}
                            onChange={(event) => {
                              setFlight2({
                                ...flight2,
                                BusinessSeatsNumbers: handleChange(
                                  event,
                                  flight2.BusinessSeatsNumbers,
                                  flight2.BusinessNumberOfSeats
                                ),
                              });
                            }}
                            input={<OutlinedInput label="Select Seats" />}
                            MenuProps={MenuProps}
                          >
                            {AseatsB.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(
                                  name,
                                  flight2.FirstSeatsNumbers,
                                  theme
                                )}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="TableCell">
                      <h5>Economy Seats Number</h5>
                    </TableCell>
                    <TableCell className="TableCell">
                      <div>
                        <FormControl className="ddList">
                          <InputLabel id="demo-multiple-name-label">
                            Select Seats
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={flight2.EconomySeatsNumbers}
                            onChange={(event) => {
                              setFlight2({
                                ...flight2,
                                EconomySeatsNumbers: handleChange(
                                  event,
                                  flight2.EconomySeatsNumbers,
                                  flight2.EconomyNumberOfSeats
                                ),
                              });
                            }}
                            input={<OutlinedInput label="Select Seats" />}
                            MenuProps={MenuProps}
                          >
                            {AseatsE.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(
                                  name,
                                  flight2.FirstSeatsNumbers,
                                  theme
                                )}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>

    
      <h4 style={{color:"red",textAlign:'center',marginTop: "-40px"}}>{errorMessage}</h4>
      <Button
        className="loginbutton"
        style={{ marginBottom: "30px" }}
        onClick={bookSeats}
      >
        Book
      </Button>
     
      
    </>):(<></>)}

      <>
        {processing ? (
             <div  style={{width:"1519px",height:"690px",position:'absolute',top:"50px",paddingTop:"16%",}} >
             <Lottie options={defaultOptions1} height={200} width={200} />
           
              </div>
          ) : (
    <></>
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

function departureHour(dateVal) {
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

  return sHour + ":" + sMinute + " " + sAMPM;
}
function departureDay(dateVal) {
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

  return sMonth + "/" + sDay + "/" + sYear;
}

function padValue(value) {
  return value < 10 ? "0" + value : value;
}