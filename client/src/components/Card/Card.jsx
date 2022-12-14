import React from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ nameClass, snippet, idClass, img }) => {
  const serverPublicFolder = process.env.REACT_APP_FOLDER;
  return (
    <div className="card">
      <figure className="card__thumb">
        <img src={img ? serverPublicFolder + img : serverPublicFolder + "DefaultBackground.png"} alt="" className="card__image" />
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
