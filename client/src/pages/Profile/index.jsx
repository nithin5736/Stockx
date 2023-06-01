import styles from "./styles.module.css";
import { apiURL } from "../../utils/APIRoutes";

function Profile(userDetails) {
  const user = userDetails.user;
  const logout = () => {
    window.open(`${apiURL}/auth/logout`, "_self");
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Home</h1>
      <div className={styles.form_container}>
        <div className={styles.left}>
          <img className={styles.img} src="./images/profile.jpg" alt="login" />
        </div>
        <div className={styles.right}>
          <h2 className={styles.from_heading}>Profile</h2>
          <input
            type="text"
            defaultValue={user.name}
            className={styles.input}
            placeholder="UserName"
          />
          <input
            type="text"
            defaultValue={user.email}
            className={styles.input}
            placeholder="Email"
          />
          <button className={styles.btn} onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
