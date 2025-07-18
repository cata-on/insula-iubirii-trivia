import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ParticipantCategory } from "@/types/participant";
import AppContent from "@/components/AppContent";

// Map URL-friendly category names to internal category names
const categoryMap: Record<string, ParticipantCategory> = {
  "ispite-feminine": "ispite_feminine",
  "ispite-masculine": "ispite_masculine",
  cupluri: "cupluri",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = categoryMap[categorySlug];

  if (!category) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppContent initialCategory={category} />
    </Suspense>
  );
}
