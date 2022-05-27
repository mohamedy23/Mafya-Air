import { color } from "@mui/system";
import React from "react";
import { Spinner } from "react-bootstrap";

function Loading({ size = 25 }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
         top:"20px",
         left:"0px",
         color:"white",
         marginBottom:"35px"

      }}
    >
      <Spinner
        style={{
          width: size,
          height: size,
        }}
        animation="border"
      />
    </div>
  );
}

export default Loading;
