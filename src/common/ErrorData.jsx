import React from "react";
import { MdErrorOutline } from "react-icons/md";

const ErrorData = ({ message = "Something went wrong!" }) => {
  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#d9534f",
        textAlign: "center",
      }}
    >
      <MdErrorOutline size={60} color="#d9534f" />
      <h3 style={{ marginTop: "10px" }}>{message}</h3>
    </div>
  );
};

export default ErrorData;
