import React from "react";
import { Link } from "react-router-dom";

export default function DogCard({ dog }) {
  return (
    <article className="card">
      <div className="card__media" aria-hidden="true">
        <img
          src={dog.photoUrl || "https://placehold.co/600x400?text=Dog"}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="card__body">
        <h3 className="card__title">{dog.name}</h3>
        <p className="muted">{dog.breed} • {dog.age ?? "N/A"} yrs</p>
        <p className={`status status--${dog.status || "available"}`}>
          {dog.status || "available"}
        </p>
        <div className="card__actions">
          <Link className="btn" to={`/dogs/${dog._id}`}>Details</Link>
          <Link className="btn btn--ghost" to={`/apply/${dog._id}`}>Apply</Link>
        </div>
      </div>
    </article>
  );
}
