"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { logEvent } from "firebase/analytics";
import { getAnalyticsInstance } from "@/lib/firebase";

export default function FirebaseAnalyticsInit() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Initialize Firebase Analytics on first load (GA4 logs initial page_view automatically)
    getAnalyticsInstance().then((analytics) => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      if (analytics) {
        logEvent(analytics, "page_view", {
          page_path: pathname,
          page_location: window.location.href,
          page_title: document.title,
        });
      }
    });
  }, [pathname]);

  return null;
}
