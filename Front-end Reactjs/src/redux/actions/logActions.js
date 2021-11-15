export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (userName) => {
  return {
    type: LOGIN,
    payload: userName,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
