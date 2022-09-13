import React, { useState, useContext } from 'react';
import Constants from '../utilities/Constants';
import { AuthContext } from '../App';

const UpdateForm = (props) => {

	const { state, dispatch } = useContext(AuthContext);
	const { user } = props;
	const { address } = props;

	// Initial Form Data
	const initialFormData = Object.freeze({
		username: "",
		email: "",
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

	// Handle submit - PUT request
	function handleSubmit(e) {
		e.preventDefault();
		const userToUpdate = {
			id: user.id,
			username: formData.username? formData.username : user.username,
			email: formData.email? formData.email : user.email,
			userAddress: formData.userAddress? formData.userAddress : address.userAddress
		};


		const url = Constants.API_URL_UPDATE_USER;
		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userToUpdate)
		})
			.then(response => response.json())
			.then(response => {
				if (!response) {
					throw new Error(response.message);
					props.setShowDialog(false)
				}
				dispatch({
					type: "UPDATED",
					payload: { ...response }
				});
				
				alert(response.message)
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});


	};

	return (

		<form onSubmit={handleSubmit}>
			<div className='mb-3'>
				<label>User Name</label>
				<input type='text' name="username" className='form-control' placeholder={user.username}
					onChange={handleChange} />
			</div>
			<div className='mb-3'>
				<label>Email Address</label>
				<input type='email' name='email' className='form-control' placeholder={user.email}
					onChange={handleChange} />
			</div>
			<div className='mb-3'>
				<label>User Address</label>
				<input type='text' name='userAddress' className='form-control' placeholder={address.userAddress}
					onChange={handleChange} />
			</div>
			<div className="col-md-12 text-center">
				<button type='submit' className='btn btn-primary btn-lg btn-block d-grid mb-2 mx-auto' >Update User</button>
				<button onClick={() => props.setShowDialog(false)} type='button' className='btn btn-primary btn-lg btn-block d-grid mx-auto'>Cancel</button>
			</div>
		</form>

	);
}

export default UpdateForm;