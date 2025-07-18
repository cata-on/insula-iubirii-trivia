"use client";

import { useEffect } from "react";
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

      // Prevent scroll
      const preventScroll = (e: Event) => {
        e.preventDefault();
      };

      document.body.addEventListener("wheel", preventScroll, {
        passive: false,
      });
      document.body.addEventListener("touchmove", preventScroll, {
        passive: false,
      });
      document.documentElement.addEventListener("wheel", preventScroll, {
        passive: false,
      });
      document.documentElement.addEventListener("touchmove", preventScroll, {
        passive: false,
      });
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);

      // Remove scroll prevention
      const preventScroll = (e: Event) => {
        e.preventDefault();
      };

      document.body.removeEventListener("wheel", preventScroll);
      document.body.removeEventListener("touchmove", preventScroll);
      document.documentElement.removeEventListener("wheel", preventScroll);
      document.documentElement.removeEventListener("touchmove", preventScroll);
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

        <div className="modal-body">
          <div className="modal-image">
            {participant.picture ? (
              <img
                src={participant.picture}
                alt={`${participant.name}`}
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
            <div className="modal-image-placeholder">
              {participant.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <h2 className="modal-title">{participant.name}</h2>

          {formatAge() && <p className="modal-age">{formatAge()}</p>}

          {formatLocation() && (
            <p className="modal-location">{formatLocation()}</p>
          )}

          <div className="modal-occupation">{participant.occupation}</div>

          <p className="modal-bio">{participant.bio}</p>

          <div className="modal-details">
            {participant.birthplace && participant.currentLocation && (
              <div className="modal-detail-item">
                <div className="modal-detail-label">Locul de naștere</div>
                <div className="modal-detail-value">
                  {participant.birthplace}
                </div>
              </div>
            )}

            {participant.currentLocation && participant.birthplace && (
              <div className="modal-detail-item">
                <div className="modal-detail-label">Locația actuală</div>
                <div className="modal-detail-value">
                  {participant.currentLocation}
                </div>
              </div>
            )}

            {participant.otherLocations.length > 0 && (
              <div className="modal-detail-item">
                <div className="modal-detail-label">Alte locații</div>
                <div className="modal-detail-value">
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
