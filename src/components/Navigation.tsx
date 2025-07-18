"use client";

import { useAppContext } from "@/context/AppContext";
import { ParticipantCategory } from "@/types/participant";

const categoryConfig: Record<
  ParticipantCategory,
  { label: string; icon: string }
> = {
  ispite_feminine: { label: "Ispite Femei", icon: "👩" },
  ispite_masculine: { label: "Ispite Bărbați", icon: "👨" },
  cupluri: { label: "Cupluri", icon: "💕" },
};

export default function Navigation() {
  const { state, setCategory } = useAppContext();

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {Object.entries(categoryConfig).map(([key, config]) => (
          <button
            key={key}
            className={`bottom-nav-tab ${
              state.currentCategory === key ? "active" : ""
            }`}
            onClick={() => setCategory(key as ParticipantCategory)}
            aria-label={`Vezi ${config.label}`}
          >
            <span className="bottom-nav-icon">{config.icon}</span>
            <span className="bottom-nav-label">{config.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
