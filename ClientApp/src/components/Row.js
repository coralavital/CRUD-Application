import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useContext, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import UpdateForm from '../containers/UpdateForm';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Constants from '../utilities/Constants';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import Table from '@mui/material/Table';
import { AuthContext } from '../App';
import Box from '@mui/material/Box';
import '../custom.css';



// For every user create a row with the user details
const Row = (props) => {
	const { address, row, onDeleteUser, setShowDeletedAlert, setShowUpdatedAlert, setUpdatedUser } = props;
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
				onDeleteUser(id);

				setShowDeletedAlert(true);
				if (id === state.user.id) {
					dispatch({
						type: "LOGOUT",
						payload: {}
					});
				}
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	}

	// Return user row with option to open dialog for update user as a logged in user
	return (
		<React.Fragment style={{ paddingBottom: 0, paddingTop: 100, borderBottom: "none"}} >
			<TableRow sx={{
				'& > *': { borderBottom: 'unset' },
				"& td": {
					fontSize: "1.3rem",
				},
			}}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <ArrowCircleUpOutlinedIcon /> : <ArrowCircleDownOutlinedIcon />}
					</IconButton>
				</TableCell>

				<TableCell align="center">{row.email}</TableCell>
				<TableCell align="center">{row.username}</TableCell>
			</TableRow>
			<TableRow sx={{
				"& th": {
					fontSize: "1.2rem",
					fontWeight: "bolder",
					color: "rgba(96, 96, 96)"
				},
			}}>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0, }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 4, backgroundColor: "silver", borderRadius: 2}}>
							<Typography gutterBottom component="div" sx={{ fontSize: 'h5.fontSize', fontWeight: 'bolder' }}>
								User Details
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>Email</TableCell>
										<TableCell>User Name</TableCell>
										<TableCell>Address</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow sx={{
										"& td": {
											fontSize: "1.1rem",
										},
									}}>
										<TableCell>{row.email}</TableCell>
										<TableCell>{row.username}</TableCell>
										<TableCell>{address.userAddress}</TableCell>
										<TableCell align='right'>
											{state.user.id != row.id ?
												<>
													<Tooltip title="Update user details">
														<IconButton>
															<BorderColorIcon onClick={handleClickOpen} />
														</IconButton>
													</Tooltip>
													{/*<button onClick={handleClickOpen} className="btn btn-dark btn-lg mx-1 my-1">Update</button>*/}
													<Tooltip title="Delete user">
														<IconButton>
															<DeleteIcon onClick={() => { if (window.confirm(`Are you sure you want to delete the user "${row.username}"?`)) deleteUser(row.id); onDeleteUser(row.id) }} />
														</IconButton>
													</Tooltip>

												</> : <>
													<Tooltip title="Update user details">
														<IconButton>
															<BorderColorIcon onClick={handleClickOpen} />
														</IconButton>
													</Tooltip>
													{/*<button onClick={handleClickOpen} className="btn btn-dark btn-lg mx-1 my-1">Update</button>*/}
													<Tooltip title="Delete" onClick={() => { if (window.confirm(`Are you sure you want to delete your user?\nAfter deleted you automatically logged out`)) deleteUser(row.id) }} >
														<IconButton >
															<DeleteIcon />
														</IconButton>
													</Tooltip>
												</>}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
			<>
				{/* Dialog for Add user as a logged in user */}
				{showDialog ?
					<>
						<Dialog open={showDialog} onClose={handleClose} PaperProps={{
							style: {
								minHeight: 300,
								minWidth: 400,
							},
						}}>
							<DialogTitle sx={{ fontSize: 20, margin: 'auto', fontWeight: 'bold'}}>Update User Details</DialogTitle>
							<DialogContent>
								<UpdateForm setShowDialog={setShowDialog} setUpdatedUser={setUpdatedUser} setShowUpdatedAlert={setShowUpdatedAlert} user={row} address={address} />
							</DialogContent>
						</Dialog>
					</> : <> </>
				}
			</>
		</React.Fragment>
	);

}

export default Row;