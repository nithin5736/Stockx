import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { apiURL } from "../../utils/APIRoutes";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const submitHandler = () => {
    axios.post(`${apiURL}/auth/login`, user).then((res) => {
      if (res.data.status) {
        alert(res.data.msg);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.open("/home", "_self");
      } else {
        alert(res.data.msg);
      }
    });
  };

  const googleAuth = () => {
    window.open(`${apiURL}/auth/google/callback`, "_self");
  };
  return (
    <div className="container">
      <div className={styles.container}>
        <h1 className={styles.heading}>Log in Form</h1>
        <div className={styles.form_container}>
          <div className={styles.left}>
            <img className={styles.img} src="./images/login.jpg" alt="login" />
          </div>
          <div className={styles.right}>
            <h2 className={styles.from_heading}>Members Log in</h2>
            <input
              type="email"
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
              Log In
            </button>
            <p className={styles.text}>or</p>
            <button className={styles.google_btn} onClick={googleAuth}>
              <img src="./images/google.png" alt="google icon" />
              <span>Sign in with Google</span>
            </button>
            <p className={styles.text}>
              New Here ? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
