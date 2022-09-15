import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LOGOUT_USER } from '../api/backendRequests';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { AuthContext } from '../App';




export default function Nav() {
	const { state, dispatch } = useContext(AuthContext);
	// Log out function
	function logout() {
		LOGOUT_USER({},
			(response) => {
				if (!response) {
					throw new Error(response.message);
				}
				dispatch({
					type: "LOGOUT",
					payload: {}
				});
			},
			(error) => {
				console.log(error);
				alert(error);
			})
	}

	let menu;
	if (!state.user) {
		menu = (
			<>
				<Stack spacing={2} direction="row">
					<Link href={"/login"} underline="none">Login</Link>
				</Stack>
			</>
		)
	} else {
		menu = (
			<Link href={"/"} onClick={logout} underline="none">Log Out</Link>
		)
	}
	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar position="static">
				<Toolbar>
					<Typography color={"secondary"} variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link to={"/"} underline="none">Home</Link>
					</Typography>
					<Button color="inherit">{menu}</Button>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

const darkTheme = createTheme({
	palette: {
		mode: 'dark',

	},
});