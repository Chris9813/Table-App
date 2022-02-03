import { types } from "../types/types";

const initialState = {
  todos: [],
};

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.edit:
      return {
        /*
        ...state,
        todos: state.todos.map((e) =>
          e.tableData.id === action.payload.event.tableData.id
            ? action.payload.event.desc
            : e
        ),
        */
      };
    case types.delete:
      return {};

    case types.add:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    default:
      return state;
  }
};
