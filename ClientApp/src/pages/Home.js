import React, { useContext } from 'react';
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
import Constants from '../utilities/Constants';
import '../custom.css';
import { AuthContext } from '../App';

const Home = () => {
	const { state, dispatch } = useContext(AuthContext);
	console.log(state);

	if (state.user) {
		return (
			<div className='main'>
				{state.newUser ? `Welcome, ${state.user.username}` : `Welcome back, ${state.user.username}`}
			</div>
		)
	}

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

export default Home;


function createData(name, calories, fat, carbs, protein, price) {
	return {
		name,
		calories,
		fat,
		carbs,
		protein,
		price,
		history: [
			{
				date: '2020-01-05',
				customerId: '11091700',
				amount: 3,
			},
			{
				date: '2020-01-02',
				customerId: 'Anonymous',
				amount: 1,
			},
		],
	};
}

function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);

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
				<TableCell component="th" scope="row">
					{row.name}
				</TableCell>
				<TableCell align="right">{row.calories}</TableCell>
				<TableCell align="right">{row.fat}</TableCell>
				<TableCell align="right">{row.carbs}</TableCell>
				<TableCell align="right">{row.protein}</TableCell>
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
									{/*{row.history.map((historyRow) => (
					  <TableRow key={historyRow.date}>
						<TableCell component="th" scope="row">
						  {historyRow.date}
						</TableCell>
						<TableCell>{historyRow.customerId}</TableCell>
						<TableCell align="right">{historyRow.amount}</TableCell>
						<TableCell align="right">
						  {Math.round(historyRow.amount * row.price * 100) / 100}
						</TableCell>
					  </TableRow>
					))}*/}
									<TableRow>
										<TableCell></TableCell>
										<TableCell></TableCell>
										<TableCell></TableCell>
										<TableCell align="right">
											<button onClick={() => { }} className="btn btn-dark btn-lg mx-1 my-1">Update</button>
											<button onClick={() => { }} className="btn btn-secondary btn-lg">Delete</button>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
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

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
	createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
	createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
	createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

