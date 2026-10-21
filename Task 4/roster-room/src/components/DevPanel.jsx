import { useState } from "react";
import { API_CONFIG } from "../api/settings.js";

export default function DevPanel({ log }) {
  const [min, setMin] = useState(API_CONFIG.minDelay);
  const [max, setMax] = useState(API_CONFIG.maxDelay);
  const [errChance, setErrChance] = useState(API_CONFIG.errorChance);

  function changeMin(v) {
    API_CONFIG.minDelay = v;
    setMin(v);
    if (v > max) changeMax(v);
  }

  function changeMax(v) {
    API_CONFIG.maxDelay = v;
    setMax(v);
    if (v < min) changeMin(v);
  }

  function changeErr(v) {
    API_CONFIG.errorChance = v;
    setErrChance(v);
  }

  return (
    <details className="dev panel">
      <summary>Turbulence & request log</summary>
      <div className="dev-grid">
        <div>
          <label>Min delay: {min} ms
            <input type="range" min="0" max="6000" step="100" value={min} onChange={(e) => changeMin(Number(e.target.value))} />
          </label>
          <label>Max delay: {max} ms
            <input type="range" min="0" max="8000" step="100" value={max} onChange={(e) => changeMax(Number(e.target.value))} />
          </label>
          <label>Error chance: {Math.round(errChance * 100)}%
            <input type="range" min="0" max="0.6" step="0.05" value={errChance} onChange={(e) => changeErr(Number(e.target.value))} />
          </label>
          <p className="muted small">Tip: min 200 / max 6000 makes race conditions easy to see.</p>
        </div>
        <pre className="log">{log.length ? log.join("\n") : "No requests yet."}</pre>
      </div>
    </details>
  );
}
