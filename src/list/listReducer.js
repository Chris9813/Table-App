import { types } from "../types/types";

const initialState = {
  todos: [],
};

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.edit:
      return {
        ...state,
        todos: state.todos.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case types.delete:
      return {
        ...state,
        todos: state.todos.filter((e) => e.id !== action.payload.id),
      };

    case types.add:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    default:
      return state;
  }
};
