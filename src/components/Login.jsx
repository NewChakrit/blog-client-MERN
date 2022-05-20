import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate, getUser } from "../service/authorize";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [state, setState] = useState({ username: "", password: "" });

  const { username, password } = state;

  const inputValue = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/login`, { username, password })
      .then((res) => {
        Swal.fire("Welcome!", "Login successfully.", "success");
        authenticate(res, () => props.history.push("/create"));
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  };

  useEffect(() => {
    getUser() && props.history.push("/");
  }, []);
  return (
    <div className="container p-5">
      <Navbar />
      <br />
      <h1>Login for Admin</h1>
      <form onSubmit={submitForm}>
        <br />
        <div className="form-group">
          <label className="mb-3">
            <h5>Username</h5>
          </label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={inputValue("username")}
          />
        </div>
        <br />

        <div className="form-group">
          <label className="mb-3">
            <h5>Password</h5>
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={inputValue("password")}
          />
        </div>
        <br />
        <input type="submit" value="SUBMIT" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default withRouter(Login);
