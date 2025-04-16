import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.LINK_URL}/api/user/login`, {
        email,
        password,
      });

  
      localStorage.setItem("authToken", response.data.token);

   
      window.location.href = "/home"; 

    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "40px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div
            style={{
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#111",
                marginBottom: "8px",
              }}
            >
              Welcome back
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#666",
                marginBottom: "24px",
              }}
            >
              Log in to your account
            </p>
          </div>

          <form>
            <div
              style={{
                marginBottom: "16px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#333",
                  marginBottom: "6px",
                }}
              >
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  outline: "none",
                }} value={email} onChange={(e) => { setEmail(e.target.value) }}
              />
            </div>

            <div
              style={{
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Password
                </label>
                <a
                  href="#"
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    textDecoration: "none",
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  outline: "none",
                }} value={password} onChange={(e) => { setPassword(e.target.value) }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <input
                type="checkbox"
                id="remember"
                style={{
                  marginRight: "8px",
                }}
              />
              <label
                htmlFor="remember"
                style={{
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#000",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }} onClick={handleLogin}
            >
              Log in
            </button>

            <div
              style={{
                marginTop: "24px",
                textAlign: "center",
                fontSize: "14px",
                color: "#666",
              }}
            >
              Don't have an account?{" "}
              <a
                href="#"
                style={{
                  color: "#000",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin
