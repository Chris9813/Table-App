import { types } from "../types/types";

export const deltItem = (event) => ({
  type: types.delete,
  payload: {
    event,
  },
});

export const editTodo = (event) => ({
  type: types.edit,
  payload: {
    event,
  },
});

export const listAdd = (event) => ({
  type: types.add,
  payload: event,
});
