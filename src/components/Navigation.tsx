"use client";

import { useAppContext } from "@/context/AppContext";
import { ParticipantCategory } from "@/types/participant";

const categoryLabels: Record<ParticipantCategory, string> = {
  ispite_feminine: "Ispite Femei",
  ispite_masculine: "Ispite Bărbați",
  cupluri: "Cupluri",
};

export default function Navigation() {
  const { state, setCategory } = useAppContext();

  return (
    <nav className="nav">
      <div className="nav-container">
        <h1 className="nav-title">Insula Iubirii 2025</h1>

        <div className="nav-tabs">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              className={`nav-tab ${
                state.currentCategory === key ? "active" : ""
              }`}
              onClick={() => setCategory(key as ParticipantCategory)}
              aria-label={`Vezi ${label}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
