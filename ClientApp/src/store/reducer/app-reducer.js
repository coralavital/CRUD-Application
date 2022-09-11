export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        user: action.payload.user
        
        
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
    
    default:
      return state;
  }
};