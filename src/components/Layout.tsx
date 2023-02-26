import { NavBar } from "./NavBar";
import styles from "./css/main.module.css";

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div>
      <NavBar />
      <div className={styles.main}>{children}</div>
    </div>
  );
};
