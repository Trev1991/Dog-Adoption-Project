import React, { useEffect } from "react";

export default function Toast({ message, onClose, timeout = 2000 }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onClose?.(), timeout);
    return () => clearTimeout(t);
  }, [message, timeout, onClose]);

  if (!message) return null;

  return (
    <div role="status" aria-live="polite" className="toast">
      {message}
    </div>
  );
}
