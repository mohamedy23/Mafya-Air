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
import { Button } from "react-bootstrap";
import DateFnsUtils from "@date-io/date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "./showFlight.css";

import * as location from "../../1055-world-locations.json";
import * as success from "../../1127-success.json";
import * as fail from "../../56947-icon-failed.json";
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

const defaultOptions3 = {
  loop: true,
  autoplay: true,
  animationData: fail.default,
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
}

const colorG = "#3ABC5E";
const colorR = "#B2243C";

export default function BasicTable({ history }) {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

 const [idDel,setIdDel] = useState(); 

  const deleteconf = (id) => {
    setIdDel(id);
    setProcessing(false);
    setloading(false);
    setConfirm(true);
  };

  const [flights, setFlight] = useState([]);

  const deleteFlight = () => {
    const id = idDel;
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
      .delete(`http://localhost:8000/flights/deleteFlights/${id}`, config)
      .then(() => {
        setOption(defaultOptions2);
        setMessage("The Flights has been deleted successfully");
        setmessageColor(colorG);
        setTimeout(() => {
          setloading(false);
          setOption(defaultOptions1);
          setMessage(null);
          window.location.reload(false);
        }, 3000);
       
      }).
      catch(err=>{
        setOption(defaultOptions3);
        setMessage("Error , please try again later");
        setmessageColor(colorR);
        setTimeout(() => {
          setloading(false);
          setOption(defaultOptions1);
          setMessage(null);
          
        }, 3000);

      })
  };

  useEffect(() => {

    setProcessing(true);
    if (
      !userInfo ||
      !userInfo.isAdmin ||
      !sessionStorage.getItem("adminSearch")
    ) {
 
      history.push("/homepage");
    } else {
      setFlightSearch(JSON.parse(sessionStorage.getItem("adminSearch")));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      axios
        .post("http://localhost:8000/flights/getFlights", JSON.parse(sessionStorage.getItem("adminSearch")), config)
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
    }
  }, []);

  const [flightSearch, setFlightSearch] = useState({
    Flight_No: "",
    From: "",
    To: "",
    DateD: "",
    DateA: "",
    FirstSeats: "",
    BusinessSeats: "",
    EconomySeats: "",
    ReservedFirstSeats: "",
    ReservedBusinessSeats: "",
    ReservedEconomySeats: "",
    FirstPrice: "",
    BusinessPrice: "",
    EconomyPrice: "",
  });

  const [processing, setProcessing] = useState(false);

  const [loading, setloading] = useState(false);

  const [confirm,setConfirm] = useState(false);

  const [option,setOption]= useState(defaultOptions1);
  const [message,setMessage]= useState("");
  const [messageColor,setmessageColor]=useState("#3ABC5E");

  

  const [SearchMessage,setSearchMessage]=useState();

  const heightTemp=()=>{
    const x = (flights.length*100)+150;
    if(x>690)
    return x+"px";
    else
    return "690px"
  }
  


  

  return (
    <>
        <div>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap"
        rel="stylesheet"
      />
      <div className="flightsContainer" style={{ display: "flex" }}>
    {!processing ?(    
    
      <div style={{ position: "absolute", top: "150px" }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ borderRadius: "0" }}>
              <TableRow
                style={{
                  backgroundColor: "#3c5977",
                  color: "white",
                  width: "1500px",
                }}
              >
                <TableCell className="FlightCell" align="center">
                  Flight_No
                </TableCell>

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
                  First_Seats
                </TableCell>
                <TableCell className="FlightCell" align="center">
                  Reseved First Seats
                </TableCell>
                <TableCell className="FlightCell" align="center">
                  First Price
                </TableCell>

                <TableCell className="FlightCell" align="center">
                  Business Seats
                </TableCell>
                <TableCell className="FlightCell" align="center">
                  Reseved Business Seats
                </TableCell>
                <TableCell className="FlightCell" align="center">
                  Business Price
                </TableCell>

                <TableCell className="FlightCell" align="center">
                  Economy Seats
                </TableCell>
                <TableCell className="FlightCell" align="center">
                  Reseved Economy Seats
                </TableCell>
                <TableCell className="FlightCell" align="center">
                  Economy Price
                </TableCell>

                <TableCell className="FlightCell" align="center">
                  Delete / Edit
                </TableCell>
                {/* <TableCell className="FlightCell" align="center">
                  Edit
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {flights.map((flight, key) => (
                <TableRow key={flight._id}>
                  <TableCell className="FlightSubCell" align="center">
                    {flight.Flight_No}
                  </TableCell>

                  <TableCell className="FlightSubCell" align="center">
                    {flight.From}
                  </TableCell>
                  <TableCell className="FlightSubCell" align="center">
                    {flight.To}
                  </TableCell>

                  <TableCell className="FlightSubCell" align="center">
                    {formatDate(flight.DateD)}
                  </TableCell>
                  <TableCell className="FlightSubCell" align="center">
                    {formatDate(flight.DateA)}
                  </TableCell>

                  <TableCell className="FlightSubCell" align="center">
                    {flight.FirstSeats}
                  </TableCell>
                  <TableCell className="FlightSubCell" align="center">
                    {flight.ReservedFirstSeats}
                  </TableCell>
                  <TableCell className="FlightSubCell" align="center">
                    {flight.FirstPrice}
                  </TableCell>

                  <TableCell className="FlightSubCell" align="center">
                    {flight.BusinessSeats}
                  </TableCell>
                  <TableCell className="FlightSubCell" align="center">
                    {flight.ReservedBusinessSeats}
                  </TableCell>
                  <TableCell className="FlightSubCell" align="center">
                    {flight.BusinessPrice}
                  </TableCell>

                  <TableCell className="FlightSubCell" align="center">
                    {flight.EconomySeats}
                  </TableCell>
                  <TableCell className="FlightSubCell" align="center">
                    {flight.ReservedEconomySeats}
                  </TableCell>
                  <TableCell className="FlightSubCell" align="center">
                    {flight.EconomyPrice}
                  </TableCell>

                  <TableCell className="FlightSubCell" align="center">
                    <Button
                      className="editButton"
                      aria-label="delete"
                      size="small"
                      onClick={() => deleteconf(flight._id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                    <Link to={`/updateFlight/${flight._id}`}>
                      <Button
                        className="editButton"
                        aria-label="edit"
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </Button>
                    </Link>
                  </TableCell>
                  {/* <TableCell className="FlightSubCell" align="center">
                    <Link to={`/updateFlight/${flight._id}`}>
                      <Button
                        className="editButton"
                        aria-label="edit"
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </Button>
                    </Link>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    ):(<></>)}


    <>
    {processing ? (
      <>

        <div  style={{width:"1519px",height:"690px",position:'absolute',top:"50px",paddingTop:"16%",}} >
            <Lottie options={option} height={200} width={200} />
            <h2 style={{color:"white",left :"670px" ,textAlign:'center'}}>{SearchMessage}</h2>
            
        </div>
          </>
      ) : (<></>
      )}
    </>

    <>
    {loading ? (
      <>
        <div style={{width:"1519px",height:heightTemp(),backgroundColor:"#282c34",opacity:"0.8",position:'absolute',top:"50px",paddingTop:"20%",}}>
        </div>
        <div  style={{width:"1519px",height:"690px",position:'absolute',top:"50px",paddingTop:"16%",}} >
            <Lottie options={option} height={200} width={200} />
            
            <h2 style={{color:messageColor,left :"670px" ,textAlign:'center'}}>{message}</h2>
            
        </div>
          </>
      ) : (<></>
      )}
    </>

    <>
    {confirm ? (
      <>
        <div style={{width:"1519px",height:heightTemp(),backgroundColor:"#282c34",opacity:"0.8",position:'absolute',top:"50px",paddingTop:"17%",}}>
        </div>
        <div  style={{width:"1519px",height:"690px",position:'absolute',top:"50px",paddingTop:"17%",}} >
            
            <h2 style={{color:"white",left :"670px" ,textAlign:'center'}}>Are you sure to cancel this Flight</h2>
            <Button className="loginbutton" style={{ marginTop: "30px",left :"580px",position:'absolute',width:"60px",height:"40px"}} onClick={deleteFlight}>Yes</Button>
            <Button className="loginbutton" style={{ marginTop: "30px",left :"660px",position:'absolute',width:"60px",height:"40px"}} onClick={()=>setConfirm(false)}>No</Button>
            
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
