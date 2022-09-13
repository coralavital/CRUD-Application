import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import Constants from '../utilities/Constants';
import {AuthContext} from '../App';

const Nav = () => {
	const [username, setUsername] = useState('');
  const { state, dispatch } = useContext(AuthContext);

	// Log out function
	const logout = async () => {
		const logout_url = Constants.API_URL_LOGOUT_USER;
    fetch(logout_url, {
      method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		})
			.then(response => response.json())
			.then(responseFromServer => {
        dispatch({
          type: "LOGOUT",
          payload: {}
        });

			})
			.catch((error) => {
				console.log(error);
			});
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