// @ts-nocheck
import { Modal } from "@mantine/core";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { deletedUser, editRoleUser, searchUser } from "api/UserRequest";
import ProfileCard from "components/ProfileCard/ProfileCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./UserGrid.css";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import CreateUserByAdmin from "../CreateUserByAdmin/CreateUserByAdmin";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";

const UserGrid = () => {
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
        <GridToolbarFilterButton />
        <CreateUserByAdmin
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
        />
      </GridToolbarContainer>
    );
  };

  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [userData, setUserData] = useState();
  const [seeOpened, setSeeOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await searchUser("");
      setUserData(data);
    };
    getAllUsers();
  }, [fetchAgain]);

  const rows = [];

  for (var i = 0; i < userData?.length; i++) {
    rows.push({
      id: i,
      uid: userData[i]._id,
      username: userData[i].username,
      firstname: userData[i].firstname,
      lastname: userData[i].lastname,
      createdAt: moment(userData[i].createdAt).format(
        "MMMM Do YYYY, h:mm:ss a"
      ),
      updatedAt: moment(userData[i].updatedAt).format(
        "MMMM Do YYYY, h:mm:ss a"
      ),
      following: userData[i].following,
      followers: userData[i].followers,
      coverPicture: userData[i].coverPicture,
      profilePicture: userData[i].profilePicture,
      role: userData[i].isAdmin
        ? "Admin"
        : userData[i].isTeacher
        ? "Teacher"
        : "Student",
    });
  }

  const handleSeeClick = (e, cellValues) => {
    setSeeOpened(true);
    setCurrentUser(cellValues.row);
  };

  const handleEditClick = (e, cellValues) => {
    setCurrentUser(cellValues.row);
    setEditOpened(true);
  };

  const handleDeleteClick = (e, cellValues) => {
    setDeleteOpened(true);
    setCurrentUser(cellValues.row);
  };

  const handleDelete = async () => {
    if (currentUser?.role === "Admin" && currentUser?.uid !== user._id) {
      toast.error(
        "You do not have permission to delete another admin's account!"
      );
    } else {
      try {
        const { data } = await deletedUser(
          currentUser.uid,
          user._id,
          user.isAdmin
        );
        if (!data) {
          toast.error("Failed to delete user");
        } else {
          toast.success("Deleted user successfully");
          setFetchAgain(!fetchAgain);
          setDeleteOpened(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRole = async (e) => {
    try {
      await editRoleUser(currentUser.uid, e.target.value);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 30, editable: false },
    { field: "username", headerName: "User_Name", width: 220, editable: false },
    {
      field: "firstname",
      headerName: "First_Name",
      width: 150,
      editable: false,
    },
    { field: "lastname", headerName: "Last_Name", width: 150, editable: false },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 240,
      editable: false,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 240,
      editable: false,
    },
    {
      field: "role",
      headerName: "Role",
      width: 80,
      editable: false,
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

  return (
    <>
      <ToastContainer />
      <Modal
        transition="fade"
        transitionDuration={600}
        opened={seeOpened}
        onClose={() => setSeeOpened(false)}
      >
        <ProfileCard user={currentUser} location={"admin"} />
      </Modal>

      <Modal
        transition="fade"
        transitionDuration={600}
        opened={editOpened}
        onClose={() => setEditOpened(false)}
      >
        <TextField
          fullWidth
          disabled
          id="outlined-disabled"
          label="Username"
          defaultValue={currentUser?.username}
          style={{ marginBottom: "20px" }}
        />

        <TextField
          fullWidth
          disabled
          id="outlined-disabled"
          label="Fullname"
          defaultValue={currentUser?.firstname + " " + currentUser?.lastname}
          style={{ marginBottom: "20px" }}
        />

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
          <RadioGroup
            defaultValue={currentUser?.role}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleRole}
          >
            <FormControlLabel
              disabled={
                currentUser?.role === "Admin" && currentUser.uid !== user._id
              }
              value="Admin"
              control={<Radio />}
              label="Admin"
            />
            <FormControlLabel
              value="Teacher"
              control={<Radio />}
              label="Teacher"
            />
            <FormControlLabel
              value="Student"
              control={<Radio />}
              label="Student"
            />
          </RadioGroup>
        </FormControl>
      </Modal>

      <Modal
        transition="fade"
        transitionDuration={600}
        opened={deleteOpened}
        onClose={() => setDeleteOpened(false)}
        centered
      >
        <div className="delete-group">
          <span>Are you sure you want to delete this user?</span>
          <div className="btn-delete-group">
            <button className="bttn btn-confirm" onClick={handleDelete}>
              DELETE
            </button>
            <button
              className="bttn btn-cancel"
              onClick={() => setDeleteOpened(false)}
            >
              CANCEL
            </button>
          </div>
        </div>
      </Modal>

      {rows && (
        <div style={{ height: 700, width: "100%" }}>
          <DataGrid
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rows={rows}
            columns={columns}
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </div>
      )}
    </>
  );
};

export default UserGrid;
