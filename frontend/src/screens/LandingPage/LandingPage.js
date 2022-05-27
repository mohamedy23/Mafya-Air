import React, { useEffect ,useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as location from "../../1055-world-locations.json";
import * as success from "../../1127-success.json";
import Lottie from "react-lottie";

import "./LandingStyles.css";

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


function LandingPage({ history }) {
 //const userLogin = useSelector((state) => state.userLogin);
  //const { userInfo } = "";

  // useEffect(()=>{
  //   const userInfo = localStorage.getItem("userInfo");

  //   if(userInfo){
  //     history.push("/mynotes")
  //   }

  // },[history,userInfo])
  const [loading, setloading] = useState(false);
  const [completed, setcompleted] = useState(false);

  return (
    <>

    <div className="main">


              <>
                <Container>
        <Row>
          <div className="intro-text">
            <div>
              <p className="title" >  WELCOME TO MAFYA AIR</p> 
              <p className="subtitle">One Safe place for all your trips.</p>
            </div>
            <div className="buttonContainer">
              <Link to="/Inquiry">
                <Button size="lg" className="landingbutton">
                  Inquiry
                </Button>
              </Link>
              <Link to="/search">
                <Button
                  size="lg"
                  className="landingbutton"
                >
                  Reservations
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
          
          
       

        </>
      

    </div>
    {/* <div style={{width:"1519px",height:"740px",backgroundColor:"#3c5977",opacity:"0.8",position:'absolute',top:"0",paddingTop:"20%",}}>

    {!completed ? (
        <>
        <div >
          {!loading ? (
            <Lottie options={defaultOptions1} height={200} width={200} />
          ) : (
            <Lottie options={defaultOptions2} height={100} width={100} />
          )}
          </div>
        </>
      ) : (
<></>
      )}


    </div> */}
    </>
  );
}

export default LandingPage;
