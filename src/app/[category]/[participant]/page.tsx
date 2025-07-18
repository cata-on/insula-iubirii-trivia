import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ParticipantCategory } from "@/types/participant";
import { getParticipantsByCategory } from "@/utils/dataLoader";
import AppContent from "@/components/AppContent";

// Map URL-friendly category names to internal category names
const categoryMap: Record<string, ParticipantCategory> = {
  "ispite-feminine": "ispite_feminine",
  "ispite-masculine": "ispite_masculine",
  cupluri: "cupluri",
};

export default async function ParticipantPage({
  params,
}: {
  params: Promise<{ category: string; participant: string }>;
}) {
  const { category: categorySlug, participant } = await params;
  const category = categoryMap[categorySlug];

  if (!category) {
    notFound();
  }

  const participants = getParticipantsByCategory(category);
  const participantData = participants.find((p) => p.id === participant);

  if (!participantData) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppContent
        initialCategory={category}
        initialParticipantId={participant}
      />
    </Suspense>
  );
}
