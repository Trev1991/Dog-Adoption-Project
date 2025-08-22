import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";
import DogCard from "../components/DogCard.jsx";
import DogFilters from "../components/DogFilters.jsx";
import Pager from "../components/Pager.jsx";

export default function Dogs() {
  const [dogs, setDogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 12;

  const [filters, setFilters] = useState({ q: "", status: "", breed: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function load() {
    try {
      setLoading(true); setErr("");
      const data = await api.listDogs({ page, limit, ...filters });
      if (Array.isArray(data)) {
        setDogs(data); setTotal(data.length);
      } else {
        setDogs(data.items ?? data.results ?? []);
        setTotal(data.total ?? 0);
      }
    } catch (e) {
      setErr(e.message || "Failed to load dogs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [page, filters.q, filters.status, filters.breed]);

  return (
    <section>
      <DogFilters onChange={(f) => { setPage(1); setFilters(f); }} initial={filters} />
      {err && <div role="status" className="error">{err}</div>}
      {loading ? <p>Loading…</p> : (
        <>
          <div className="grid">
            {dogs.map(d => <DogCard key={d._id} dog={d} />)}
          </div>
          <Pager page={page} total={total} limit={limit} onPage={setPage} />
        </>
      )}
    </section>
  );
}
