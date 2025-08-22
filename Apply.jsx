import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../api/client.js";
import Toast from "../components/Toast.jsx";

export default function Apply() {
  const { id } = useParams(); // dog id
  const nav = useNavigate();

  const [form, setForm] = useState({
    dogId: id,
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => setForm((f) => ({ ...f, dogId: id })), [id]);

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setToast("");
    try {
      await api.createApplication(form);
      setToast("Application submitted. We’ll be in touch!");
      setTimeout(() => nav(`/dogs/${id}`), 900);
    } catch (err) {
      setToast(err.message || "Failed to submit application");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="apply">
      <h2>Adoption Application</h2>
      <form className="form" onSubmit={submit}>
        <label>
          Full Name
          <input className="input" required value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})}/>
        </label>
        <label>
          Email
          <input className="input" type="email" required value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})}/>
        </label>
        <label>
          Phone
          <input className="input" type="tel" required value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})}/>
        </label>
        <label>
          Notes
          <textarea className="input" rows="4" value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})}/>
        </label>

        <div className="row">
          <button className="btn" disabled={busy} type="submit">{busy ? "Submitting…" : "Submit"}</button>
          <Link className="btn btn--ghost" to={`/dogs/${id}`}>Cancel</Link>
        </div>
      </form>
      <Toast message={toast} onClose={()=>setToast("")} />
    </section>
  );
}
