import bgImg from "./assets/bgimgs.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { useState } from "react";
import "./Auth.css";
import { supabase } from "./supabase-client";

function Auth() {
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogIn) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Error while signin: ", error.message);
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error("Error while signup: ", error.message);
      }
    }
  };

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="auth-card">
        <h1 className="auth-title">{isLogIn ? "Login" : "Sign Up"}</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          {isLogIn ? null : (
            <div>
              <label className="auth-label">Name:</label>
              <input
                type="text"
                placeholder="Enter you fullname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
                onFocus={(e) =>
                  (e.target.style.border = "2px solid rgba(20, 67, 208, 1)")
                }
              />
            </div>
          )}
          <label style={{ margin: "2px" }}>Email:</label>
          <input
            type="text"
            placeholder="email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
          <label className="auth-label">Password:</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          <button
            type="submit"
            className="auth-btn"
            style={{ backgroundImage: `url(${bgImg})` }}
          >
            <span className="auth-btn-text">
              {isLogIn ? "Login" : "Sign Up"}
            </span>
          </button>
        </form>
        <p>
          <b>{isLogIn ? "Login" : "Sign Up"}</b> with others
        </p>
        <div className="auth-socials">
          <button className="social-btn">
            <FaFacebookSquare size={20} color="blue" />
            Facebook
          </button>
          <button className="social-btn">
            <FcGoogle size={20} />
            Google
          </button>
        </div>
        <p className="auth-toggle">
          {isLogIn ? " Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="toggle-link"
            onClick={() => {
              setIsLogIn(!isLogIn);
              setEmail("");
              setPassword("");
            }}
          >
            {isLogIn ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
