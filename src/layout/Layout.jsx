import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "./index.module.css";

export const Layout = () => {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
