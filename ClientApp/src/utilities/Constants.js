// Local host port
const API_BASE_URL_DEVELOPMENT = 'https://localhost:7007';

// Endpoints
const ENDPOINTS = {
	REGISTER_USER: 'api/register',
	LOGIN_USER: 'api/login',
	GET_CURRENT_USER: 'api/currentUser',
	LOGOUT_USER: 'api/logout',
	GET_USERS: 'api/getAllUsers',
	DELETE_USER: 'api/deleteUser',
	UPDATE_USER: 'api/updateUser',
	GET_ADDRESSES: 'api/getAddresses',
};

// Development
const development = {
	API_URL_REGISTER_USER: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.REGISTER_USER}`,
	API_URL_LOGIN_USER: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.LOGIN_USER}`,
	API_URL_GET_CURRENT_USER: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_CURRENT_USER}`,
	API_URL_LOGOUT_USER: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.LOGOUT_USER}`,
	API_URL_GET_USERS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_USERS}`,
	API_URL_DELETE_USER: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.DELETE_USER}`,
	API_URL_UPDATE_USER: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.UPDATE_USER}`,
	API_URL_GET_ADDRESSES: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_ADDRESSES}`
};


const Constants = development;

export default Constants;
