"use client";

import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

export default function CategoryBackground() {
  const { state } = useAppContext();

  useEffect(() => {
    // Remove all category classes
    document.body.classList.remove(
      "category-feminine",
      "category-masculine",
      "category-couples"
    );

    // Add the appropriate class based on current category
    switch (state.currentCategory) {
      case "ispite_feminine":
        document.body.classList.add("category-feminine");
        break;
      case "ispite_masculine":
        document.body.classList.add("category-masculine");
        break;
      case "cupluri":
        document.body.classList.add("category-couples");
        break;
    }
  }, [state.currentCategory]);

  return null; // This component doesn't render anything
}
