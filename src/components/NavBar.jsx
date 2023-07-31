import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import Logo from "../assets/logo3.png";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={Logo} alt="design of the logo" />
          </Link>
          <h3 className={styles.title}>
            <span className={styles.titleDetail}>M</span>ovies &{" "}
            <span className={styles.titleDetail}>P</span>
            opcorn
          </h3>
        </div>
        <ul className={styles.navMenu}>
          <li>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.navLink}>
              About
            </Link>
          </li>
          <li>
            <Link to="/form" className={styles.navLink}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
