export interface Participant {
  id: string;
  name: string;
  age: number | null;
  birthplace: string | null;
  currentLocation: string | null;
  otherLocations: string[];
  bio: string;
  occupation: string;
  role: "ispita_feminina" | "ispit_masculin" | "cuplu";
  picture: string;
  partner?: string; // Optional field for couples to reference their partner's ID
}

export type ParticipantCategory =
  | "ispite_feminine"
  | "ispite_masculine"
  | "cupluri";

export interface AppState {
  currentCategory: ParticipantCategory;
  selectedParticipant: Participant | null;
  swipeableCard: {
    isVisible: boolean;
    participant: Participant | null;
    swipeStats: SwipeStats | null;
    isExiting?: boolean;
    exitDirection?: "left" | "right";
  };
  swipeStats: Record<string, SwipeStats>;
}

// Import SwipeStats from swipe types
import { SwipeStats } from "./swipe";
