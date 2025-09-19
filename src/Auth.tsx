import React from "react";
import bgImg from "./assets/bgimgs.jpg";
function Auth() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          margin: "0 auto",
          padding: "1rem",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            borderRadius: "20px",
            padding: "0 20px",
          }}
        >
          <h1>Login</h1>
        </div>
      </div>
    </>
  );
}

export default Auth;
