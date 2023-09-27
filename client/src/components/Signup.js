import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const setName = (name) => {
    setSignupDetails({ ...signupDetails, name: name });
  };
  const setEmail = (email) => {
    setSignupDetails({ ...signupDetails, email: email });
  };
  const setPassword = (password) => {
    setSignupDetails({ ...signupDetails, password: password });
  };

  /*change "https://task-manager-server-eolm.onrender.com/auth/signup" to
   "http://localhost:8080/auth/signup" to run in localhost*/
  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await axios
      .post("https://task-manager-server-eolm.onrender.com/auth/signup", signupDetails)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(response.message);
        navigate("/Signup");
      });
  };

  return (
    <>
      <form className="m-auto" style={{ maxWidth: 444 }}>
        <div className="form-group m-3">
          <label htmlFor="exampleInputName">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            autoComplete="off"
            aria-describedby="nameHelp"
            placeholder="Enter name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div className="form-group m-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            autoComplete="off"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="form-group m-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            autoComplete="off"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <button
          type="submit"
          className="btn btn-primary m-3"
          onClick={handleSignup}
        >
          Signup
        </button>
        <div className="mt-4">
          <p>
            Already have an account?{" "}
            <Link to="/" className="link">
              Login
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default Signup;
