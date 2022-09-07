// @ts-nocheck
import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import "./InfoCard.css";
import ProfileModal from "../ProfileModal/ProfileModal.jsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest";
import { logOut } from "actions/AuthAction";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className="InfoCard">
      <div className="InforHead">
        <h4>YOUR INFORMATION</h4>
        {user._id === profileUserId ? (
          <div>
            <Icon icon="bi:pen" onClick={() => setModalOpened(true)} />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="Infor">
        <span>
          <b>Status: </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="Infor">
        <span>
          <b>Live in: </b>
        </span>
        <span>{profileUser.livein}</span>
      </div>
      <div className="Infor">
        <span>
          <b>Work at: </b>
        </span>
        <span>{profileUser.workAt}</span>
      </div>
      <button
        style={{ cursor: "pointer" }}
        className="btn Logout-btn"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
};

export default InfoCard;
