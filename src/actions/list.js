import axios from "axios";
import { types } from "../types/types";

export const deltItem = (event) => ({
  type: types.delete,
  payload: event,
});

export const editTodo = (event) => ({
  type: types.edit,
  payload: event,
});

export const listAdd = (event) => ({
  type: types.add,
  payload: event,
});

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    try {
      const baseurl = "https://jsonplaceholder.typicode.com/posts";
      const resp = await axios.post(baseurl, event);
      const body = await resp.json();

      if (body.ok) {
        event.id = body.evento.id;
        console.log(event);
        dispatch(listAdd(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
