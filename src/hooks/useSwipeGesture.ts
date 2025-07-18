"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  SwipeAction,
  SwipeGestureConfig,
  SwipeGestureState,
} from "@/types/swipe";

const DEFAULT_CONFIG: SwipeGestureConfig = {
  threshold: 50, // Minimum distance for swipe
  velocity: 0.3, // Minimum velocity for swipe
  direction: "horizontal",
  enabled: true,
};

export function useSwipeGesture(
  onSwipe: (action: SwipeAction) => void,
  config: Partial<SwipeGestureConfig> = {}
) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const [gestureState, setGestureState] = useState<SwipeGestureState>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    isDragging: false,
    direction: null,
    velocity: 0,
  });

  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const calculateVelocity = useCallback(
    (distance: number, time: number): number => {
      return time > 0 ? distance / time : 0;
    },
    []
  );

  const determineSwipeAction = useCallback(
    (
      direction: "left" | "right" | "up" | "down",
      velocity: number
    ): SwipeAction | null => {
      const distance = Math.abs(
        direction === "left" || direction === "right"
          ? gestureState.currentX - gestureState.startX
          : gestureState.currentY - gestureState.startY
      );

      if (distance < finalConfig.threshold || velocity < finalConfig.velocity) {
        return null;
      }

      switch (direction) {
        case "right":
          return "like";
        case "left":
          return "dislike";
        default:
          return null;
      }
    },
    [gestureState, finalConfig]
  );

  const handleStart = useCallback((clientX: number, clientY: number) => {
    setGestureState((prev) => ({
      ...prev,
      startX: clientX,
      startY: clientY,
      currentX: clientX,
      currentY: clientY,
      isDragging: true,
      direction: null,
      velocity: 0,
    }));
    startTimeRef.current = Date.now();
  }, []);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      setGestureState((prev) => {
        if (!prev.isDragging) return prev;

        const deltaX = clientX - prev.startX;
        const deltaY = clientY - prev.startY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        let direction: "left" | "right" | "up" | "down" | null = null;

        if (finalConfig.direction !== "vertical") {
          if (absDeltaX > absDeltaY && absDeltaX > 10) {
            direction = deltaX > 0 ? "right" : "left";
          }
        }

        if (finalConfig.direction !== "horizontal") {
          if (absDeltaY > absDeltaX && absDeltaY > 10) {
            direction = deltaY > 0 ? "down" : "up";
          }
        }

        return {
          ...prev,
          currentX: clientX,
          currentY: clientY,
          direction,
        };
      });
    },
    [finalConfig]
  );

  const handleEnd = useCallback(() => {
    const endTime = Date.now();
    const duration = endTime - startTimeRef.current;
    const distance = Math.abs(
      gestureState.direction === "left" || gestureState.direction === "right"
        ? gestureState.currentX - gestureState.startX
        : gestureState.currentY - gestureState.startY
    );

    const velocity = calculateVelocity(distance, duration);

    if (gestureState.direction) {
      const action = determineSwipeAction(gestureState.direction, velocity);

      setGestureState((prev) => ({
        ...prev,
        isDragging: false,
        velocity,
      }));

      if (action) {
        onSwipe(action);
      }
    } else {
      setGestureState((prev) => ({
        ...prev,
        isDragging: false,
        velocity,
      }));
    }
  }, [gestureState, calculateVelocity, determineSwipeAction, onSwipe]);

  // Touch event handlers
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!finalConfig.enabled) return;

      const target = e.target as HTMLElement;
      const card = target.closest(".swipeable-card");
      if (card) {
        // Only prevent default if we're starting a drag on the card itself
        const touch = e.touches[0];
        handleStart(touch.clientX, touch.clientY);
      }
    },
    [handleStart, finalConfig.enabled]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!finalConfig.enabled || !gestureState.isDragging) return;

      // Only prevent default if we're actively dragging on the swipeable card
      const target = e.target as HTMLElement;
      const card = target.closest(".swipeable-card");
      if (card) {
        // Check if we're in the content area (scrollable)
        const contentArea = target.closest(".swipeable-card-content");
        if (contentArea) {
          // Don't prevent default in content area to allow scrolling
          const touch = e.touches[0];
          handleMove(touch.clientX, touch.clientY);
        } else {
          // Prevent default only on non-content areas (image, instructions, etc.)
          e.preventDefault();
          const touch = e.touches[0];
          handleMove(touch.clientX, touch.clientY);
        }
      }
    },
    [handleMove, gestureState.isDragging, finalConfig.enabled]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!finalConfig.enabled || !gestureState.isDragging) return;

      // Only prevent default if we're ending a drag on the swipeable card
      const target = e.target as HTMLElement;
      const card = target.closest(".swipeable-card");
      if (card) {
        // Check if we're in the content area (scrollable)
        const contentArea = target.closest(".swipeable-card-content");
        if (contentArea) {
          // Don't prevent default in content area to allow scrolling
          handleEnd();
        } else {
          // Prevent default only on non-content areas
          e.preventDefault();
          handleEnd();
        }
      }
    },
    [handleEnd, gestureState.isDragging, finalConfig.enabled]
  );

  // Mouse event handlers
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      // Only handle events if enabled and clicking on the card
      if (!finalConfig.enabled) return;

      const target = e.target as HTMLElement;
      if (target.closest(".swipeable-card")) {
        e.preventDefault();
        handleStart(e.clientX, e.clientY);
      }
    },
    [handleStart, finalConfig.enabled]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!finalConfig.enabled || !gestureState.isDragging) return;

      // Only prevent default if we're actively dragging on the swipeable card
      const target = e.target as HTMLElement;
      const card = target.closest(".swipeable-card");
      if (card) {
        e.preventDefault();
        handleMove(e.clientX, e.clientY);
      }
    },
    [handleMove, gestureState.isDragging, finalConfig.enabled]
  );

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (!finalConfig.enabled || !gestureState.isDragging) return;

      // Only prevent default if we're ending a drag on the swipeable card
      const target = e.target as HTMLElement;
      const card = target.closest(".swipeable-card");
      if (card) {
        e.preventDefault();
        handleEnd();
      }
    },
    [handleEnd, gestureState.isDragging, finalConfig.enabled]
  );

  // Add event listeners
  useEffect(() => {
    // Find the swipeable card element
    const cardElement = document.querySelector(".swipeable-card");
    if (!cardElement) return;

    // Touch events
    cardElement.addEventListener(
      "touchstart",
      handleTouchStart as EventListener,
      {
        passive: false,
      }
    );
    cardElement.addEventListener(
      "touchmove",
      handleTouchMove as EventListener,
      {
        passive: false,
      }
    );
    cardElement.addEventListener("touchend", handleTouchEnd as EventListener, {
      passive: false,
    });

    // Mouse events
    cardElement.addEventListener("mousedown", handleMouseDown as EventListener);
    cardElement.addEventListener("mousemove", handleMouseMove as EventListener);
    cardElement.addEventListener("mouseup", handleMouseUp as EventListener);

    return () => {
      cardElement.removeEventListener(
        "touchstart",
        handleTouchStart as EventListener
      );
      cardElement.removeEventListener(
        "touchmove",
        handleTouchMove as EventListener
      );
      cardElement.removeEventListener(
        "touchend",
        handleTouchEnd as EventListener
      );
      cardElement.removeEventListener(
        "mousedown",
        handleMouseDown as EventListener
      );
      cardElement.removeEventListener(
        "mousemove",
        handleMouseMove as EventListener
      );
      cardElement.removeEventListener(
        "mouseup",
        handleMouseUp as EventListener
      );
    };
  }, [
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  ]);

  return {
    gestureState,
    isDragging: gestureState.isDragging,
    direction: gestureState.direction,
    velocity: gestureState.velocity,
  };
}
