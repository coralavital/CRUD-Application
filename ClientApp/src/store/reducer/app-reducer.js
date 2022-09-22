// Reducer for keep app state
export const reducer = (state, action) => {
	switch (action.type) {
	  case "LOGIN": {
		return {
		  ...state,
		  user: action.payload.user,
		  token: action.payload.token
		};
	  }
	  case "REGISTER": {
		  return {
		  ...state,
		  user: action.payload.user,
		  newUser: true
		};
	  }
	  case "LOGOUT": {
		  return {
		  ...state,
		  user: undefined
		};
	  }
  
	  case "UPDATE": {
		  return {
		  ...state,
		  user: action.payload.user,
		};
	  }
  
	  case "GET_ACTIVE_USER": {
		  return {
		  ...state,
		  user: action.payload.user,
		};
	  }
	  
	  default:
		return state;
	}
  };