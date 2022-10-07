// @ts-nocheck
import { Modal } from "@mantine/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { deleteClass } from "actions/ClassAction";
import { fetchAllClass } from "api/ClassRequest";
import moment from "moment/moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import AdminClassCard from "../AdminClassCard/AdminClassCard";
import ClassOverView from "../ClassOverView/ClassOverView";
import CreateClassByAdmin from "../CreateClassByAdmin/CreateClassByAdmin";
import TabPanel from "../TabPanel/TabPanel";
import UserOverview from "../UserOverview/UserOverview";
import "./ClassGrid.css";

const ClassGrid = () => {
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
        <CreateClassByAdmin
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
        />
      </GridToolbarContainer>
    );
  };

  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [classData, setClassData] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [seeOpened, setSeeOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);
  const [currentData, setCurrentData] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer.authData);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await fetchAllClass();
      setClassData(data);
    };
    getAllUsers();
  }, [fetchAgain]);

  const handleSeeClick = (e, cellValues) => {
    setSeeOpened(true);
    setCurrentData(cellValues.row);
  };

  const handleEditClick = (e, cellValues) => {
    setEditOpened(true);
    setCurrentData(cellValues.row);
  };

  const handleDeleteClick = (e, cellValues) => {
    setDeleteOpened(true);
    setCurrentData(cellValues.row);
  };

  const deleteClassHandler = () => {
    try {
      dispatch(deleteClass(currentData.cid, user._id, user.isAdmin));
      toast.success("Updated class successfully");
      setDeleteOpened(false);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 30, editable: false },
    {
      field: "className",
      headerName: "Class Name",
      width: 190,
      editable: false,
    },
    {
      field: "classAdmin",
      headerName: "Class Admin",
      width: 120,
      editable: false,
    },
    {
      field: "snippet",
      headerName: "Description",
      width: 240,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 220,
      editable: false,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 220,
      editable: false,
    },
    {
      field: "code",
      headerName: "Code",
      width: 100,
      editable: false,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      editable: false,
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

  for (var i = 0; i < classData?.length; i++) {
    rows.push({
      id: i,
      cid: classData[i]._id,
      className: classData[i].className,
      classAdmin:  classData[i].classAdmin.map((admin) => admin.username),
      snippet: classData[i].snippet,
      createdAt: moment(classData[i].createdAt).format(
        "MMMM Do YYYY, h:mm:ss a"
      ),
      updatedAt: moment(classData[i].updatedAt).format(
        "MMMM Do YYYY, h:mm:ss a"
      ),
      code: classData[i].code,
      adminFull: classData[i].classAdmin.map((admin) => admin),
      users: classData[i].users,
    });
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <ToastContainer />
      <Modal
        transition="fade"
        transitionDuration={600}
        opened={seeOpened}
        onClose={() => setSeeOpened(false)}
      >
        <AdminClassCard classData={currentData} />
      </Modal>
      <Modal
        transition="fade"
        transitionDuration={600}
        opened={editOpened}
        onClose={() => setEditOpened(false)}
        size="50%"
      >
        <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab
                style={{ backgroundColor: "#fff", color: "#333" }}
                label="Overview"
                {...a11yProps(0)}
              />
              <Tab
                style={{ backgroundColor: "#fff", color: "#333" }}
                label="Users"
                {...a11yProps(1)}
              />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0} dir={theme.direction}>
            <ClassOverView currentData={currentData} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <UserOverview currentData={currentData} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </TabPanel>
        </Box>
      </Modal>
      <Modal
        transition="fade"
        transitionDuration={600}
        opened={deleteOpened}
        onClose={() => setDeleteOpened(false)}
      >
        <div className="delete-group">
          <span>Are you sure you want to delete this class?</span>
          <div className="btn-delete-group">
            <button className="bttn btn-confirm" onClick={deleteClassHandler}>
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
    </div>
  );
};

export default ClassGrid;
