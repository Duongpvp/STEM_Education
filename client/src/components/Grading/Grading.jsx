// @ts-nocheck
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { gradingExercise } from "actions/ExerciseAction";
import { fetchAllExercises } from "api/ExerciseRequest";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Grading.css";

const Grading = () => {
  const serverPublicFiles = process.env.REACT_APP_FILES;
  const params = useParams();
  const dispatch = useDispatch();
  const [grade, setGrade] = useState(null);
  const [exerciseData, setExerciseData] = useState();
  const [details, setDetails] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);

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
  }, [fetchAgain]);

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

  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(5);
  const indexOfLast = rowPerPage * currentPage;
  const indexOfFist = indexOfLast - rowPerPage;
  const renderRow = rows.slice(indexOfFist, indexOfLast);

  const handleChange = (e, id, eid) => {
    const data = parseFloat(e.target.value);
    details[id] = { id: eid, grade: data };
    setGrade({ id: eid, grade: data });
    if (data < 0 || data > 10) {
      toast.warn("The score must be from 0 to 10 !")
    }
  };

  const handleEnter = async (e, exerciseId) => {
    if (e.key === "Enter") {
      try {
        dispatch(gradingExercise(exerciseId, grade));
        setFetchAgain(!fetchAgain);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSave = () => {
    setDetails(details);
    try {
      details.map((rq) => {
        dispatch(gradingExercise(rq.id, rq.grade, setFetchAgain, fetchAgain));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
    console.log(renderRow);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    console.log(renderRow);
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
            {renderRow.map((row, index) => (
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
                        {file.slice(18, -1)}
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
        <div className="btn-left">
          <button className="save-details" onClick={handleSave}>
            Save Details
          </button>
          <CSVLink {...csvReport}>Export to CSV</CSVLink>
        </div>
        <div className="btn-right">
          <button onClick={handlePrev}>Prev</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Grading;
