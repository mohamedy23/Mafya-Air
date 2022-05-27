import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
//import "./RegisterScreen.css";
import axios from 'axios'
import TextField from '@mui/material/TextField';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // 
import pic from "../../profile.png";

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

function RegisterScreen({ history }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [passport, setPassport] = useState("");




  const [password, setPassword] = useState({
      "password":"",
      "newPassword":""
  });

  const userInfo  = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;


  useEffect(() => {
    if(!userInfo){
        history.push('/homePage');
    }
  },[]);

  

  const submitHandler = async(e) => {
    e.preventDefault();
    changePassword();

  }
  const changePassword =async()=>{
    setloading(true);
    setConfirm(false);
    setOption(defaultOptions1);
     
    const config = {
        headers:{
              "Content-type":"application/json",
                Authorization: `Bearer ${userInfo.token}`

              }
            }

           const  ans =  await axios.post('http://localhost:8000/flights/getPassword',password,config);
         
           
           if(ans.data==="ok"){
            setOption(defaultOptions2);
            setMessage("Your Password has been updated  successfully");
            setmessageColor(colorG);
            setTimeout(() => {
              setloading(false);
              setOption(defaultOptions1);
              setMessage(null);
              history.push("/profile");
            }, 3000);
    

           }
           else{

            setOption(defaultOptions3);
            setMessage("Error , Wrong Password");
            setmessageColor(colorR);
            setTimeout(() => {
              setloading(false);
              setOption(defaultOptions1);
              setMessage(null);
              
            }, 3000);


           }
    

  }

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
    {!processing ? (    
    <>
      <div className="loginContainer" style={{ marginTop: "-20px" }}>
      <img
          src={pic}
          style={{ height: "200px", marginBottom: "-30px", marginTop: "-30px" }}
        ></img>
       
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
           <TextField 
           id="filled-basic"
           InputLabelProps={{ className: "textfield__label" }}
           InputProps={{ className: "textfield__input" }}
           label="Filled"
           variant="filled"
           label="Old Password" 
           sx={{ m: 1, width: "60ch" }}
           type="password" 
           required 
          
           value={password.password} 
      onChange={(event) =>{setPassword({...password, password:event.target.value})}}
     />
          </Form.Group>

          
          <Form.Group controlId="formBasicPassword">
            <TextField 
            id="filled-basic"
            InputLabelProps={{ className: "textfield__label" }}
            InputProps={{ className: "textfield__input" }}
            label="Filled"
            variant="filled"
            label="Age"
            sx={{ m: 1, width: "60ch" }}
            label="New Password"
            type="password"
            required
            value={password.newPassword}
            placeholder="Password"
              onChange={(event) =>{setPassword({...password, newPassword:event.target.value})}}            >
            </TextField>
          </Form.Group>

          

          <Button className="loginbutton" variant="primary" style={{margin:'10px', width: '25ch' }} type="submit">
            update 
          </Button>
        

        </Form>
        
        
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

export default RegisterScreen;
