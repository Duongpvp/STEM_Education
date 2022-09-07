//@ts-nocheck
import React, { useEffect, useState } from "react";
import "./FollowCard.css";
import User from "components/User/User";
import { useSelector } from "react-redux";
import { getAllUser } from "api/UserRequest";

const FollowCard = () => {
  const [persons, setPerson] = useState([]);
  const { user } = useSelector((state) => state.AuthReducer.authData);

  useEffect(() => {
    const fetchPerson = async () => {
      const { data } = await getAllUser();
      setPerson(data);
    };
    fetchPerson();
  }, []);

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      {persons.map((person, id) => {
        if (person._id !== user._id) return <User person={person} key={id} />;
      })}
    </div>
  );
};

export default FollowCard;
