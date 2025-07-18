"use client";

import { Participant } from "@/types/participant";
import { useAppContext } from "@/context/AppContext";

interface ParticipantCardProps {
  participant: Participant;
}

export default function ParticipantCard({ participant }: ParticipantCardProps) {
  const { showSwipeableCard } = useAppContext();

  const handleCardClick = () => {
    showSwipeableCard(participant);
  };

  const formatLocation = () => {
    if (participant.currentLocation) {
      return participant.currentLocation;
    }
    if (participant.birthplace) {
      return participant.birthplace;
    }
    return null;
  };

  const formatAge = () => {
    if (participant.age) {
      return `${participant.age} ani`;
    }
    return null;
  };

  // Truncate bio for compact display
  const truncateBio = (bio: string, maxLength: number = 80) => {
    if (bio.length <= maxLength) return bio;
    return bio.substring(0, maxLength) + "...";
  };

  return (
    <div
      className="card"
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
        {participant.picture ? (
          <img
            src={participant.picture}
            alt={`${participant.name}`}
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div
          className={`card-image-placeholder ${
            participant.picture ? "hidden" : ""
          }`}
        >
          {participant.name.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="card-name">{participant.name}</h3>
          {formatAge() && <span className="card-age">{formatAge()}</span>}
        </div>

        <p className="card-occupation">{participant.occupation}</p>

        {formatLocation() && (
          <p className="card-location">{formatLocation()}</p>
        )}

        <p className="card-bio">{truncateBio(participant.bio)}</p>
      </div>
    </div>
  );
}
