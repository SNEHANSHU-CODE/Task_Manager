import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "./MyContext";

function Login() {
  const navigate = useNavigate();

  const { id, setId } = useContext(MyContext);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const setEmail = (email) => {
    setLoginDetails({ ...loginDetails, email: email });
  };
  const setPassword = (password) => {
    setLoginDetails({ ...loginDetails, password: password });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await await axios
      .post("http://localhost:8080/auth/login", loginDetails)
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
    if (response.status === 200) {
      setId(response.data._id);
    }
  };

  useEffect(() => {
    if (id !== "") {
      navigate("/task");
    }
  }, [id, navigate]);

  return (
    <>
      <form className="m-auto" style={{ maxWidth: 444 }}>
        <div className="form-group m-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            autoComplete="off"
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
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="mt-4">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="link">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default Login;
