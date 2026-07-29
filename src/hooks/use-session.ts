import { useEffect, useState } from "react";
import { getSession, type Session } from "@/lib/auth";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSession(getSession());
    setHydrated(true);
    const handler = () => setSession(getSession());
    window.addEventListener("salon-ai:session-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("salon-ai:session-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return { session, hydrated };
}
