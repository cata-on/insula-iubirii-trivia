"use client";

import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { ParticipantCategory } from "@/types/participant";

const categoryConfig: Record<
  ParticipantCategory,
  { label: string; icon: string; slug: string }
> = {
  ispite_feminine: {
    label: "Ispite Femei",
    icon: "👩",
    slug: "ispite-feminine",
  },
  ispite_masculine: {
    label: "Ispite Bărbați",
    icon: "👨",
    slug: "ispite-masculine",
  },
  cupluri: { label: "Cupluri", icon: "💕", slug: "cupluri" },
};

export default function Navigation() {
  const { state } = useAppContext();

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {Object.entries(categoryConfig).map(([key, config]) => (
          <Link
            key={key}
            href={`/${config.slug}`}
            className={`bottom-nav-tab ${
              state.currentCategory === key ? "active" : ""
            }`}
            aria-label={`Vezi ${config.label}`}
          >
            <span className="bottom-nav-icon">{config.icon}</span>
            <span className="bottom-nav-label">{config.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
