import Constants from '../utilities/Constants';

const headers = {
	jwt: localStorage.getItem('jwt'),
	'Content-Type': 'application/json'
}

const LOGIN_USER = (data, onSuccess, onError) => {
	const login_url = Constants.API_URL_LOGIN_USER;
	// Send a POST request for login user
	fetch(login_url, {
		method: 'POST',
		headers,
		body: JSON.stringify(data.userToLogin)
	})
		.then(response => response.json())
		.then(response => {
			onSuccess(response);
		})
		.catch((error) => {
			onError(error);
		});
}

const REGISTER_USER = (data, onSuccess, onError) => {
	const register_url = Constants.API_URL_REGISTER_USER;
	// Send a POST request for login user
	fetch(register_url, {
		method: 'POST',
		headers,
		body: JSON.stringify(data.userToCreate)
	})
		.then(response => response.json())
		.then(response => {
			onSuccess(response);
		})
		.catch((error) => {
			onError(error);
		});
}

const LOGOUT_USER = (data, onSuccess, onError) => {
	// Get all addresses - GET request
	const logout_url = Constants.API_URL_LOGOUT_USER;
	fetch(logout_url, {
		method: 'POST',
		headers,
	})
		.then(response => response.json())
		.then(response => {
			onSuccess(response);
		})
		.catch((error) => {
			onError(error);;
		});
}

const GET_ALL_ADDRESSES = (data, onSuccess, onError) => {
	const url = Constants.API_URL_GET_ADDRESSES;
	fetch(url, {
		method: 'GET'
	})
		.then(response => response.json())
		.then(response => {
			onSuccess(response);
		})
		.catch((error) => {
			onError(error);
		});
}

const GET_ALL_USERS = (data, onSuccess, onError) => {
	const url = Constants.API_URL_GET_USERS;
	fetch(url, {
		method: 'GET'
	})
		.then(response => response.json())
		.then(response => {
			onSuccess(response);
		})
		.catch((error) => {
			onError(error);
		});
}


export { LOGIN_USER, REGISTER_USER, LOGOUT_USER, GET_ALL_ADDRESSES, GET_ALL_USERS }