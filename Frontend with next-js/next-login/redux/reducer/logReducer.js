import { LOGOUT, LOGIN } from "../actions/logActions.js";

const initialState = {
  user: {
    log: false,
    userName: null,
    email: null,
    password: null,
  },
};

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: {
          log: true,
          userName: action.payload.userName,
          email: action.payload.email,
        },
      };
    case LOGOUT:
      return {
        ...state,
        user: {
          log: false,
          userName: null,
          email: null,
          password: null,
        },
      };

    default:
      return state;
  }
};
export default logReducer;
