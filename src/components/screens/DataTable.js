import axios from "axios";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

export const Table = () => {
  const columns = [
    {
      title: "id",
      field: "id",
    },
    {
      title: "Title",
      field: "title",
    },
    {
      title: "Description",
      field: "body",
    },
    {
      title: "UserId",
      field: "userId",
    },
  ];

  const styles = useStyles();

  const [data, setData] = useState([]);
  const [modalInst, setModalInst] = useState(false);
  const baseurl = "https://jsonplaceholder.typicode.com/posts";

  const openCloseModal = () => {
    setModalInst(!modalInst);
  };

  const getData = async () => {
    await axios.get(baseurl).then((response) => setData(response.data));
  };

  useEffect(() => {
    getData();
  }, []);

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Item</h3>
      <TextField className={styles.inputMaterial} label="Id" name="id" />
      <br />
      <TextField className={styles.inputMaterial} label="Title" name="title" />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Description"
        name="body"
      />
      <TextField
        className={styles.inputMaterial}
        label="userId"
        name="userId"
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary">Insertar</Button>
        <Button onClick={() => openCloseModal()}>Cancelar</Button>
      </div>
    </div>
  );

  console.log(data);

  return (
    <div style={{ maxWidth: "100%" }}>
      <hr />
      <button onClick={() => openCloseModal()}>Insertar item</button>
      <MaterialTable
        data={data}
        columns={columns}
        title="DataTable"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Item",
            onClick: (evento, rowData) => alert("Edit Item" + rowData.title),
          },
          {
            icon: "delete",
            tooltip: "Delete Item",
            onClick: (evento, rowData) => alert("Delete Item" + rowData.title),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
      <Modal open={modalInst} onClose={openCloseModal}>
        {bodyInsertar}
      </Modal>
    </div>
  );
};
