import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LOGOUT_USER } from '../api/backendRequests';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import React, { useContext } from 'react';
import Button from '@mui/material/Button';
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
				<Button sx={{'&:hover': {
						color:"secondary"
					},}} color={"secondary"} href={"/login"} underline="none">Login</Button>
			</>
		)
	} else {
		menu = (
			<Button color={"secondary"} href={"/"} onClick={logout} underline="none">Logout</Button>
		)
	}
	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar position="static">
				<Toolbar>
					<Typography color={"secondary"} variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Button color={"secondary"} to={"/"} underline="none">Home</Button>
					</Typography>
					{menu}
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