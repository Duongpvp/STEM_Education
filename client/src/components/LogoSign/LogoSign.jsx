// @ts-nocheck
import React, { useEffect, useState } from "react";
import Logo from "../../assets/img/LogoSign.png";
import { Icon } from "@iconify/react";
import "./LogoSign.css";
import { searchUser } from "api/UserRequest";
import User from "components/User/User";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
      const { data } = await searchUser(query);
      setIsLoading(false);
      setSearchResult(data);
    } catch (error) {}
  };

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  };

  const { height, width } = useWindowDimensions();

  return (
    <>
      <div className="LogoSign">
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`../media`}
        >
          <img src={Logo} alt="Logo Sign" />
        </Link>
        
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
