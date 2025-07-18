"use client";

import { useEffect, useRef } from "react";
import { SwipeableCardProps } from "@/types/swipe";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";

export default function SwipeableCard({
  participant,
  onSwipe,
  onClose,
  swipeStats,
  isVisible,
}: SwipeableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { gestureState, isDragging, direction } = useSwipeGesture(
    isVisible ? onSwipe : () => {},
    { enabled: isVisible }
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          onSwipe("like");
          break;
        case "ArrowLeft":
          e.preventDefault();
          onSwipe("dislike");
          break;

        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, onSwipe, onClose]);

  // Prevent body scroll when card is visible
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    if (isVisible) {
      // Prevent scroll on body and html
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
      // Remove event listeners
      document.body.removeEventListener("wheel", preventScroll);
      document.body.removeEventListener("touchmove", preventScroll);
      document.documentElement.removeEventListener("wheel", preventScroll);
      document.documentElement.removeEventListener("touchmove", preventScroll);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const formatLocation = (location: string | null) => {
    return location || "Informație indisponibilă";
  };

  const formatAge = (age: number | null) => {
    return age ? `${age} ani` : "Vârsta indisponibilă";
  };

  // Calculate card transform based on gesture
  const getCardTransform = () => {
    if (!isDragging) return "";

    const deltaX = gestureState.currentX - gestureState.startX;
    const deltaY = gestureState.currentY - gestureState.startY;
    const rotation = deltaX * 0.1; // Slight rotation for visual effect

    return `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
  };

  // Get swipe feedback styling
  const getSwipeFeedback = () => {
    if (!isDragging || !direction) return {};

    const baseStyle = {
      transform: getCardTransform(),
      transition: "none",
    };

    switch (direction) {
      case "right":
        return {
          ...baseStyle,
          borderColor: "#10b981",
          boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
        };
      case "left":
        return {
          ...baseStyle,
          borderColor: "#ef4444",
          boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)",
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div className="swipeable-card-overlay" onClick={onClose}>
      <div
        ref={cardRef}
        className="swipeable-card"
        style={getSwipeFeedback()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="participant-name"
      >
        {/* Participant image */}
        <div className="swipeable-card-image">
          {participant.picture ? (
            <img
              src={participant.picture}
              alt={participant.name}
              draggable={false}
            />
          ) : (
            <div className="swipeable-card-image-placeholder">
              {participant.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Participant info */}
        <div className="swipeable-card-content">
          <h2 id="participant-name" className="swipeable-card-name">
            {participant.name}
          </h2>

          <div className="swipeable-card-details">
            <span className="swipeable-card-age">
              {formatAge(participant.age)}
            </span>
            <span className="swipeable-card-location">
              {formatLocation(participant.currentLocation)}
            </span>
          </div>

          <p className="swipeable-card-occupation">{participant.occupation}</p>
          <p className="swipeable-card-bio">{participant.bio}</p>

          {/* Swipe statistics */}
          {swipeStats && (
            <div className="swipeable-card-stats">
              <div className="swipe-stat">
                <span className="swipe-stat-icon">❤️</span>
                <span className="swipe-stat-count">{swipeStats.likes}</span>
              </div>
              <div className="swipe-stat">
                <span className="swipe-stat-icon">💔</span>
                <span className="swipe-stat-count">{swipeStats.dislikes}</span>
              </div>
            </div>
          )}
        </div>

        {/* Swipe instructions */}
        <div className="swipeable-card-instructions">
          <div className="swipe-instruction-item">
            <span className="swipe-instruction-icon">👈</span>
            <span className="swipe-instruction-text">Dislike</span>
          </div>
          <div className="swipe-instruction-item">
            <span className="swipe-instruction-icon">👉</span>
            <span className="swipe-instruction-text">Like</span>
          </div>
        </div>
      </div>
    </div>
  );
}
