import bgImg from "./assets/bgimgs.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { useState } from "react";

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
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "20px",
            padding: "15px",
            justifyItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(10px)", // for Safari
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
        >
          <h1 style={{ color: "rgba(20, 67, 208, 1)" }}>Login</h1>
          <div style={{ width: "100%" }}>
            <label style={{ margin: "2px" }}>Email:</label>
            <input
              type="text"
              placeholder="email or username"
              style={{
                width: "100%",
                padding: "5px 10px",
                borderRadius: "20px",
                marginBottom: "20px",
                boxSizing: "border-box",
                transition: "0.3s",
                outline: "none",

                border: "2px solid rgba(20, 67, 208, 0.5)",
              }}
              onFocus={(e) =>
                (e.target.style.border = "2px solid rgba(20, 67, 208, 1)")
              }
            />
            <label style={{ margin: "2px" }}>Password:</label>
            <input
              type="password"
              placeholder="password"
              style={{
                width: "100%",
                padding: "5px 10px",
                borderRadius: "20px",
                marginBottom: "20px",
                boxSizing: "border-box",
                border: "2px solid rgba(20, 67, 208, 0.5)",
              }}
              onFocus={(e) =>
                (e.target.style.border = "2px solid rgba(20, 67, 208, 1)")
              }
            />
            <button
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "20px",
                color: "white",
                backgroundImage: `url(${bgImg})`,
                backgroundSize: "cover",
                // backgroundPosition:'center',
                transform: "scaleX(-1)",
                // border: "2px solid rgba(20, 67, 208, 0.5)",
                border: "none",
                fontWeight: "bold",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scaleX(-1)  scale(1.05)")
              }
              onMouseOut={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = " scaleX(-1) scale(1)";
              }}
            >
              <span
                style={{ transform: "scaleX(-1)", display: "inline-block" }}
              >
                Login
              </span>
            </button>
          </div>
          <p>
            <b>Login</b> with others
          </p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              width: "100%",
              boxSizing: "border-box",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{
                padding: "7px 10px",
                width: "50%",
                borderRadius: "20px",
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                gap: "4px",
                border: "1px solid",
              }}
            >
              <FaFacebookSquare size={20} color="blue" />
              Facebook
            </button>
            <button
              style={{
                padding: "7px 10px",
                width: "50%",
                borderRadius: "20px",
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                gap: "4px",
                border: "1px solid",
              }}
            >
              <FcGoogle size={20} />
              Google
            </button>
          </div>
          <p style={{ marginTop: "15px" }}>
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Auth;
