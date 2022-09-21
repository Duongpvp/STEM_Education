// @ts-nocheck
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { gradingExercise } from "actions/ExerciseAction";
import { fetchAllExercises } from "api/ExerciseRequest";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./Grading.css";

const Grading = () => {
  const serverPublicFiles = process.env.REACT_APP_FILES;
  const params = useParams();
  const dispatch = useDispatch();
  const [grade, setGrade] = useState(null);
  const [exerciseData, setExerciseData] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [details, setDetails] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const { data } = await fetchAllExercises(params.eid);
        setExerciseData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExercises();
  }, []);

  const rows = [];

  for (var i = 0; i < exerciseData?.length; i++) {
    rows.push({
      id: i,
      eid: exerciseData[i]._id,
      sender: exerciseData[i].sender.username,
      files: exerciseData[i].files,
      grade: exerciseData[i].grade,
    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (e, id, eid) => {
    const data = parseFloat(e.target.value);
    details[id] = { id: eid, grade: data };
    setGrade({ id: eid, grade: data });
  };

  const handleEnter = async (e, exerciseId) => {
    if (e.key === "Enter") {
      try {
        dispatch(gradingExercise(exerciseId, grade));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSave = () => {
    setDetails(details);
    try {
      details.map((rq) => {
        dispatch(gradingExercise(rq.id, rq.grade));
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const headerCSV = [
    { label: "ID", key: "id" },
    { label: "SENDER", key: "sender" },
    { label: "FILES", key: "files" },
    { label: "GRADE", key: "grade" },
  ];

  const dataCSV = rows;

  const csvReport = {
    data: dataCSV,
    headers: headerCSV,
    filename: "STEM_Exercise_Report.csv",
  };

  return (
    <div style={{ height: 300, width: "100%", marginTop: "32px" }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">SENDER</TableCell>
              <TableCell align="center">FILES</TableCell>
              <TableCell align="center">GRADE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.sender}</TableCell>
                <TableCell sx={{ width: 800 }}>
                  {row.files.map((file, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        width: "320px",
                      }}
                    >
                      <a
                        href={serverPublicFiles + file}
                        target="_blank"
                        className="link-file"
                      >
                        {file.slice(18,-1)}
                      </a>
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <div className="custom-num">
                    <input
                      type="number"
                      className="num-input"
                      min={-1}
                      max={-1}
                      data-color="#21d9b"
                      onChange={(e) => handleChange(e, row.id, row.eid)}
                      onKeyDown={(e) => handleEnter(e, row.eid)}
                    />
                    <span>{details && exerciseData[row.id].grade}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="fea-btn">
        <button className="save-details" onClick={handleSave}>
          Save Details
        </button>
        <CSVLink {...csvReport}>Export to CSV</CSVLink>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Grading;
