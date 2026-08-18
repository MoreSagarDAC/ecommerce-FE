import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./MainLayout.module.css";

const MainLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <div className={styles.layout}>
      <Navbar
        open={drawerOpen}
        onDrawerOpen={() => setDrawerOpen(true)}
        onDrawerClose={() => setDrawerOpen(false)}
      />

      <div
        className={`${styles.contentArea} ${
          drawerOpen ? styles.drawerOpen : styles.drawerClosed
        }`}
      >
        <main className={styles.main}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;