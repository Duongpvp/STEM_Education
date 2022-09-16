// @ts-nocheck
import { getAllClass } from "api/ClassRequest";
import Card from "components/Card/Card";
import UserCard from "components/UserCard/UserCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ClassManagementBody.css";

const ClassManagementBody = () => {
  const { user } = useSelector((state) => state.AuthReducer.authData);

  const [classroom, setClassroom] = useState([]);

  const fetchAllClass = async () => {
    try {
      const { data } = await getAllClass(user._id);
      setClassroom(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllClass();
  }, []);


  return (
    <div className="class-management-body">
      <div className="user-management-card">
        <UserCard />
        <div className="class-list-container">
          <div className="class-list-title">Your class list</div>
          <div className="class-list">
            {classroom.map((room) => (
              <Card
                key={room._id}
                nameClass={room.className}
                snippet={room.snippet}
                idClass={room._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassManagementBody;
