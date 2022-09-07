// @ts-nocheck
import NavigationMenu from "components/NavigationMenu/NavigationMenu";
import { Personnel } from "Data/Personnel";
import React from "react";
import "./DeanBoard.css";

const DeanBoard = () => {
  return (
    <div className="about-background">
      <div className="nav-top-right-menu">
        <NavigationMenu />
      </div>
      <h2 className="about-title">DEAN BOARD</h2>
      <div className="card__collection clear-fix">
        {Personnel.map((user) =>
          user.sex === "Female" ? (
            <div className="cards cards--two" key={user.id}>
              <img src={user.imgLink} alt="" className="img-responsive" />
              <span className="cards--two__rect"></span>
              <span className="cards--two__tri"></span>
              <p>{user.name}</p>
              <ul className="cards__list">
                <li>
                  <i className="fab fa-facebook-f"></i>
                </li>
                <li>
                  <i className="fab fa-twitter"></i>
                </li>
                <li>
                  <i className="fab fa-instagram"></i>
                </li>
                <li>
                  <i className="fab fa-linkedin-in"></i>
                </li>
              </ul>
            </div>
          ) : (
            <div className="cards cards--three" key={user.id}>
              <img src={user.imgLink} alt="" className="img-responsive" />
              <span className="cards--three__rect-1">
                <span className="shadow-1"></span>
                <p>{user.name}</p>
              </span>
              <span className="cards--three__rect-2">
                <span className="shadow-2"></span>
              </span>
              <span className="cards--three__circle"></span>
              <ul className="cards--three__list">
                <li>
                  <i className="fab fa-facebook-f"></i>
                </li>
                <li>
                  <i className="fab fa-twitter"></i>
                </li>
                <li>
                  <i className="fab fa-linkedin-in"></i>
                </li>
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DeanBoard;
