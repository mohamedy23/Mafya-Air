import React from "react";
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
import { Component, useState, useEffect, useParams } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import MainScreen from "../../components/MainScreen";

import pic from "../../profile.png";
//import TextField from '@material-ui/core/TextField';
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
    setProcessing(true)
    if (userInfo) {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      axios
        .get("http://localhost:8000/flights/getProfile/", config)
        .then((res) => {
          setPassenger(res.data);
          setTimeout(() => {
            setProcessing(false);
          }, 1500);
        });
    } else {
      
      history.push("/homePage");
    }
  }, []);

  const [passenger, setPassenger] = useState({
    name: "",
    email: "",
    passport: "",
    age: "",
  });

  const update = () => {
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
      .post("http://localhost:8000/flights/updateProfile/", passenger, config)
      .then((res) => {
        if (res.data == "User updated successfully") {
          userInfo.name = passenger.name;
          userInfo.email = passenger.email;
          userInfo.age = passenger.age;
          userInfo.passport = passenger.passport;
          localStorage.removeItem("userInfo");
          localStorage.setItem("userInfo", JSON.stringify(userInfo));

          setOption(defaultOptions2);
          setMessage("Your Profile has been Updated  successfully");
          setmessageColor(colorG);
          setTimeout(() => {
            setloading(false);
            setOption(defaultOptions1);
            window.location.reload(false);
          }, 3000);
        }
        else{
          setOption(defaultOptions3);
          setMessage("Error , please try again later");
          setmessageColor(colorR);
          setTimeout(() => {
            setloading(false);
            setOption(defaultOptions1);
            
          }, 3000);
        }
      }).catch(err=>{
        setOption(defaultOptions3);
        setMessage("Error , please try again later");
        setmessageColor(colorR);
        setTimeout(() => {
          setloading(false);
          setOption(defaultOptions1);
          
        }, 3000);

      })
  };
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
      <div className="Background">
    {!processing ?(   
       <>
      <div className="loginContainer" style={{ marginTop: "-20px" }}>
        <img
          src={pic}
          style={{ height: "200px", marginBottom: "-30px", marginTop: "-30px" }}
        ></img>

        <TextField
          id="filled-basic"
          InputLabelProps={{ className: "textfield__label" }}
          InputProps={{ className: "textfield__input" }}
          label="Filled"
          variant="filled"
          label="Name"
          sx={{ m: 1, width: "60ch" }}
          value={passenger.name}
          onChange={(event) => {
            setPassenger({ ...passenger, name: event.target.value });
          }}
        />

        <TextField
          id="filled-basic"
          InputLabelProps={{ className: "textfield__label" }}
          InputProps={{ className: "textfield__input" }}
          label="Filled"
          variant="filled"
          label="Passport Number"
          sx={{ m: 1, width: "60ch" }}
          value={passenger.passport}
          onChange={(event) => {
            setPassenger({ ...passenger, passport: event.target.value });
          }}
        />

        <TextField
          id="filled-basic"
          InputLabelProps={{ className: "textfield__label" }}
          InputProps={{ className: "textfield__input" }}
          label="Filled"
          variant="filled"
          label="Email"
          sx={{ m: 1, width: "60ch" }}
          value={passenger.email}
          onChange={(event) => {
            setPassenger({ ...passenger, email: event.target.value });
          }}
        />
        <TextField
          id="filled-basic"
          InputLabelProps={{ className: "textfield__label" }}
          InputProps={{ className: "textfield__input" }}
          label="Filled"
          variant="filled"
          label="Age"
          type="number"
          sx={{ m: 1, width: "60ch" }}
          value={passenger.age}
          onChange={(event) => {
            setPassenger({ ...passenger, age: event.target.value });
          }}
        />
        <Button
          className="loginbutton"
          style={{ marginLeft: "10px", marginTop: "15px" }}
          onClick={update}
        >
          update
        </Button>
        <Link to='/changePassword'>
            <h4>change Password</h4>
        </Link>
       
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
<div style={{width:"1519px",height:"815px",backgroundColor:"#282c34",opacity:"0.8",position:'absolute',top:"50px",paddingTop:"20%",}}>
</div>
<div  style={{width:"1519px",height:"815px",position:'absolute',top:"50px",paddingTop:"16%",}} >
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
