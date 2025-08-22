import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";

export default function DogFilters({ onChange, initial = {} }) {
  const [q, setQ] = useState(initial.q || "");
  const [status, setStatus] = useState(initial.status || "");
  const [breed, setBreed] = useState(initial.breed || "");
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    (async () => {
      const list = await api.getBreeds();
      setBreeds(list || []);
    })();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    onChange({ q, status, breed });
  };

  const clear = () => {
    setQ(""); setStatus(""); setBreed("");
    onChange({ q: "", status: "", breed: "" });
  };

  return (
    <form className="filters" onSubmit={submit}>
      <input
        className="input"
        placeholder="Search by name/notes…"
        value={q} onChange={(e) => setQ(e.target.value)}
        aria-label="Search"
      />
      <select className="input" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
        <option value="">Any status</option>
        <option value="available">Available</option>
        <option value="pending">Pending</option>
        <option value="adopted">Adopted</option>
      </select>
      <select className="input" value={breed} onChange={(e) => setBreed(e.target.value)} aria-label="Breed">
        <option value="">Any breed</option>
        {breeds.map(b => <option key={b} value={b}>{b}</option>)}
      </select>
      <button className="btn" type="submit">Apply</button>
      <button className="btn btn--ghost" type="button" onClick={clear}>Reset</button>
    </form>
  );
}
