import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { GET_ADDRESSES } from '../api/backendRequests';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../App';
import '../custom.css';
import CustomizedSnackbar from '../components/CustomizedSnackbar';

// Home page - for a logged in user 
const Addresses = () => {

	// A list that will hold all users
	const [addresses, setAddresses] = useState([]);
	const [showAddressesAlert, setShowAddressesAlert] = useState(false);
	const [query, setQuery] = useState([]);

	const initialFormData = Object.freeze({
		query: ""
	});

	// Form fields
	const [formData, setFormData] = useState(initialFormData);

	// Handle change form data
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		setQuery(formData.query);
		setShowAddressesAlert(false);
	};

	useEffect(() => {
		setAddresses([]);
		if (query) {
			GET_ADDRESSES( query ,
				(response) => {
					if (!response) {
						throw new Error(response.message);
					}
					setAddresses(response.addresses);
					
				},
				(error) => {
					setShowAddressesAlert(true);
				})
		}
	}, [query])

	return (
		<form >
			<div className='mb-3'>
				<label>Query</label>
				<input type='text' name='query'
					className='form-control' placeholder='Please enter query' onKeyPress={handleChange} />
			</div>

			<div className='main'>
				<TableContainer sx={{ marginBottom: 1, borderRadius: 2, }}>
					<Table aria-label="collapsible table" stickyHeader>
						<TableHead>
							<TableRow sx={{
								"& th": {
									backgroundColor: "#d6d1d1",
									fontSize: "1.3rem",
									fontWeight: "bolder",
									color: "rgba(96, 96, 96)",
								},
							}}>
								<TableCell sx={{
									textAlign: "center",
								}}>Addresses</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{addresses.map((address) => (
								<TableRow
									key={address.userAddress}
								>

									<TableCell sx={{
										borderBottom: "1.5px solid black",
										textAlign: "center",
									}}>
										{address.userAddress}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

			</div>
			<>
				{showAddressesAlert ?
					<>
						<CustomizedSnackbar message={"There is no results"} type={"error"} />
					</> : <>
					</>
				}
			</>
		</form>
	)

}

export default (Addresses);