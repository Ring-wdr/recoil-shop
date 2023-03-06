import { RouteArr } from "../link/Link";
import { Link, useLocation } from "react-router-dom";
import styles from "./css/navbar.module.css";
import { useEffect, useState } from "react";

export const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setToggle(false), [pathname]);
  return (
    <div className={styles.navbar}>
      <div className={styles.logoNroute}>
        <img
          src="android-icon-144x144.png"
          alt="logo"
          width="144"
          height="70"
          style={{ objectFit: "cover" }}
        ></img>
        <div className={[styles.links, toggle ? styles.active : ""].join(" ")}>
          {RouteArr.map(([key, path]) => (
            <div className={styles.link} key={key}>
              <Link to={path} style={{ textTransform: "uppercase" }}>
                {path.substring(1) || "HOME"}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <button
        className={styles.toggle}
        onClick={() => setToggle((prev) => !prev)}
      >
        {toggle ? "⤊" : "☰"}
      </button>
    </div>
  );
};
