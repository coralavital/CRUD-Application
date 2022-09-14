import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { LOGIN_USER } from '../api/backendRequests';
// Login page
const LoginForm = () => {
	const { state, dispatch } = useContext(AuthContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [redirect, setRedirect] = useState(false);

	// Initial Form Data
	const initialFormData = Object.freeze({
		username: "",
		password: ""
	});

	// Form fields
	const [formData, setFormData] = useState(initialFormData);

	// Handle change form data
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// Handle submit - POST request
	function handleSubmit(e) {
		e.preventDefault();
		// Automatically Login

		const userToLogin = {
			email: formData.email,
			password: formData.password,
		};

		LOGIN_USER({ userToLogin },
			(response) => {
				if (!response.user) {
					throw new Error(response.message);
				}
				dispatch({
					type: "LOGIN",
					payload: { ...response }
				});
				// Navigate to the home page as a logged in user
				setRedirect(true);
			},
			(error) => {
				console.log(error);
				alert(error);
			})

	}

	// The user registered and transfer to the home page
	if (redirect) {
		console.log(`User successfully logged in`);
		return <Navigate to={"/"} />
	}

	return (
		<div className='border'>
			<div className='center'>
				<form onSubmit={handleSubmit}>
					<h3 className='signup-title'>Login</h3>
					<div className='mb-3'>
						<label>Email</label>
						<input type='email' name="email" className='form-control' placeholder='Enter Email'
							onChange={handleChange} required />
					</div>
					<div className='mb-3'>
						<label>Password</label>
						<input type='password' name='password' className='form-control' placeholder='Enter Password'
							onChange={handleChange} required minLength={6} maxLength={20} />
					</div>
					<div className='d-grid mx-5'>
						<button type='submit' className='btn btn-primary'>
							Log in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginForm;