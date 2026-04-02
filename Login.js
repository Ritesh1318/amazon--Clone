import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign-in function
  const signIN = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in:", userCredential.user);
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Sign-in failed:", error.message);
      alert(error.message);
    }
  };

  // Register function
  const register = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", userCredential.user);
      navigate("/"); // Redirect to home page after successful registration
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={signIN} className="login__signInButton">
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON-CLONE Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice, and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={register} className="login__registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
