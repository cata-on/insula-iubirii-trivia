"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  AppState,
  ParticipantCategory,
  Participant,
} from "@/types/participant";
import { getParticipantsByCategory } from "@/utils/dataLoader";
import { SwipeAction, SwipeStats } from "@/types/swipe";

// Action types for state management
type AppAction =
  | { type: "SET_CATEGORY"; payload: ParticipantCategory }
  | { type: "SELECT_PARTICIPANT"; payload: Participant | null }
  | { type: "CLEAR_SELECTION" }
  | {
      type: "SHOW_SWIPEABLE_CARD";
      payload: { participant: Participant; swipeStats?: SwipeStats };
    }
  | { type: "HIDE_SWIPEABLE_CARD" }
  | { type: "START_SWIPE_EXIT"; payload: { direction: "left" | "right" } }
  | { type: "COMPLETE_SWIPE_EXIT" }
  | {
      type: "UPDATE_SWIPE_STATS";
      payload: { participantId: string; stats: SwipeStats };
    };

// Default initial state
const defaultInitialState: AppState = {
  currentCategory: "ispite_feminine",
  selectedParticipant: null,
  swipeableCard: {
    isVisible: false,
    participant: null,
    swipeStats: null,
    isExiting: false,
    exitDirection: undefined,
  },
  swipeStats: {},
};

// Reducer function for state updates
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_CATEGORY":
      return {
        ...state,
        currentCategory: action.payload,
        selectedParticipant: null, // Clear selection when changing category
      };
    case "SELECT_PARTICIPANT":
      return {
        ...state,
        selectedParticipant: action.payload,
      };
    case "CLEAR_SELECTION":
      return {
        ...state,
        selectedParticipant: null,
      };
    case "SHOW_SWIPEABLE_CARD":
      return {
        ...state,
        swipeableCard: {
          isVisible: true,
          participant: action.payload.participant,
          swipeStats: action.payload.swipeStats || null,
        },
      };
    case "HIDE_SWIPEABLE_CARD":
      return {
        ...state,
        swipeableCard: {
          isVisible: false,
          participant: null,
          swipeStats: null,
        },
      };
    case "START_SWIPE_EXIT":
      return {
        ...state,
        swipeableCard: {
          ...state.swipeableCard,
          isExiting: true,
          exitDirection: action.payload.direction,
        },
      };
    case "COMPLETE_SWIPE_EXIT":
      return {
        ...state,
        swipeableCard: {
          isVisible: false,
          participant: null,
          swipeStats: null,
          isExiting: false,
          exitDirection: undefined,
        },
      };
    case "UPDATE_SWIPE_STATS":
      return {
        ...state,
        swipeStats: {
          ...state.swipeStats,
          [action.payload.participantId]: action.payload.stats,
        },
      };
    default:
      return state;
  }
}

// Context interface
interface AppContextType {
  state: AppState;
  setCategory: (category: ParticipantCategory) => void;
  selectParticipant: (participant: Participant | null) => void;
  clearSelection: () => void;
  showSwipeableCard: (
    participant: Participant,
    swipeStats?: SwipeStats
  ) => void;
  hideSwipeableCard: () => void;
  startSwipeExit: (direction: "left" | "right") => void;
  completeSwipeExit: () => void;
  handleSwipe: (action: SwipeAction) => Promise<void>;
}

// Provider props interface
interface AppProviderProps {
  children: ReactNode;
  initialCategory?: ParticipantCategory;
  initialParticipantId?: string;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({
  children,
  initialCategory,
  initialParticipantId,
}: AppProviderProps) {
  // Create initial state based on props
  const getInitialState = (): AppState => {
    if (!initialCategory) {
      return defaultInitialState;
    }

    const participants = getParticipantsByCategory(initialCategory);
    const participant = initialParticipantId
      ? participants.find((p) => p.id === initialParticipantId) || null
      : null;

    return {
      currentCategory: initialCategory,
      selectedParticipant: participant,
      swipeableCard: {
        isVisible: false,
        participant: null,
        swipeStats: null,
        isExiting: false,
        exitDirection: undefined,
      },
      swipeStats: {},
    };
  };

  const [state, dispatch] = useReducer(appReducer, getInitialState());

  const setCategory = (category: ParticipantCategory) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
  };

  const selectParticipant = (participant: Participant | null) => {
    dispatch({ type: "SELECT_PARTICIPANT", payload: participant });
  };

  const clearSelection = () => {
    dispatch({ type: "CLEAR_SELECTION" });
  };

  const showSwipeableCard = (
    participant: Participant,
    swipeStats?: SwipeStats
  ) => {
    dispatch({
      type: "SHOW_SWIPEABLE_CARD",
      payload: { participant, swipeStats },
    });
  };

  const hideSwipeableCard = () => {
    dispatch({ type: "HIDE_SWIPEABLE_CARD" });
  };

  const startSwipeExit = (direction: "left" | "right") => {
    dispatch({ type: "START_SWIPE_EXIT", payload: { direction } });
  };

  const completeSwipeExit = () => {
    dispatch({ type: "COMPLETE_SWIPE_EXIT" });
  };

  const handleSwipe = async (action: SwipeAction) => {
    if (!state.swipeableCard.participant) return;

    // TODO: Implement API call to store swipe
    console.log(`Swiped ${action} on ${state.swipeableCard.participant.name}`);

    // Start exit animation based on swipe direction
    const direction = action === "like" ? "right" : "left";
    startSwipeExit(direction);

    // Hide the card after animation completes
    setTimeout(() => {
      hideSwipeableCard();
    }, 300);
  };

  const value: AppContextType = {
    state,
    setCategory,
    selectParticipant,
    clearSelection,
    showSwipeableCard,
    hideSwipeableCard,
    startSwipeExit,
    completeSwipeExit,
    handleSwipe,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook for using the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
