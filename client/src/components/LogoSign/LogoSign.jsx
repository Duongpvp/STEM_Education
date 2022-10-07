// @ts-nocheck
import React, { useState } from "react";
import Logo from "../../assets/img/LogoSign.png";
import { Icon } from "@iconify/react";
import "./LogoSign.css";
import { searchUser } from "api/UserRequest";
import User from "components/User/User";
import { useSelector } from "react-redux";

const LogoSign = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const { user } = useSelector((state) => state.AuthReducer.authData);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await searchUser(search);
      setIsLoading(false);
      setSearchResult(data);
    } catch (error) {}
  };
  return (
    <>
      <div className="LogoSign">
        <img src={Logo} alt="Logo Sign" />
        <div className="SearchInput">
          <input
            type="text"
            placeholder="Seach something..."
            onChange={(e) => handleSearch(e.target.value)}
          />

          <div className="s-icon">
            <Icon icon="uil:search"></Icon>
          </div>
        </div>
      </div>
      <div
        className="FollowersCard"
        style={{
          display: search ? "block" : "none",
          position: "absolute",
          padding: "12px",
          width: "300px",
          zIndex: "2",
          background: "rgba( 255, 255, 255, 1 )",
          boxshadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          WebkitBackdropFilter: "blur( 8.5px )",
          backdropfilter: "blur( 8.5px )",
          borderradius: "10px",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
        }}
      >
        {isLoading
          ? "Loading..."
          : searchResult?.slice(0, 5).map((person, id) => {
              if (person._id !== user._id)
                return <User person={person} key={id} />;
            })}
      </div>
    </>
  );
};

export default LogoSign;
