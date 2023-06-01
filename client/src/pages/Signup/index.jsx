import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { apiURL } from "../../utils/APIRoutes";
import axios from "axios";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitHandler = () => {
    axios
      .post(`${apiURL}/auth/signup`, user)
      .then((res) => {
        if (res.data.status) {
          alert(res.data.msg);
          window.open("/", "_self");
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  const googleAuth = () => {
    window.open(`${apiURL}/auth/google/callback`, "_self");
  };
  return (
    <div className="container">
      <div className={styles.container}>
        <h1 className={styles.heading}>Sign up Form</h1>
        <div className={styles.form_container}>
          <div className={styles.left}>
            <img
              className={styles.img}
              src="./images/signup.jpg"
              alt="signup"
            />
          </div>
          <div className={styles.right}>
            <h2 className={styles.from_heading}>Create Account</h2>
            <input
              type="email"
              className={styles.input}
              placeholder="Username"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />
            <input
              type="password"
              className={styles.input}
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
            <input
              type="password"
              className={styles.input}
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
            <button className={styles.btn} onClick={submitHandler}>
              Sign Up
            </button>
            <p className={styles.text}>or</p>
            <button className={styles.google_btn} onClick={googleAuth}>
              <img src="./images/google.png" alt="google icon" />
              <span>Sign up with Google</span>
            </button>
            <p className={styles.text}>
              Already Have Account ? <Link to="/">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
