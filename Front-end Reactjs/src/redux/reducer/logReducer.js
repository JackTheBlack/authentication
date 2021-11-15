import { LOGOUT, LOGIN } from "../actions/logActions.js";

const initialState = {
  user: {
    log: false,
    user: null,
  },
};

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: {
          log: true,
          user: action.payload,
        },
      };
    case LOGOUT:
      return {
        ...state,
        user: {
          log: false,
          user: null,
        },
      };

    default:
      return state;
  }
};
export default logReducer;
