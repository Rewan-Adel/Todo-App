"use client"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Features/Auth/Context/AuthContext";
import "../styles/Login.css"


export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await login(email, password);
    } catch (error) {
      setErrorMsg(error.message || "Login failed. Please try again.");
    }
  };
  

  return (
    <div className="login-container">

      <div className="login-card">
        <div className="card-header">
          <h1>Welcome Back To TODO</h1>
          <p>Please enter your details to sign in</p>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <div className="password-header">
                <label htmlFor="password">Password</label>               
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Sign in
            </button>
          </form>
          {errorMsg && <p className="error-message">{errorMsg}</p>}
        </div>
        <div className="card-footer">
        <a href="/forgot-password" className="forgot-link">
                  Forgot password?
                </a>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="login-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
