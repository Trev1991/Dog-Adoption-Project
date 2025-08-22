import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="shell">
      <header className="topbar">
        <h1>Dog Adoption</h1>
        <nav>
          <NavLink to="/" className="link">Dogs</NavLink>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="footer">API: <code>{import.meta.env.VITE_API_URL}</code></footer>
    </div>
  );
}
