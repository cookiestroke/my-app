import Menu from "@mui/icons-material/Menu";
import { NavData } from "../lib/NavData"; // Adjust the import if necessary
import { NavLink } from "react-router-dom";
import React from "react";
import logo from "../static/logo_jst_alt.png";
import styles from "../components/Sidebar.module.css"; // Adjust the import if necessary

export default function Sidebar({ open, toggleOpen }) {
	const handleLogout = () => {
		// Handle the logout logic here
	};

	return (
		<div className={open ? styles.sidebar : styles.sidebarClosed}>
			<button className={styles.menuBtn} onClick={toggleOpen}>
				<Menu />
			</button>
			<div className={styles.logoContainer}>
				<img src={logo} alt="Logo" className={`${styles.logo} ${open ? styles.logoOpen : styles.logoClosed}`} />
			</div>
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
			<div className={`${styles.logoutButton} ${open ? styles.logoutButtonOpen : styles.logoutButtonClosed}`}>
				<button onClick={handleLogout}>Logout</button>
			</div>
		</div>
	);
}
