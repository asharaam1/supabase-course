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
            border: "2px solid rgba(20, 67, 208, 1)",
            borderRadius: "20px",
            padding: "15px",
            justifyItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(10px)", // for Safari
          }}
        >
          <h1 style={{ color: "rgba(20, 67, 208, 1)" }}>Login</h1>
          <div>
            <p style={{ margin: "2px" }}>Email:</p>
            <input
              type="text"
              placeholder="email or username"
              style={{
                width: "100%",
                padding: "5px 10px",
                borderRadius: "20px",
                marginBottom: "20px",
                boxSizing: "border-box",
                border: "2px solid rgba(20, 67, 208, 1)",
              }}
            />
            <p style={{ margin: "2px" }}>Password:</p>
            <input
              type="password"
              placeholder="password"
              style={{
                width: "100%",
                padding: "5px 10px",
                borderRadius: "20px",
                marginBottom: "20px",
                boxSizing: "border-box",
                border: "2px solid rgba(20, 67, 208, 1)",
              }}
            />
            <button
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "20px",
                color: "white",
                backgroundImage: `url(${bgImg})`,
                backgroundSize: "cover",
                border: "2px solid rgba(20, 67, 208, 1)",
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
