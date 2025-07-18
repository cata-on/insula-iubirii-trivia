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
}

export type ParticipantCategory =
  | "ispite_feminine"
  | "ispite_masculine"
  | "cupluri";

export interface AppState {
  currentCategory: ParticipantCategory;
  selectedParticipant: Participant | null;
}
