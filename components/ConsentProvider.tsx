"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Choice = "granted" | "denied" | null;

type ConsentValue = {
  choice: Choice;
  ready: boolean;
  bannerOpen: boolean;
  decide: (choice: Exclude<Choice, null>) => void;
  open: () => void;
};

const STORAGE_KEY = "centryslab-consent-v1";

const ConsentContext = createContext<ConsentValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<Choice>(null);
  const [ready, setReady] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "granted" || stored === "denied") {
        setChoice(stored);
      } else {
        setBannerOpen(true);
      }
    } catch {
      setBannerOpen(true);
    }
    setReady(true);
  }, []);

  const decide = useCallback((next: Exclude<Choice, null>) => {
    setChoice(next);
    setBannerOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies); the
      // choice still applies for this page view.
    }
  }, []);

  const open = useCallback(() => setBannerOpen(true), []);

  const value = useMemo(
    () => ({ choice, ready, bannerOpen, decide, open }),
    [choice, ready, bannerOpen, decide, open],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentValue {
  const value = useContext(ConsentContext);
  if (!value) throw new Error("useConsent must be used inside ConsentProvider");
  return value;
}
