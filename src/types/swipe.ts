export type SwipeAction = "like" | "dislike" | "super_like" | "skip";

export interface SwipeStats {
  likes: number;
  dislikes: number;
  superLikes: number;
  skips: number;
  userSwipe?: SwipeAction;
}

export interface SwipeGestureConfig {
  threshold: number; // Minimum distance for swipe
  velocity: number; // Minimum velocity for swipe
  direction: "horizontal" | "vertical" | "both";
  enabled?: boolean; // Whether swipe detection is enabled
}

export interface SwipeGestureState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  isDragging: boolean;
  direction: "left" | "right" | "up" | "down" | null;
  velocity: number;
}

export interface SwipeableCardProps {
  participant: Participant;
  onSwipe: (action: SwipeAction) => void;
  onClose: () => void;
  swipeStats?: SwipeStats;
  isVisible: boolean;
  isExiting?: boolean;
  exitDirection?: "left" | "right";
}

export interface SwipeResponse {
  success: boolean;
  participantId: string;
  action: SwipeAction;
  updatedStats: SwipeStats;
  timestamp: string;
}

export interface SwipeStatsResponse {
  participantId: string;
  stats: SwipeStats;
  totalSwipes: number;
  userSwipe?: SwipeAction;
}

export interface SwipeHistoryItem {
  participantId: string;
  action: SwipeAction;
  timestamp: string;
  participant: Participant;
}

export interface SwipeHistoryResponse {
  swipes: SwipeHistoryItem[];
  total: number;
  page: number;
  hasMore: boolean;
}

// Import Participant type from existing types
import { Participant } from "./participant";
