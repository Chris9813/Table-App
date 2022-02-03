import React, { useEffect, useState } from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";

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

  const bodyEdit = (
    <div className={styles.modal}>
      <h3>Edit Item</h3>
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Title"
        name="title"
        onChange={handleInputChange}
        value={itemSelect && itemSelect.title}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Description"
        name="body"
        onChange={handleInputChange}
        value={itemSelect && itemSelect.body}
      />
      <TextField
        className={styles.inputMaterial}
        label="userId"
        name="userId"
        onChange={handleInputChange}
        value={itemSelect && itemSelect.userId}
      />

      <br />
      <div align="right">
        <Button color="primary">Editar</Button>
        <Button onClick={() => openCloseModalEdit()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Estás seguro que deseas eliminar el item
        <b>{itemSelect && itemSelect.title}</b>?
      </p>
      <div align="right">
        <Button color="secondary">Sí</Button>
        <Button onClick={() => openCloseModalDelete()}>No</Button>
      </div>
    </div>
  );

  return (
    <div className="container my-3" style={{ maxWidth: "100%" }}>
      <MaterialTable
        data={data}
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
