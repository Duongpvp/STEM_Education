// @ts-nocheck
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { searchUser } from "api/UserRequest";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import "./UserGrid.css";
import { Modal } from "@mantine/core";

const UserGrid = () => {
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  const [userData, setUserData] = useState();
  const [seeOpened, setSeeOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await searchUser("");
      setUserData(data);
    };
    getAllUsers();
  }, []);

  const handleSeeClick = (e, cellValues) => {
    setSeeOpened(true);
  };

  const handleEditClick = (e, cellValues) => {
    setEditOpened(true);
  };

  const handleDeleteClick = (e, cellValues) => {
    setDeleteOpened(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80, editable: true },
    { field: "username", headerName: "User_Name", width: 280, editable: true },
    {
      field: "firstname",
      headerName: "First_Name",
      width: 160,
      editable: true,
    },
    { field: "lastname", headerName: "Last_Name", width: 160, editable: true },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 220,
      editable: true,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 220,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <>
            <button
              className="row-btn"
              onClick={(event) => {
                handleSeeClick(event, cellValues);
              }}
            >
              <RemoveRedEyeIcon className="see-icon" />
            </button>
            <button
              className="row-btn"
              onClick={(event) => {
                handleEditClick(event, cellValues);
              }}
            >
              <EditIcon className="edit-icon" />
            </button>
            <button
              className="row-btn"
              onClick={(event) => {
                handleDeleteClick(event, cellValues);
              }}
            >
              <DeleteIcon className="delete-icon" />
            </button>
          </>
        );
      },
    },
  ];

  const rows = [];

  for (var i = 0; i < userData?.length; i++) {
    rows.push({
      id: i,
      username: userData[i].username,
      firstname: userData[i].firstname,
      lastname: userData[i].lastname,
      createdAt: userData[i].createdAt,
      updatedAt: userData[i].updatedAt,
    });
  }

  console.log(rows);

  return (
    <>
      <Modal
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={seeOpened}
        onClose={() => setSeeOpened(false)}
      >
        See
      </Modal>

      <Modal
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={editOpened}
        onClose={() => setEditOpened(false)}
      >
        Edit
      </Modal>

      <Modal
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={deleteOpened}
        onClose={() => setDeleteOpened(false)}
      >
        Delete
      </Modal>

      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </>
  );
};

export default UserGrid;
