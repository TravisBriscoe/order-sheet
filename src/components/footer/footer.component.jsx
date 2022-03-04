/**
 * Footer Component
 * Renders a footer on every page with an About Link, total products listed or null (dynamic), delete all buttons (dynamic), and Logout
 * Functional Component
 * Uses: React-Router (Link, useLocation)
 * Imported Components: None
 * State: None
 * Props:
 * Hooks: None
 * Functions: None
 */

import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./footer.styles.scss";

const Footer = (props) => {
	const { pathname } = useLocation();

	return (
		<div className="footer">
			<Link to={`${process.env.PUBLIC_URL}/about`}>About</Link>
			<div className="footer-item-total">
				{/* Renders Length of correct props according to users location */}
				{pathname === "/" || pathname === "/manage/edit-products" ? (
					<div>{props.sortedProds ? props.sortedProds.length : "0"} items</div>
				) : null}
				{pathname === "/recipes" || pathname === "/manage/edit-recipes" ? (
					<div>
						{Object.entries(props.recipes).length <= 0 ? "0" : Object.entries(props.recipes).length}{" "}
						items
					</div>
				) : null}
				{pathname === "/manage/edit-users" ? (
					<div>{Object.entries(props.users).length} items</div>
				) : null}
				{pathname === "/order-sheet" ? (
					<div>{Object.entries(props.onOrder).length} items</div>
				) : null}
			</div>
			<div className="footer-nav--ordersheet">
				{/* Renders proper buttons according to users location */}
				{pathname === "/" ? (
					<Link to={`${process.env.PUBLIC_URL}/order-sheet`}>
						<button>Order Sheet</button>
					</Link>
				) : null}
				{pathname.includes("edit-products") && props.loggedInUser.toLowerCase() === "manager" ? (
					<button onClick={() => props.deleteAllData("products")}>Delete All!</button>
				) : null}
				{pathname === "/manage/edit-users" && props.loggedInUser.toLowerCase() === "manager" ? (
					<button onClick={() => props.deleteAllData("users")}>Delete All!</button>
				) : null}
				{pathname.includes("edit-recipes") && props.loggedInUser.toLowerCase() === "manager" ? (
					<button onClick={() => props.deleteAllData("recipes")}>Delete All!</button>
				) : null}
			</div>
			<div className="footer-nav--logout">
				<button onClick={props.signOut}>Logout</button>
			</div>
		</div>
	);
};

export default Footer;
