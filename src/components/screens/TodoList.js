import React, { useEffect, useState } from "react";
import { ListItem } from "./ListItem";

export const TodoList = () => {
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

  const [formValues, handleInputChange] = useForm({
    name: "",
  });

  const { name } = formValues;

  const itemTodo = {
    id: new Date(),
    desc: name,
  };

  console.log(todo);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }
    settodo([...todo, itemTodo]);
    console.log(formValues);
  };

  return (
    <div>
      <form className="form-group" onSubmit={handleSubmit}>
        <h1>FormWithCustomHook</h1>
        <hr />

        <div>
          <input
            type="text"
            name="name"
            placeholder="tu nombre"
            autoComplete="off"
            className="form-control"
            value={name}
            onChange={handleInputChange}
          ></input>
        </div>

        <button type="submit" className="btn btn-primary">
          submit
        </button>
      </form>
      <ul>
        <ListItem todo={todo} />
      </ul>
    </div>
  );
};
