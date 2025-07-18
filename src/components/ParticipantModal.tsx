"use client";

import { useEffect } from "react";
import { Participant } from "@/types/participant";
import { useAppContext } from "@/context/AppContext";

export default function ParticipantModal() {
  const { state, clearSelection } = useAppContext();
  const participant = state.selectedParticipant;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearSelection();
      }
    };

    if (participant) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [participant, clearSelection]);

  if (!participant) return null;

  const formatLocation = () => {
    if (participant.currentLocation) {
      return participant.currentLocation;
    }
    if (participant.birthplace) {
      return `Născut în ${participant.birthplace}`;
    }
    return null;
  };

  const formatAge = () => {
    if (participant.age) {
      return `${participant.age} ani`;
    }
    return null;
  };

  return (
    <div className="modal-overlay" onClick={clearSelection}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={clearSelection}
          aria-label="Închide modal"
        >
          ×
        </button>

        <div style={{ padding: "24px" }}>
          <div
            style={{
              width: "100%",
              height: "250px",
              borderRadius: "12px",
              marginBottom: "24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {participant.picture ? (
              <img
                src={participant.picture}
                alt={`${participant.name}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const sibling = target.nextElementSibling as HTMLElement;
                  if (sibling) {
                    sibling.style.display = "flex";
                  }
                }}
              />
            ) : null}
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                display: participant.picture ? "none" : "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "4rem",
                fontWeight: "300",
              }}
            >
              {participant.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "700",
              color: "#2d3748",
              marginBottom: "8px",
            }}
          >
            {participant.name}
          </h2>

          {formatAge() && (
            <p
              style={{
                fontSize: "1rem",
                color: "#718096",
                marginBottom: "12px",
              }}
            >
              {formatAge()}
            </p>
          )}

          {formatLocation() && (
            <p
              style={{
                fontSize: "1rem",
                color: "#718096",
                marginBottom: "16px",
              }}
            >
              {formatLocation()}
            </p>
          )}

          <div
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#667eea",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "16px",
            }}
          >
            {participant.occupation}
          </div>

          <p
            style={{
              fontSize: "1rem",
              color: "#4a5568",
              lineHeight: "1.6",
              marginBottom: "24px",
            }}
          >
            {participant.bio}
          </p>

          <div
            style={{
              borderTop: "1px solid #e2e8f0",
              paddingTop: "20px",
            }}
          >
            {participant.birthplace && participant.currentLocation && (
              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#718096",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "4px",
                  }}
                >
                  Locul de naștere
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    color: "#2d3748",
                  }}
                >
                  {participant.birthplace}
                </div>
              </div>
            )}

            {participant.currentLocation && participant.birthplace && (
              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#718096",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "4px",
                  }}
                >
                  Locația actuală
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    color: "#2d3748",
                  }}
                >
                  {participant.currentLocation}
                </div>
              </div>
            )}

            {participant.otherLocations.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#718096",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "4px",
                  }}
                >
                  Alte locații
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    color: "#2d3748",
                  }}
                >
                  {participant.otherLocations.join(", ")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
