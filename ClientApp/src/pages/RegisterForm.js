import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Constants from '../utilities/Constants';
import CustomizedSnackbar from '../components/Alerts';
import { AuthContext } from '../App';

// Register page
const RegisterForm = (props) => {

	const [redirect, setRedirect] = useState(false);
	const { state, dispatch } = useContext(AuthContext);
	const { setShowDialog, setAddedUser, setShowCreatedAlert } = props;

	// Initial Form Data
	const initialFormData = Object.freeze({
		email: "",
		username: "",
		password: "",
		userAddress: ""
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
		const userToCreate = {
			email: formData.email,
			username: formData.username,
			password: formData.password,
			userAddress: formData.userAddress
		};


		const url = Constants.API_URL_REGISTER_USER;
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userToCreate)
		})
			.then(response => response.json())
			.then(response => {
				if (!response.user) {
					throw new Error(response.message);
				}
				if(setShowDialog) {
					setShowDialog(false);
					setShowCreatedAlert(true);
				}
				else {
					dispatch({
						type: "REGISTER",
						payload: { ...response }
					});
				}
				setRedirect(true);
				if(setAddedUser){
					{setAddedUser(userToCreate)}
				}
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	};

	// The user registered and transfer to the home page
	if (redirect) {
		console.log(`User successfully created and login automatically`);
		return <Navigate to={"/"} />
	}

	return (
		<>
			{/* If some user register other user in add user dialog */}
			{props.flag == true ?
				<>
					<form onSubmit={handleSubmit}>
					<div className='mb-3'>
							<label>Email</label>
							<input type='email' name='email' className='form-control' placeholder='Enter Email'
								onChange={handleChange} required />
						</div>
						<div className='mb-3'>
							<label>User Name</label>
							<input type='text' name="username" className='form-control' placeholder='Enter User Name'
								onChange={handleChange} required />
						</div>

						<div className='mb-3'>
							<label>Password</label>
							<input type='password' name='password' className='form-control' placeholder='Enter Password'
								onChange={handleChange} required minLength={6} maxLength={20} />
						</div>
						<div className='mb-3'>
							<label>Address</label>
							<input type='text' name='userAddress' className='form-control' placeholder='Enter Address'
								onChange={handleChange} required />
						</div>
						<div className="col-md-12 text-center">
							<button type='submit' className='btn btn-primary btn-lg btn-block d-grid mb-2 mx-auto' >Add User</button>
							<button onClick={() => props.setShowDialog(false)} type='button' className='btn btn-primary btn-lg btn-block d-grid mx-auto'>Cancel</button>
						</div>
					</form>

				</> :
				<>
				{/* If user register himself at the first time */}
					<div className='border'>
						<div className='center'>
							<form onSubmit={handleSubmit}>
								<h3 className='signup-title'>Sign Up</h3>
								<div className='mb-3'>
									<label>Email</label>
									<input type='email' name='email' className='form-control' placeholder='Enter Email'
										onChange={handleChange} required />
								</div>
								<div className='mb-3'>
									<label>User Name</label>
									<input type='text' name="username" className='form-control' placeholder='Enter User Name'
										onChange={handleChange} required />
								</div>
								<div className='mb-3'>
									<label>Password</label>
									<input type='password' name='password' className='form-control' placeholder='Enter Password'
										onChange={handleChange} required minLength={6} maxLength={20} />
								</div>
								<div className='mb-3'>
									<label>Address</label>
									<input type='text' name='userAddress' className='form-control' placeholder='Enter Address'
										onChange={handleChange} required />
								</div>
								<div className='d-grid mx-5 mb-2 '>
									<button type='submit' className='btn btn-primary'>
										Sign Up
									</button>
								</div>
									<p className='forgot-password text-right'>
										Already registered ? <a href='/login'>Login</a>
									</p>
							</form>
						</div>
					</div>
				</>
			}
		</>
	);
}

export default RegisterForm;