import { types } from "../types/types";

const initState = {
  cheking: true,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        checking: false,
        ...action.payload,
      };
    case types.logout:
      return {
        checking: false,
      };
    default:
      return state;
  }
};
