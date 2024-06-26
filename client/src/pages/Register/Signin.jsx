import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { handleToken } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("logged in user details:", data);
      if (data.token) {
        handleToken(data.token);
        localStorage.setItem("sender_id", data.user._id);
        const sender_id = localStorage.getItem("sender_id");
        console.log("sender_id", sender_id);
        console.log("sender type", typeof sender_id);
        navigate("/chat");
      } else {
        setError("Login Failed due to invalid email or password");
        navigate("/signin");
      }
    } catch (err) {
      setError("Invalid email or password");
      console.error("Error:", err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="btn-container">
          <button type="submit">Login</button>
          <button>
            <Link to="/signup"> Register</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
