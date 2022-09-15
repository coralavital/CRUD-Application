import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import DialogContentText from '@mui/material/DialogContentText';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DELETE_USER } from '../api/backendRequests';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useContext, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import UpdateForm from '../containers/UpdateForm';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Table from '@mui/material/Table';
import { AuthContext } from '../App';
import Box from '@mui/material/Box';
import '../custom.css';



// For every user create a row with the user details
const Row = (props) => {
	const { address, row, onDeleteUser, setShowDeletedAlert, setShowUpdatedAlert, setUpdatedUser } = props;
	const [open, setOpen] = useState(false);
	const [showUpdateDialog, setShowUpdateDialog] = useState(false);
	const { state, dispatch } = useContext(AuthContext);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	// Handle dialog open
	const handleUpdateOpen = () => {
		setShowUpdateDialog(true);
	};

	// Handle dialog close
	const handleUpdateClose = () => {
		setShowUpdateDialog(false);
	};

	const handleDeleteOpen = () => {
		setShowDeleteDialog(true);
	};
	// Handle dialog close
	const handleDeleteClose = () => {
		setShowDeleteDialog(false);
	};



	// Delete user function - DELETE request
	function handleDelete() {
		DELETE_USER({ row },
			(response) => {
				if (!response.message) {
					throw new Error(response);
				}
				onDeleteUser(row.id);
				if (row.id === state.user.id) {
					dispatch({
						type: "LOGOUT",
						payload: {}
					});
				}
				setShowDeletedAlert(true);
			},
			(error) => {
				console.log(error);
				alert(error);
			})
	}

	// Return user row with option to open dialog for update user as a logged in user
	return (
		<React.Fragment style={{ paddingBottom: 0, paddingTop: 100, borderBottom: "none" }} >
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
						<Box sx={{ margin: 4, backgroundColor: "silver", borderRadius: 2 }}>
							<Typography gutterBottom component="div" sx={{ fontSize: 'h5.fontSize', fontWeight: 'bolder', textAlign: 'center', }}>
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
											<Tooltip title="Update user details">
												<IconButton>
													<BorderColorIcon onClick={handleUpdateOpen} />
												</IconButton>
											</Tooltip>
											<Tooltip title="Delete user" >
												<IconButton >
													<DeleteIcon onClick={handleDeleteOpen} />
												</IconButton>
											</Tooltip>
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
				{showUpdateDialog ?
					<>
						<Dialog open={showUpdateDialog} onClose={handleUpdateClose} PaperProps={{
							style: {
								minHeight: 300,
								minWidth: 400,
							},
						}}>
							<DialogTitle sx={{ fontSize: 20, margin: 'auto', fontWeight: 'bold' }}>Update User Details</DialogTitle>
							<DialogContent>
								<UpdateForm setShowDialog={setShowUpdateDialog} setUpdatedUser={setUpdatedUser} setShowUpdatedAlert={setShowUpdatedAlert} user={row} address={address} />
							</DialogContent>
						</Dialog>
					</> : <> </>
				}
			</>
			<>
				{/* Dialog for Add user as a logged in user */}
				{showDeleteDialog ?
					<>
						<Dialog open={showDeleteDialog} onClose={handleDeleteClose} PaperProps={{
							style: {
								minHeight: 100,
								minWidth: 100,
							},
						}}>
							<DialogTitle sx={{ fontSize: 20, margin: 'auto', fontWeight: 'bold' }}>Delete User</DialogTitle>
							<DialogContent>
								<DialogContent>
									<DialogContentText id="alert-dialog-slide-description">
										<>
										{state.user.id !== row.id ?
										<>
										Are you sure that you want to delete the user?
										</> : <>
										Are you sure that you want to delete the your user?
										After deleted you automatically logged out
										</>
										}
										</>
									</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleDeleteClose}>Disagree</Button>
									<Button onClick={handleDelete}>Agree</Button>
								</DialogActions>
							</DialogContent>
						</Dialog>
					</> : <> </>
				}

			</>
		</React.Fragment>
	);

}

export default Row;