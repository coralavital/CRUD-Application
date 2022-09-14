import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../custom.css';
import { AuthContext } from '../App';
import Constants from '../utilities/Constants';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import RegisterForm from './RegisterForm';
import CustomizedSnackbar from '../components/Alert';
import Row from '../components/Row';
import { GET_ALL_ADDRESSES, GET_ALL_USERS } from '../api/backendRequests';

// Home page - for a logged in user 
const Home = () => {

	const [users, setUsers] = useState([]);
	const { state, dispatch } = useContext(AuthContext);
	const [showDialog, setShowDialog] = useState(false);
	const [addresses, setAddresses] = useState([]);
	const [addedUser, setAddedUser] = useState([]);
	const [updatedUser, setUpdatedUser] = useState([]);

	// Successes alerts
	const [showDeletedAlert, setShowDeletedAlert] = useState(false);
	const [showUpdatedAlert, setShowUpdatedAlert] = useState(false);
	const [showCreatedAlert, setShowCreatedAlert] = useState(false);

	useEffect(() => {
		getUsers()
		GET_ALL_ADDRESSES(setAddresses)
	}, [addedUser, updatedUser])

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
	}

	function onDeleteUser(id) {
		setUsers(users.filter(user => user.id !== id));
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
	if (state.user && users && addresses.length > 0) {

		// Return users table with option to open dialog for add user as a logged in user
		return (
			<div className='main'>
				{state.newUser ? `Welcome, ${state.user.username}` : `Welcome back, ${state.user.username}`}
				<TableContainer component={Paper} sx={{
					maxHeight: 425, maxWidth: 900, minHeight: 425, minWidth: 900, margin: 'auto', marginBottom: 3, marginTop: 3, borderRadius: 6,
					"&::-webkit-scrollbar": {
						width: 8,
					},

					"&::-webkit-scrollbar-thumb": {
						backgroundColor: "silver",
						borderRadius: 10
					}
				}}>
					<Table aria-label="collapsible table" stickyHeader style={{ margin: 'auto', borderBottom: "none" }}>
						<TableHead sx={{ borderBottom: "1px solid black", }}>
							<TableRow sx={{
								"& th": {
									backgroundColor: "silver",
									fontSize: "1.3rem",
									fontWeight: "bolder",
									color: "rgba(96, 96, 96)"
								},
							}} >
								<TableCell />
								<TableCell align="center">Email</TableCell>
								<TableCell align="center">User Name</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<Row onDeleteUser={onDeleteUser} key={row.email} setShowDeletedAlert={setShowDeletedAlert} 
								row={row} setShowUpdatedAlert={setShowUpdatedAlert} setUpdatedUser={setUpdatedUser}
								address={addressesList.find((address) => { return address.userId === row.id })} />
							))}
						</TableBody>

					</Table>
				</TableContainer>
				<>
					{showDialog ?
						<>
							<Dialog open={showDialog} onClose={handleClose} PaperProps={{
								style: {
									minHeight: 400,
									maxHeight: 400,
									minWidth: 400,
									maxWidth: 400,
								},
							}}>
								<DialogTitle sx={{ fontSize: 20, margin: 'auto', fontWeight: 'bold'}}>Register User</DialogTitle>
								<DialogContent>
									<RegisterForm flag={true} setAddedUser={setAddedUser} setShowCreatedAlert={setShowCreatedAlert} setShowDialog={setShowDialog} />
								</DialogContent>
							</Dialog>
						</> :
						<> </>
					}
				</>
				<>
					{showCreatedAlert ?
						<>
							<CustomizedSnackbar message={"User successfully created"} type={"success"} />
						</> : <>
						</>
					}
				</>
				<>
					{showUpdatedAlert ?
						<>
							<CustomizedSnackbar message={"User successfully updated"} type={"success"} />
						</> : <>
						</>
					}
				</>
				<>
					{showDeletedAlert ?
						<>
							<CustomizedSnackbar message={"User successfully deleted"} type={"success"} />
						</> : <>
						</>
					}
				</>
				<button onClick={handleClickOpen} className="btn btn-dark btn-lg mx-1 my-1" >Add New User +</button>
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
//function Row(props) {
//	const { address, row, onDeleteUser, setShowDeletedAlert, setShowUpdatedAlert, setUpdatedUser } = props;
//	const [open, setOpen] = useState(false);
//	const [showDialog, setShowDialog] = useState(false);
//	const { state, dispatch } = useContext(AuthContext);

//	// Handle dialog open
//	const handleClickOpen = () => {
//		setShowDialog(true);
//	};

//	// Handle dialog close
//	const handleClose = () => {
//		setShowDialog(false);
//	};



//	// Delete user function - DELETE request
//	function deleteUser(id) {
//		const url = `${Constants.API_URL_DELETE_USER}?id=${id}`;

