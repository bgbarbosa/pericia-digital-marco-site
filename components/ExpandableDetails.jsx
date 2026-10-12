"use client";

import { useEffect, useRef } from "react";

export default function ExpandableDetails({ id, title, summary, children }) {
  const detailsRef = useRef(null);

  useEffect(() => {
    const reveal = () => {
      if (window.location.hash !== `#${id}`) return;
      const details = detailsRef.current;
      if (!details) return;
      details.open = true;
      requestAnimationFrame(() => details.scrollIntoView({ block: "start" }));
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, [id]);

  return (
    <details className="expandable-card" id={id} ref={detailsRef}>
      <summary aria-controls={`${id}-content`}>
        <span className="expandable-heading">{title}</span>
        <span className="expandable-summary">{summary}</span>
        <span className="expandable-action" aria-hidden="true">
          <span className="when-closed">Ver detalhes ↓</span>
          <span className="when-open">Recolher detalhes ↑</span>
        </span>
      </summary>
      <div id={`${id}-content`} className="expandable-content">{children}</div>
    </details>
  );
}
