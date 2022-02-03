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
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const baseurl = "https://jsonplaceholder.typicode.com/posts";
  const [itemSelect, setItemSelect] = useState({
    id: 0,
    title: "",
    body: "",
    userId: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemSelect((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const openCloseModal = () => {
    setModalInst(!modalInst);
  };

  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const openCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const getData = async () => {
    await axios.get(baseurl).then((response) => setData(response.data));
  };

  const postData = async () => {
    await axios.post(baseurl, itemSelect).then((response) => {
      setData(data.concat(response.data));
      openCloseModal();
    });
  };

  const putData = async () => {
    await axios
      .put(baseurl + "/" + itemSelect.id, itemSelect)
      .then((response) => {
        let dataNew = data;
        dataNew.map((item) => {
          if (item.id === itemSelect.id) {
            item.title = itemSelect.title;
            item.body = itemSelect.body;
            item.userId = itemSelect.userId;
          }
        });
        setData(dataNew);
        openCloseModalEdit();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteData = async () => {
    await axios
      .delete(baseurl + "/" + itemSelect.id, itemSelect)
      .then((response) => {
        setData(data.filter((item) => item.id !== itemSelect.id));
        openCloseModalDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectItem = (item, cas) => {
    setItemSelect(item);
    cas === "editar" ? openCloseModalEdit() : openCloseModalDelete();
  };

  useEffect(() => {
    getData();
  }, []);

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Item</h3>

      <br />
      <TextField
        className={styles.inputMaterial}
        label="Title"
        name="title"
        onChange={handleInputChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Description"
        name="body"
        onChange={handleInputChange}
      />
      <TextField
        className={styles.inputMaterial}
        label="userId"
        name="userId"
        onChange={handleInputChange}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => postData()}>
          Insertar
        </Button>
        <Button onClick={() => openCloseModal()}>Cancelar</Button>
      </div>
    </div>
  );

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
        <Button color="primary" onClick={() => putData()}>
          Editar
        </Button>
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
        <Button color="secondary" onClick={() => deleteData()}>
          Sí
        </Button>
        <Button onClick={() => openCloseModalDelete()}>No</Button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: "100%" }}>
      <h1>Data Table</h1>
      <hr />
      <button className="btn btn-primary my-3" onClick={() => openCloseModal()}>
        Insert item
      </button>
      <MaterialTable
        data={data}
        columns={columns}
        title="DataTable"
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
      <Modal open={modalInst} onClose={openCloseModal}>
        {bodyInsertar}
      </Modal>

      <Modal open={modalEdit} onClose={openCloseModalEdit}>
        {bodyEdit}
      </Modal>

      <Modal open={modalDelete} onClose={openCloseModalDelete}>
        {bodyEliminar}
      </Modal>
    </div>
  );
};
