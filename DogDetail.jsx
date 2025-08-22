import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/client.js";

export default function DogDetail() {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try { setErr(""); setDog(await api.getDog(id)); }
      catch (e) { setErr(e.message || "Failed to load dog"); }
    })();
  }, [id]);

  if (err) return <div role="status" className="error">{err}</div>;
  if (!dog) return <p>Loading…</p>;

  return (
    <article className="detail">
      <img className="detail__img" src={dog.photoUrl || "https://placehold.co/800x500?text=Dog"} alt="" />
      <div className="detail__body">
        <h2>{dog.name}</h2>
        <p className="muted">{dog.breed} • {dog.age ?? "N/A"} yrs</p>
        <p>Status: <strong>{dog.status || "available"}</strong></p>
        <p>{dog.description || "No description provided."}</p>
        <div className="detail__actions">
          <Link className="btn" to={`/apply/${dog._id}`}>Apply to Adopt</Link>
          <Link className="btn btn--ghost" to="/">Back</Link>
        </div>
      </div>
    </article>
  );
}
