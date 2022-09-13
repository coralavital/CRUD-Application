import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import '../custom.css';
import { AuthContext } from '../App';
import Constants from '../utilities/Constants';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import UpdateForm from './UpdateForm';
import RegisterForm from './RegisterForm';
import { Navigate } from 'react-router-dom';




// Home page - for a logged in user 
const Home = () => {

	const [users, setUsers] = useState([]);
	const { state, dispatch } = useContext(AuthContext);
	const [showDialog, setShowDialog] = useState(false);
	const [addresses, setAddresses] = useState([]);

	console.log(state);

	// Get all users - GET request
	function getUsers() {
		const url = Constants.API_URL_GET_USERS;

		fetch(url, {
			method: 'GET'
		})
			.then(response => response.json())
			.then(usersFromServer => {
				setUsers(usersFromServer);
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});

	}

	// Get all addresses - GET request
	function getAddresses() {
		const url = Constants.API_URL_GET_ADDRESSES;

		fetch(url, {
			method: 'GET'
		})
			.then(response => response.json())
			.then(addressesFromServer => {
				setAddresses(addressesFromServer);
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
		return;
	}

	// Handle dialog open
	const handleClickOpen = () => {
		setShowDialog(true);
	};

	// Handle dialog close
	const handleClose = () => {
		setShowDialog(false);
	};

	// Rows for showing table - contain users list
	const rows = [...users];

	// Rows for showing table - contain addresses list
	const addressesList = [...addresses]

	// If user logged in display users table
	if (state.user) {

		// Get the addresses list
		getAddresses();
		// Get the users list
		getUsers();

		// Return users table with option to open dialog for add user as a logged in user
		return (
			<div className='main'>
				<div className='border'>
					{state.newUser ? `Welcome, ${state.user.username}` : `Welcome back, ${state.user.username}`}
					<TableContainer component={Paper} style={{ maxHeight: 650, maxWidth: 700, minHeight: 650, minWidth: 700, fontSize: 50 }}>
						<Table aria-label="collapsible table" stickyHeader >
							<TableHead>
								<TableRow>
									<TableCell />
									<TableCell>User Name</TableCell>
									<TableCell align="right">Email</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<Row key={row.username} row={row} address={addressesList.find((address) => { return address.id === row.id })} />
								))}
							</TableBody>

						</Table>
					</TableContainer>
				</div>
				<>
					{showDialog ?
						<>
							<Dialog open={showDialog} onClose={handleClose} PaperProps={{
								style: {

									minHeight: 300,
									minWidth: 400,
								},
							}}>
								<DialogTitle>Register User</DialogTitle>
								<DialogContent>
									<RegisterForm flag={true} setShowDialog={setShowDialog} />
								</DialogContent>
							</Dialog>
						</> :
						<> </>
					}
				</>
				<button onClick={handleClickOpen} className="btn btn-dark btn-lg mx-1 my-1" >Add User</button>
			</div>
		)
	}
	// If user not logged in display welcome page
	return (
		<div className='main'>
			<div>
				Hey there
			</div>
			<div>
				login or register to see more
			</div>

		</div>
	)
}

export default (Home);

// For every user create a row with the user details
function Row(props) {
	const { row } = props;
	const { address } = props;
	const [open, setOpen] = useState(false);
	const [showDialog, setShowDialog] = useState(false);
	const { state, dispatch } = useContext(AuthContext);

	// Handle dialog open
	const handleClickOpen = () => {
		setShowDialog(true);
	};

	// Handle dialog close
	const handleClose = () => {
		setShowDialog(false);
	};

	// Delete user function - DELETE request
	function deleteUser(id) {
		const url = `${Constants.API_URL_DELETE_USER}?id=${id}`;

		fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		})
			.then(response => response.json())
			.then(response => {
				if (!response.message) {
					throw new Error(response);
				}
				alert("The user deleted");
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	}

	// Return user row with option to open dialog for update user as a logged in user
	return (
		<React.Fragment style={{ paddingBottom: 0, paddingTop: 100 }} >
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <ArrowCircleUpOutlinedIcon /> : <ArrowCircleDownOutlinedIcon />}
					</IconButton>
				</TableCell>

				<TableCell>{row.username}</TableCell>
				<TableCell align="right">{row.email}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								User Details
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>User Name</TableCell>
										<TableCell>Email</TableCell>
										<TableCell>Address</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell>{row.username}</TableCell>
										<TableCell>{row.email}</TableCell>
										<TableCell>{address.userAddress}</TableCell>
										<TableCell align="center">
											{state.user.id != row.id ?
												<>
													<button onClick={handleClickOpen} className="btn btn-dark btn-lg mx-1 my-1">Update</button>
													<button onClick={() => { if (window.confirm(`Are you sure you want to delete the user "${row.username}"?`)) deleteUser(row.id) }} className="btn btn-secondary btn-lg mx-1 my-1">Delete</button>

												</> : <>
													<button onClick={handleClickOpen} className="btn btn-dark btn-lg mx-1 my-1">Update</button>
													{/*<button onClick={() => { if (window.confirm(`Are you sure you want to delete your user?\nAfter deleted you automatically logged out`)) deleteUser(row.id) }} className="btn btn-secondary btn-lg mx-1 my-1">Delete</button>*/}
												</>
											}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
			<>
				{showDialog ?
					<>
						<Dialog open={showDialog} onClose={handleClose} PaperProps={{
							style: {

								minHeight: 300,
								minWidth: 400,
							},
						}}>
							<DialogTitle>Update User Details</DialogTitle>
							<DialogContent>
								<UpdateForm setShowDialog={setShowDialog} user={row} address={address} />
							</DialogContent>
						</Dialog>
					</> : <> </>
				}
			</>
		</React.Fragment>
	);

}

Row.propTypes = {
	row: PropTypes.shape({
		calories: PropTypes.number.isRequired,
		carbs: PropTypes.number.isRequired,
		fat: PropTypes.number.isRequired,
		history: PropTypes.arrayOf(
			PropTypes.shape({
				amount: PropTypes.number.isRequired,
				customerId: PropTypes.string.isRequired,
				date: PropTypes.string.isRequired,
			}),
		).isRequired,
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		protein: PropTypes.number.isRequired,
	}).isRequired,
};



