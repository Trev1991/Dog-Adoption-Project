import React from "react";
export default function Pager({ page, total, limit, onPage }) {
  const pageCount = Math.max(1, Math.ceil(total / limit));
  return (
    <div className="pager">
      <button className="btn btn--ghost" disabled={page <= 1} onClick={() => onPage(page - 1)}>Prev</button>
      <span className="muted">Page {page} / {pageCount}</span>
      <button className="btn btn--ghost" disabled={page >= pageCount} onClick={() => onPage(page + 1)}>Next</button>
    </div>
  );
}
