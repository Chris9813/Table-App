import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { listAdd } from "../../actions/list";

import { ListItem } from "./ListItem";

export const TodoList = () => {
  const dispatch = useDispatch();
  const initialState = [];
  const [todo, settodo] = useState(initialState);

  const useForm = (initialState = []) => {
    const [values, setvalues] = useState(initialState);
    const reset = () => {
      setvalues(initialState);
    };
    const handleInnputChange = ({ target }) => {
      setvalues({
        ...values,
        [target.name]: target.value,
      });
    };

    return [values, handleInnputChange, reset];
  };

  const [formValues, handleInputChange, reset] = useForm({
    desc: "",
  });

  const { desc } = formValues;

  const itemTodo = {
    id: new Date(),
    desc: desc,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (desc.length === 0) {
      return;
    }
    console.log(itemTodo);
    settodo([...todo, itemTodo]);
    dispatch(listAdd(itemTodo));
    reset();
  };

  return (
    <div>
      <form className="form-group" onSubmit={handleSubmit}>
        <h1>TODO List</h1>
        <hr />

        <div>
          <input
            type="text"
            name="desc"
            placeholder="tu nombre"
            autoComplete="off"
            className="form-control"
            value={desc}
            onChange={handleInputChange}
          ></input>
        </div>

        <button type="submit" className="btn btn-primary my-2">
          submit
        </button>
      </form>
      <ul>
        <ListItem todo={todo} />
      </ul>
    </div>
  );
};
