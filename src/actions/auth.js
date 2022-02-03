import { types } from "../types/types";

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

export const startCheking = (uid, name) => {
  return async (dispatch) => {
    const data = {
      name: name,
      uid: uid,
    };
    localStorage.setItem("token", data.uid);
    dispatch(
      login({
        uid: data.uid,
        name: data.name,
      })
    );
  };
};

export const login = (uid, displayname) => ({
  type: types.login,
  payload: {
    uid,
    displayname,
  },
});

export const logout = () => ({
  type: types.logout,
});
