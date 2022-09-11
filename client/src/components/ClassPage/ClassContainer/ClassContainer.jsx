// @ts-nocheck
import { getAllClass } from "api/ClassRequest";
import Card from "components/Card/Card";
import SideBarMotion from "components/SideBarMotion/SideBarMotion";
import UserCard from "components/UserCard/UserCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ClassContainer.css";

const ClassContainer = () => {
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
    <div className="class-container">
      <SideBarMotion />
      <div className="body-container">
        <div className="user-class-container">
          <UserCard />
        </div>
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

export default ClassContainer;
