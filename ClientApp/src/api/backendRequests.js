import Constants from '../utilities/Constants';

const defaultOptions = () => {
  return ({
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("Authorization"),
      'Content-Type': 'application/json'
    }
  })
};

const LOGIN_USER = (data, onSuccess, onError) => {
	const login_url = Constants.API_URL_LOGIN_USER;
	// Send a POST request for login user
	fetch(login_url, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data.userToLogin),
    ...defaultOptions(),
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
		...defaultOptions(),
		credentials: 'include',
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
  console.log(defaultOptions())
	const url = Constants.API_URL_GET_USERS;
		fetch(url, {
			method: 'GET',
			withCredentials: true,
			credentials: 'include',
			...defaultOptions(),
		})
			.then(response => response.json())
			.then(response => {
				onSuccess(response);
			})
			.catch((error) => {
				onError(error);
			});
}

const DELETE_USER = (data, onSuccess, onError) => {
	const delete_url = `${Constants.API_URL_DELETE_USER}?id=${data.row.id}`;
	fetch(delete_url, {
		method: 'DELETE',
		withCredentials: true,
		credentials: 'include',
		...defaultOptions(),
	})
		.then(response => response.json())
		.then(response => {
			onSuccess(response);
		})
		.catch((error) => {
			onError(error);
		});

}

const UPDATE_USER = (data, onSuccess, onError) => {
	const url = Constants.API_URL_UPDATE_USER;
	fetch(url, {
		method: 'PUT',
		withCredentials: true,
		credentials: 'include',
		...defaultOptions(),
		body: JSON.stringify(data.userToUpdate)
	})
		.then(response => response.json())
		.then(response => {
			onSuccess(response);
		})
		.catch((error) => {
			onError(error);
		});
}


export { LOGIN_USER, REGISTER_USER, LOGOUT_USER, GET_ALL_USERS, DELETE_USER, UPDATE_USER }