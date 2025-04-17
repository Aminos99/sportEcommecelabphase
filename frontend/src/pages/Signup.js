import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
function Signup() {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_LINK_URL}/api/user/adduser`, {
        Name,
        email,
        password
      });
      console.log('User added:', response.data);
      alert('Signup successful!');
      navigate('/login'); 
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Something went wrong');
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
              Create an account
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#666",
                marginBottom: "24px",
              }}
            >
              Sign up to get started with our platform
            </p>
          </div>

          <form onSubmit={addUser}>
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
                Full name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  outline: "none",
                }} value={Name} onChange={(e) => { setName(e.target.value) }}
              />
            </div>

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
                marginBottom: "24px",
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
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  outline: "none",
                }} value={password} onChange={(e) => { setPassword(e.target.value) }}
              />
              <p
                style={{
                  fontSize: "12px",
                  color: "#666",
                  marginTop: "6px",
                }}
              >
                Must be at least 8 characters
              </p>
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
              }}
            >
              Sign up
            </button>

            <div
              style={{
                marginTop: "24px",
                textAlign: "center",
                fontSize: "14px",
                color: "#666",
              }}
            >
              Already have an account?{" "}
              <Link to='/login'>login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
