import { GET_ALL_ADDRESSES, GET_ALL_USERS } from '../api/backendRequests';
import React, { useContext, useEffect, useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import DialogContent from '@mui/material/DialogContent';
import CustomizedSnackbar from '../components/CustomizedSnackbar';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import RegisterForm from './Register';
import { AuthContext } from '../App';
import Row from '../components/Row';
import Box from '@mui/material/Box';
import '../custom.css';
import { auto } from '@popperjs/core';


// Home page - for a logged in user 
const Home = () => {

	// For Table Pagination
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	// Keep update on the state changes
	const { state, dispatch } = useContext(AuthContext);

	// A list that will hold all users
	const [users, setUsers] = useState([]);

	// Flag for open/close register dialog when logged in user create a new user
	const [showRegisterDialog, setShowRegisterDialog] = useState(false);

	const [addresses, setAddresses] = useState([]);
	const [addedUser, setAddedUser] = useState([]);
	const [updatedUser, setUpdatedUser] = useState([]);

	// Successes alerts
	const [showDeletedAlert, setShowDeletedAlert] = useState(false);
	const [showUpdatedAlert, setShowUpdatedAlert] = useState(false);
	const [showCreatedAlert, setShowCreatedAlert] = useState(false);

	function parseJwt(token) {
		if (!token) { return; }
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}
	// UseEffect keep the users and addresses list updated
	useEffect(() => {

		GET_ALL_USERS({},
			(response) => {
				if (!response) {
					throw new Error(response.message);
				}
				setAddresses(response.addresses);
				setUsers(response.users);
			},
			(error) => {
				console.log(error);
				alert(error);
			})
	}, [addedUser, updatedUser])

	// Handle with change page
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};


	function onDeleteUser(id) {
		setUsers(users.filter(user => user.id !== id));
	}

	// Handle dialog open
	const handleClickOpen = () => {
		setShowRegisterDialog(true);
	};

	// Handle dialog close
	const handleClose = () => {
		setShowRegisterDialog(false);
	};


	// Rows for showing table - contain users list
	const rows = [...users];
	const addressesList = [...addresses];
	rows.forEach(user => {
		var address = addressesList.find((address) => { return address.userId === user.id });
		if (address != undefined) {
			user.userAddress = address.userAddress;
		}
	});
	console.log(parseJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJjb3JhbEBnbWFpbC5jb20iLCJqdGkiOiJlMDlhMTgwNy03MWEyLTRjZDItYmM5ZS02MDEzYWIxMWQzYjciLCJleHAiOjE2NjM4Nzc0MzcsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAwNyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDQ0MjkifQ.sqYgBhMYVwsPxsbsCfFuP7-lxmo24vtjCoYHkHxiMu4'));
	var token = parseJwt(state.token);
	// If user logged in display users table
	if (state.user && users && addresses.length > 0) {
		// Return users table with option to open dialog for add user as a logged in user
		return (
			<div className='main'>
				<Typography color={"black"} variant="h6" component="div" sx={{ fontSize: 'xx-large', fontWeight: 'bolder' }}>
					{state.newUser ? `Welcome, ${state.token.name}` : `Welcome back, ${state.token.name}`}
				</Typography>
				<Box
					m={1}
					//margin
					display="flex"
					justifyContent="flex-end"
					alignItems="flex-end"
				>
					<button type='submit' onClick={handleClickOpen} className="btn btn-dark btn-lg btn-block d-grid ">Add User</button>
				</Box>
				<Box sx={{ paddingBottom: '10%' }}>
					<Paper sx={{ height: '100%', width: '100%', borderRadius: 6, marginTop: 1, }} >
						<TableContainer sx={{ marginBottom: 1, borderRadius: 7, }}>
							<Table aria-label="collapsible table" stickyHeader style={{ margin: 'auto', borderBottom: "none" }}>
								<TableHead>
									<TableRow sx={{
										"& th": {
											backgroundColor: "#d6d1d1",
											fontSize: "1.3rem",
											fontWeight: "bolder",
											color: "rgba(96, 96, 96)",
										},
									}} >
										<TableCell />
										<TableCell align="center">Email</TableCell>
										<TableCell align="center">User Name</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row) => (
											<Row onDeleteUser={onDeleteUser} key={row.email} setShowDeletedAlert={setShowDeletedAlert}
												row={row} setShowUpdatedAlert={setShowUpdatedAlert} setUpdatedUser={setUpdatedUser} />
										))}
								</TableBody>
							</Table>
						</TableContainer>

						<TablePagination
							component="div"
							count={rows.length}
							rowsPerPage={rowsPerPage}
							rowsPerPageOptions={5}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>

					</Paper>
				</Box>
				<>
					{showRegisterDialog ?
						<>
							<Dialog open={showRegisterDialog} onClose={handleClose} PaperProps={{
								style: {
									minHeight: 300,
									maxHeight: 400,
									minWidth: 400,
									maxWidth: 400,
								},
							}}>
								<IconButton sx={{ marginLeft: 'auto', marginTop: 1, marginRight: 1, marginBottom: 'auto' }}
									edge="start"
									color="inherit"
									onClick={handleClose}
									aria-label="close"
								>
									<CloseIcon />
								</IconButton>
								<DialogTitle sx={{ fontSize: 'xx-large', fontWeight: 'bolder', textAlign: 'center', padding: 1 }}>Add User</DialogTitle>
								<DialogContent>
									<RegisterForm flag={true} setAddedUser={setAddedUser} setShowCreatedAlert={setShowCreatedAlert}
										setShowRegisterDialog={setShowRegisterDialog} />
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
			</div>
		)
	}
	// If user not logged in display welcome page
	return (
		<div className='main'>
			<div>
				<Typography color={"black"} variant="h6" component="div" sx={{ fontSize: 'xx-large', fontWeight: 'bolder', flexGrow: 1 }}>
					Hey there,
					login or register to see more
				</Typography>
			</div>

		</div>
	)
}

export default (Home);
