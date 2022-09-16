import React, { useState, useContext } from 'react';
import Constants from '../utilities/Constants';
import { AuthContext } from '../App';

const UpdateUser = (props) => {

	const { state, dispatch } = useContext(AuthContext);
	const { user, address, setShowUpdatedAlert, setShowUpdateDialog, setUpdatedUser } = props;

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

	const handleUpdateAlert = () => {
		setShowUpdatedAlert(false);
	};

	// Handle submit - PUT request
	function handleSubmit(e) {
		e.preventDefault();
		const userToUpdate = {
			id: user.id,
			username: formData.username ? formData.username : user.username,
			email: user.email,
			userAddress: formData.userAddress ? formData.userAddress : address.userAddress
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
				}
				setShowUpdateDialog(false);
				setShowUpdatedAlert(true);
				dispatch({
					type: "UPDATED",
					payload: { ...response }
				});
				if (setUpdatedUser) {
					{ setUpdatedUser(userToUpdate) }
				}

			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	};

	return (

		<form onSubmit={handleSubmit}>
			<div className='mb-3'>
				<label>Email</label>
				<input type='email' name='email' className='form-control' disabled value={user.email} onChange={handleChange} />
			</div>
			<div className='mb-3'>
				<label>User name</label>
				<input type='text' name='username' className='form-control' defaultValue={user.username} onChange={handleChange} />
			</div>
			<div className='mb-3'>
				<label>Address</label>
				<input type='text' name='userAddress' className='form-control' defaultValue={address.userAddress} onChange={handleChange} />
			</div>
			<div className="col-md-12 text-center">
				<button type='submit' onClick={handleUpdateAlert} className="btn btn-dark btn-lg  btn-lg btn-block d-grid mb-2 mx-auto">Update</button>
			</div>
		</form>

	);
}

export default UpdateUser;