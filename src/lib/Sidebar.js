import React, { useState } from "react";

import Menu from "@mui/icons-material/Menu";
import { NavData } from "../lib/NavData";
import { NavLink } from "react-router-dom";
import styles from "../components/Sidebar.module.css"; // Update the import for CSS Modules

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={open ? styles.sidebar : styles.sidebarClosed}>
      <button className={styles.menuBtn} onClick={toggleOpen}>
        {open ? <Menu /> : <Menu />}
      </button>
      {open && (
        <ul className={styles.menuItems}>
          {NavData.map((item) => (
            <li key={item.id} className={styles.sideitem}>
              <NavLink to={item.link}>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {item.icon}
                  <span className={styles.linkText}>{item.text}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
