// Reducer for keep app state
export const reducer = (state, action) => {
	switch (action.type) {
	  case "LOGIN": {
		localStorage.setItem("jwt", action.payload.token);
		return {
		  ...state,
		  user: action.payload.user
		};
	  }
	  case "REGISTER": {
		localStorage.setItem("jwt", action.payload.token);
		  return {
		  ...state,
		  user: action.payload.user,
		  newUser: true
		};
	  }
	  case "LOGOUT": {
		localStorage.removeItem("jwt");
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