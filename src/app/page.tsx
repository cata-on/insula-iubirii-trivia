"use client";

import { AppProvider, useAppContext } from "@/context/AppContext";
import Navigation from "@/components/Navigation";
import ParticipantCard from "@/components/ParticipantCard";
import ParticipantModal from "@/components/ParticipantModal";
import { getParticipantsByCategory } from "@/utils/dataLoader";

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
  return (
    <main className="main">
      <ParticipantGrid />
      <ParticipantModal />
    </main>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <div className="app-container">
        <MainContent />
        <Navigation />
      </div>
    </AppProvider>
  );
}
