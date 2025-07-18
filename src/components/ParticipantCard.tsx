"use client";

import { useState } from "react";
import { Participant } from "@/types/participant";
import { useAppContext } from "@/context/AppContext";

interface ParticipantCardProps {
  participant: Participant;
}

export default function ParticipantCard({ participant }: ParticipantCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { selectParticipant } = useAppContext();

  const handleCardClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectParticipant(participant);
  };

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
    <div
      className={`card ${isExpanded ? "expanded" : ""}`}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`Vezi detalii pentru ${participant.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="card-image">
        {/* Placeholder for now - will be replaced with actual images */}
        <div className="card-image-placeholder">
          {participant.name.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="card-name">{participant.name}</h3>
          {formatAge() && <p className="card-age">{formatAge()}</p>}
        </div>

        {formatLocation() && (
          <p className="card-location">{formatLocation()}</p>
        )}

        <p className="card-occupation">{participant.occupation}</p>

        <p className="card-bio">{participant.bio}</p>

        {isExpanded && (
          <div className="card-details">
            {participant.birthplace && participant.currentLocation && (
              <div className="detail-item">
                <div className="detail-label">Locul de naștere</div>
                <div className="detail-value">{participant.birthplace}</div>
              </div>
            )}

            {participant.otherLocations.length > 0 && (
              <div className="detail-item">
                <div className="detail-label">Alte locații</div>
                <div className="detail-value">
                  {participant.otherLocations.join(", ")}
                </div>
              </div>
            )}

            <button
              className="nav-tab"
              onClick={handleViewDetails}
              style={{ marginTop: "12px", width: "100%" }}
            >
              Vezi toate detaliile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
