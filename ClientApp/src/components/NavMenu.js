import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import Constants from '../utilities/Constants';
import { LOGOUT_USER } from '../api/backendRequests';
import { AuthContext } from '../App';

const Nav = () => {
	const [username, setUsername] = useState('');
	const { state, dispatch } = useContext(AuthContext);

	// Log out function
	function logout() {
		LOGOUT_USER({},
			(response) => {
				if (!response) {
					throw new Error(response.message);
				}
				dispatch({
					type: "LOGOUT",
					payload: {}
				});
			},
			(error) => {
				console.log(error);
				alert(error);
			})
	}

	let menu;

	if (!state.user) {
		menu = (
			<ul className="navbar-nav me-auto mb-2 mb-md-0">
				<li className="nav-item active">
					<Link to="/login" className="nav-link">Login</Link>
				</li>
				<li className="nav-item active">
					<Link to="/register" className="nav-link">Register</Link>
				</li>
			</ul>
		)
	} else {
		menu = (
			<ul className="navbar-nav me-auto mb-2 mb-md-0">
				<li className="nav-item active">
					<Link to="/" className="nav-link" onClick={logout}>Logout</Link>
				</li>
			</ul>
		)
	}

	return (
		<nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand">Home</Link>
				<div>
					{menu}
				</div>
			</div>
		</nav>
	);
};

export default Nav;