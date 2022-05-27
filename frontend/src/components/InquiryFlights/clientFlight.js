import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Component, useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DateAdapter from "@mui/lab/AdapterDateFns";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DateFnsUtils from "@date-io/date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MainScreen from "../../components/MainScreen";
import "./clientFlight.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { color, height } from "@mui/system";
import * as location from "../../1055-world-locations.json";
import * as success from "../../1127-success.json";
import * as UnSearch from "../../86046-no-search-item-available.json";
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
const defaultOptions4 = {
  loop: true,
  autoplay: true,
  animationData: UnSearch.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function BasicTable({ history }) {
  const [firstId, setFirstId] = useState("");
  const [secondId, setSecondId] = useState("");
  const [flights, setFlight] = useState([]);


  useEffect(() => {
    setProcessing(true);
    
    if (JSON.parse(sessionStorage.getItem("inquiryFlights"))) {
      const flightSearch1 = {
        From: JSON.parse(sessionStorage.getItem("inquiryFlights")).From,
        To: JSON.parse(sessionStorage.getItem("inquiryFlights")).To,
        DateD: JSON.parse(sessionStorage.getItem("inquiryFlights")).DateD,
        DateA: JSON.parse(sessionStorage.getItem("inquiryFlights")).DateA,
        FirstSeats: JSON.parse(sessionStorage.getItem("inquiryFlights"))
          .FirstNumberOfSeats1,
        BusinessSeats: JSON.parse(sessionStorage.getItem("inquiryFlights"))
          .BusinessNumberOfSeats1,
        EconomySeats: JSON.parse(sessionStorage.getItem("inquiryFlights"))
          .EconomyNumberOfSeats1,
      };
      axios
        .post("http://localhost:8000/flights/getBookingFlights", flightSearch1)
        .then((res) => {
          setFlight(res.data);
          if(res.data.length==0){
            setSearchMessage("unavailable Flights for this search criteria")
            setOption(defaultOptions4);
            setTimeout(() => {
              setProcessing(false);
              history.goBack();
            }, 3000);
          }
          else{
            setTimeout(() => {
              setProcessing(false);
            }, 1500);
          }

        
        });
    } else {
      const flightSearch2 = {
        From: "",
        To: "",
        DateD: "",
        DateA: "",
        FirstSeats: "",
        BusinessSeats: "",
        EconomySeats: "",
      };
      axios
        .post("http://localhost:8000/flights/getBookingFlights", flightSearch2)
        .then((res) => {
          setFlight(res.data);
        });
    }
  }, []);

  const [processing, setProcessing] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [option,setOption]= useState(defaultOptions1);
  const [SearchMessage,setSearchMessage]=useState();

  return (
    <>
    <div>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap"
        rel="stylesheet"
      />
    
    <div className="flightsContainer">

    {!processing ?(   <>

<div className="flightSubContainer">
  <TableContainer
    style={{ width: "1300px", borderRadius: "0" }}
    component={Paper}
  >
    <Table
      style={{ width: "1300px", borderRadius: "0" }}
      aria-label="simple table"
    >
      <TableHead
        style={{
          backgroundColor: "#3c5977",
          color: "white",
          borderRadius: "0",
        }}
      >
        <TableRow style={{ borderRadius: "0" }}>
          <TableCell className="FlightCell" align="center">
            From
          </TableCell>
          <TableCell className="FlightCell" align="center">
            To
          </TableCell>
          <TableCell className="FlightCell" align="center">
            Departure Date
          </TableCell>
          <TableCell className="FlightCell" align="center">
            Arrival Date
          </TableCell>
          <TableCell className="FlightCell" align="center">
            First ${" "}
          </TableCell>
          <TableCell className="FlightCell" align="center">
            First Available seats{" "}
          </TableCell>
          <TableCell className="FlightCell" align="center">
            Baggage Allowance First{" "}
          </TableCell>
          <TableCell className="FlightCell" align="center">
            Economy $
          </TableCell>
          <TableCell className="FlightCell" align="center">
            Economy Available seats{" "}
          </TableCell>
          <TableCell className="FlightCell" align="center">
            Baggage Allowance Business{" "}
          </TableCell>
          <TableCell className="FlightCell" align="center">
            Business $
          </TableCell>
          <TableCell className="FlightCell" align="center">
            Business Available seats{" "}
          </TableCell>
          <TableCell className="FlightCell" align="center">
            Baggage Allowance Economy{" "}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {flights.map((flight, key) => (
          <TableRow key={flight._id}>
            <TableCell align="center" className="FlightSubCell">
              {flight.From}
            </TableCell>
            <TableCell align="center" className="FlightSubCell">
              {flight.To}
            </TableCell>

            <TableCell align="center" className="FlightSubCell">
              {formatDate(flight.DateD)}
            </TableCell>
            <TableCell align="center" className="FlightSubCell">
              {formatDate(flight.DateA)}
            </TableCell>

            <TableCell align="center" className="FlightSubCell">
              {flight.FirstPrice}$
            </TableCell>
            <TableCell align="center" className="FlightSubCell">
              {flight.FirstSeats}
            </TableCell>
            <TableCell align="center" className="FlightSubCell">
              {flight.BaggageAllowanceFirst}
            </TableCell>

            <TableCell align="center" className="FlightSubCell">
              {flight.BusinessPrice}$
            </TableCell>
            <TableCell align="center" className="FlightSubCell">
              {flight.BusinessSeats}
            </TableCell>
            <TableCell align="center" className="FlightSubCell">
              {flight.BaggageAllowanceBusiness}
            </TableCell>

            <TableCell align="center" className="FlightSubCell">
              {flight.EconomyPrice}$
            </TableCell>
            <TableCell align="center" className="FlightSubCell">
              {flight.EconomySeats}
            </TableCell>
            <TableCell align="center" className="FlightSubCell">
              {flight.BaggageAllowanceEconomy}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</div>

</>):(<></>)}
 
<>
        {processing ? (
          <div  style={{width:"1519px",height:"690px",position:'absolute',top:"50px",paddingTop:"16%",}} >
                <Lottie options={option} height={200} width={200} />
                <h2 style={{color:"#034694",left :"670px" ,textAlign:'center'}}>{SearchMessage}</h2>
              </div>
          ) : (<></>
          )}
</>
<>
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

  return (
    sMonth +
    "/" +
    sDay +
    "/" +
    sYear +
    " " +
    sHour +
    ":" +
    sMinute +
    " " +
    sAMPM
  );
}

function padValue(value) {
  return value < 10 ? "0" + value : value;
}
