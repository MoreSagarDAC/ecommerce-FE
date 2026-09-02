import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./MainLayout.module.css";
import { getCartItems } from "../services/cart-services";
import { setCart } from "../redux/cartSlice";

const MainLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartItems = await getCartItems();
        dispatch(setCart(cartItems));
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };

    loadCart();
  }, [dispatch]);

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