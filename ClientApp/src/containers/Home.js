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
		GET_ALL_ADDRESSES({},
			(response) => {
				if (!response) {
					throw new Error(response.message);
				}
				setAddresses(response);
			},
			(error) => {
				console.log(error);
				alert(error);
			})

		GET_ALL_USERS({},
			(response) => {
				if (!response) {
					throw new Error(response.message);
				}
				setUsers(response);
			},
			(error) => {
				console.log(error);
				alert(error);
			})
	}, [addedUser, updatedUser])

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
					boxShadow: 10,
					"&::-webkit-scrollbar": {
						width: 7, height: 2
					},

					"&::-webkit-scrollbar-thumb": {
						backgroundColor: "silver",
						borderRadius: 10
					},

					
				}}>
					<Table aria-label="collapsible table" stickyHeader style={{ margin: 'auto', borderBottom: "none" }}>
						<TableHead sx={{ borderBottom: "1px solid black", }}>
							<TableRow sx={{
								"& th": {
									backgroundColor: "silver",
									fontSize: "1.3rem",
									fontWeight: "bolder",
									color: "rgba(96, 96, 96)",
								},
								width: 100
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
								<DialogTitle sx={{ fontSize: 20, margin: 'auto', fontWeight: 'bold' }}>Register User</DialogTitle>
								<DialogContent>
									<RegisterForm flag={true} setAddedUser={setAddedUser} setShowCreatedAlert={setShowCreatedAlert} 
									setShowDialog={setShowDialog} />
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

				<button onClick={handleClickOpen} className="btn btn-dark btn-lg mx-1 my-1">Add New User +</button>
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
