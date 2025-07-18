"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  AppState,
  ParticipantCategory,
  Participant,
} from "@/types/participant";

// Action types for state management
type AppAction =
  | { type: "SET_CATEGORY"; payload: ParticipantCategory }
  | { type: "SELECT_PARTICIPANT"; payload: Participant | null }
  | { type: "CLEAR_SELECTION" };

// Initial state
const initialState: AppState = {
  currentCategory: "ispite_feminine",
  selectedParticipant: null,
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
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setCategory = (category: ParticipantCategory) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
  };

  const selectParticipant = (participant: Participant | null) => {
    dispatch({ type: "SELECT_PARTICIPANT", payload: participant });
  };

  const clearSelection = () => {
    dispatch({ type: "CLEAR_SELECTION" });
  };

  const value: AppContextType = {
    state,
    setCategory,
    selectParticipant,
    clearSelection,
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
