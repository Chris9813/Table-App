import React, { useEffect, useState } from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { deltItem, editTodo } from "../../actions/list";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

export const ListItem = ({ todo }) => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.list);

  const columns = [
    {
      title: "TODO",
      field: "desc",
    },
  ];

  const [data, setData] = useState(todo);

  useEffect(() => {
    setData(todo);
  }, [todo]);

  const styles = useStyles();
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const openCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const [itemSelect, setItemSelect] = useState({
    id: "",
    desc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemSelect((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectItem = (item, cas) => {
    setItemSelect(item);
    cas === "editar" ? openCloseModalEdit() : openCloseModalDelete();
  };

  const editList = () => {
    console.log("aqui estoy");
    dispatch(editTodo(itemSelect));
    openCloseModalEdit();
  };

  const deletItemList = () => {
    console.log("aqui estoy");
    console.log(itemSelect);
    dispatch(deltItem(itemSelect));
    openCloseModalDelete();
  };
  console.log(itemSelect);

  const bodyEdit = (
    <div className={styles.modal}>
      <h3>Edit Item</h3>
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Title"
        name="desc"
        onChange={handleInputChange}
        value={itemSelect && itemSelect.desc}
      />

      <br />
      <div align="right">
        <Button color="primary" onClick={() => editList()}>
          Editar
        </Button>
        <Button onClick={() => openCloseModalEdit()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Estás seguro que deseas eliminar el item:{" "}
        <b>{itemSelect && itemSelect.desc}</b>?
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => deletItemList()}>
          Sí
        </Button>
        <Button onClick={() => openCloseModalDelete()}>No</Button>
      </div>
    </div>
  );

  return (
    <div className="container my-3" style={{ maxWidth: "100%" }}>
      <MaterialTable
        data={todos}
        columns={columns}
        title="TODO Table"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Item",
            onClick: (evento, rowData) => selectItem(rowData, "editar"),
          },
          {
            icon: "delete",
            tooltip: "Delete Item",
            onClick: (evento, rowData) => selectItem(rowData, "eliminar"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />

      <Modal open={modalEdit} onClose={openCloseModalEdit}>
        {bodyEdit}
      </Modal>

      <Modal open={modalDelete} onClose={openCloseModalDelete}>
        {bodyEliminar}
      </Modal>
    </div>
  );
};