//		fetch(url, {
//			method: 'DELETE',
//			headers: {
//				'Content-Type': 'application/json'
//			},
//		})
//			.then(response => response.json())
//			.then(response => {
//				if (!response.message) {
//					throw new Error(response);
//				}
//				onDeleteUser(id);

//				setShowDeletedAlert(true);
//				if (id === state.user.id) {
//					dispatch({
//						type: "LOGOUT",
//						payload: {}
//					});
//				}
//			})
//			.catch((error) => {
//				console.log(error);
//				alert(error);
//			});
//	}

//	// Return user row with option to open dialog for update user as a logged in user
//	return (
//		<React.Fragment style={{ paddingBottom: 0, paddingTop: 100, borderBottom: "none"}} >
//			<TableRow sx={{
//				'& > *': { borderBottom: 'unset' },
//				"& td": {
//					fontSize: "1.3rem",
//				},
//			}}>
//				<TableCell>
//					<IconButton
//						aria-label="expand row"
//						size="small"
//						onClick={() => setOpen(!open)}
//					>
//						{open ? <ArrowCircleUpOutlinedIcon /> : <ArrowCircleDownOutlinedIcon />}
//					</IconButton>
//				</TableCell>

//				<TableCell align="center">{row.email}</TableCell>
//				<TableCell align="center">{row.username}</TableCell>
//			</TableRow>
//			<TableRow sx={{
//				"& th": {
//					fontSize: "1.2rem",
//					fontWeight: "bolder",
//					color: "rgba(96, 96, 96)"
//				},
//			}}>
//				<TableCell style={{ paddingBottom: 0, paddingTop: 0, }} colSpan={6}>
//					<Collapse in={open} timeout="auto" unmountOnExit>
//						<Box sx={{ margin: 4, backgroundColor: "silver", borderRadius: 2}}>
//							<Typography gutterBottom component="div" sx={{ fontSize: 'h5.fontSize', fontWeight: 'bolder' }}>
//								User Details
//							</Typography>
//							<Table size="small" aria-label="purchases">
//								<TableHead>
//									<TableRow>
//										<TableCell>Email</TableCell>
//										<TableCell>User Name</TableCell>
//										<TableCell>Address</TableCell>
//									</TableRow>
//								</TableHead>
//								<TableBody>
//									<TableRow sx={{
//										"& td": {
//											fontSize: "1.1rem",
//										},
//									}}>
//										<TableCell>{row.email}</TableCell>
//										<TableCell>{row.username}</TableCell>
//										<TableCell>{address.userAddress}</TableCell>
//										<TableCell align='right'>
//											{state.user.id != row.id ?
//												<>
//													<Tooltip title="Update user details">
//														<IconButton>
//															<BorderColorIcon onClick={handleClickOpen} />
//														</IconButton>
//													</Tooltip>
//													{/*<button onClick={handleClickOpen} className="btn btn-dark btn-lg mx-1 my-1">Update</button>*/}
//													<Tooltip title="Delete user">
//														<IconButton>
//															<DeleteIcon onClick={() => { if (window.confirm(`Are you sure you want to delete the user "${row.username}"?`)) deleteUser(row.id); onDeleteUser(row.id) }} />
//														</IconButton>
//													</Tooltip>

//												</> : <>
//													<Tooltip title="Update user details">
//														<IconButton>
//															<BorderColorIcon onClick={handleClickOpen} />
//														</IconButton>
//													</Tooltip>
//													{/*<button onClick={handleClickOpen} className="btn btn-dark btn-lg mx-1 my-1">Update</button>*/}
//													<Tooltip title="Delete" onClick={() => { if (window.confirm(`Are you sure you want to delete your user?\nAfter deleted you automatically logged out`)) deleteUser(row.id) }} >
//														<IconButton >
//															<DeleteIcon />
//														</IconButton>
//													</Tooltip>
//												</>}
//										</TableCell>
//									</TableRow>
//								</TableBody>
//							</Table>
//						</Box>
//					</Collapse>
//				</TableCell>
//			</TableRow>
//			<>
//				{/* Dialog for Add user as a logged in user */}
//				{showDialog ?
//					<>
//						<Dialog open={showDialog} onClose={handleClose} PaperProps={{
//							style: {
//								minHeight: 300,
//								minWidth: 400,
//							},
//						}}>
//							<DialogTitle sx={{ fontSize: 20, margin: 'auto', fontWeight: 'bold'}}>Update User Details</DialogTitle>
//							<DialogContent>
//								<UpdateForm setShowDialog={setShowDialog} setUpdatedUser={setUpdatedUser} setShowUpdatedAlert={setShowUpdatedAlert} user={row} address={address} />
//							</DialogContent>
//						</Dialog>
//					</> : <> </>
//				}
//			</>
//		</React.Fragment>
//	);

//}

