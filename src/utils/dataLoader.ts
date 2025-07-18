import { Participant } from "@/types/participant";
import ispiteFeminine from "@/data/ispite_feminine.json";
import ispiteMasculine from "@/data/ispite_masculine.json";
import cupluri from "@/data/cupluri.json";

/**
 * Loads all participant data from JSON files
 * @returns Object containing all participants organized by category
 */
export function loadAllParticipants() {
  try {
    return {
      ispite_feminine: ispiteFeminine as Participant[],
      ispite_masculine: ispiteMasculine as Participant[],
      cupluri: cupluri as Participant[],
    };
  } catch (error) {
    console.error("Error loading participant data:", error);
    return {
      ispite_feminine: [],
      ispite_masculine: [],
      cupluri: [],
    };
  }
}

/**
 * Gets participants by category
 * @param category - The participant category to filter by
 * @returns Array of participants for the specified category
 */
export function getParticipantsByCategory(category: string): Participant[] {
  const allParticipants = loadAllParticipants();
  return allParticipants[category as keyof typeof allParticipants] || [];
}

/**
 * Gets a specific participant by ID
 * @param id - The participant ID to search for
 * @returns The participant object or null if not found
 */
export function getParticipantById(id: string): Participant | null {
  const allParticipants = loadAllParticipants();

  for (const category of Object.values(allParticipants)) {
    const participant = category.find((p) => p.id === id);
    if (participant) {
      return participant;
    }
  }

  return null;
}
