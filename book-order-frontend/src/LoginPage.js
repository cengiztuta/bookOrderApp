import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const users = await response.json();
      if (!email || !password) {
        setError("Please enter  email and password");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        return;
      }
      if (response.ok) {
        const foundUser = users.find((user) => user.email === email);

        if (foundUser) {
          if (foundUser.password === password) {
            navigate("/BookOrder", { state: { userEmail: email } });
          } else {
            setError("Invalid password");
          }
        } else {
          await addUser(email, password);
          navigate("/BookOrder", { state: { userEmail: email } });
        }
      } else {
        setError("An error occurred during login");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
    }
  };

  const addUser = async (newEmail, newPassword) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newEmail, password: newPassword }),
      });

      if (!response.ok) {
        console.error("Error adding new user:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Email</h2>
      <input
        placeholder="Please enter an email"
        type="email"
        className="login-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <h2>Password</h2>
      <input
        placeholder="Please enter password"
        type="password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="login-error">{error}</p>}
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
