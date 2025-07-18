"use client";

import { AppProvider, useAppContext } from "@/context/AppContext";
import Navigation from "@/components/Navigation";
import ParticipantCard from "@/components/ParticipantCard";
import ParticipantModal from "@/components/ParticipantModal";
import SwipeableCard from "@/components/SwipeableCard";
import CategoryBackground from "@/components/CategoryBackground";
import { getParticipantsByCategory } from "@/utils/dataLoader";
import { ParticipantCategory } from "@/types/participant";

function ParticipantGrid() {
  const { state } = useAppContext();
  const participants = getParticipantsByCategory(state.currentCategory);

  if (participants.length === 0) {
    return (
      <div className="empty-state">
        <h3>Nu există participanți în această categorie</h3>
        <p>Informațiile vor fi adăugate în curând.</p>
      </div>
    );
  }

  return (
    <div className="cards-grid">
      {participants.map((participant) => (
        <ParticipantCard key={participant.id} participant={participant} />
      ))}
    </div>
  );
}

function MainContent() {
  const { state, handleSwipe, hideSwipeableCard } = useAppContext();

  return (
    <>
      <CategoryBackground />
      <main className="main">
        <ParticipantGrid />
        <ParticipantModal />
        {state.swipeableCard.participant && (
          <SwipeableCard
            participant={state.swipeableCard.participant}
            onSwipe={handleSwipe}
            onClose={hideSwipeableCard}
            swipeStats={state.swipeableCard.swipeStats || undefined}
            isVisible={state.swipeableCard.isVisible}
          />
        )}
      </main>
    </>
  );
}

interface AppContentProps {
  initialCategory?: ParticipantCategory;
  initialParticipantId?: string;
}

export default function AppContent({
  initialCategory,
  initialParticipantId,
}: AppContentProps) {
  return (
    <AppProvider
      initialCategory={initialCategory}
      initialParticipantId={initialParticipantId}
    >
      <div className="app-container">
        <MainContent />
        <Navigation />
      </div>
    </AppProvider>
  );
}
