import React from "react";
import { memo } from "react";
import "./Card.css";

const Card = () => {
  return (
    <div className="card">
      <figure className="card__thumb">
        <img
          src="https://source.unsplash.com/75S9fpDJVdo/300x510"
          alt=""
          className="card__image"
        />
        <figcaption className="card__caption">
          <h2 className="card__title">
            NASA Has Found Hundreds Of Potential New Planets
          </h2>
          <p className="card__snippet">
            NASA released a list of 219 new “planet candidates” discovered by
            the Kepler space telescope, 10 of which are similar to Earth’s size
            and may be habitable by other life forms.
          </p>
          <div className="card__button">Read more</div>
        </figcaption>
      </figure>
    </div>
  );
};

export default memo(Card);
