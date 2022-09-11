import React from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ nameClass, snippet, idClass }) => {
  return (
    <div className="card">
      <figure className="card__thumb">
        <img
          src="https://img5.thuthuatphanmem.vn/uploads/2021/12/09/anh-saitama-cuc-dep_090846311.png"
          alt=""
          className="card__image"
        />
        <figcaption className="card__caption">
          <h2 className="card__title">{nameClass}</h2>
          <p className="card__snippet">{snippet}</p>
          <div className="card__button">
            <Link to={`./${idClass}/`}>Read more</Link>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default memo(Card);
