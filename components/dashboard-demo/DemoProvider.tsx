"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { demoEvents as demoEventsEs } from "../../data/demoData";
import { demoEvents as demoEventsEn } from "../../data/demoData.en";
import { DemoEvent, LeadProfile, Message } from "./types";
import type { getDictionary } from "@/lib/getDictionary";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

type DemoContextType = {
  visibleMessages: Message[];
  leadProfile: LeadProfile;
  currentScore: number;
  currentStep: number;
  dict: Dict;
};

const DemoContext = createContext<DemoContextType | null>(null);

export function useDemo() {
  const context = useContext(DemoContext);

  if (!context) {
    throw new Error("useDemo must be used inside DemoProvider");
  }

  return context;
}

export default function DemoProvider({
  children,
  dict,
  locale,
}: {
  children: React.ReactNode;
  dict: Dict;
  locale: string;
}) {
  const demoEvents: DemoEvent[] = locale === "en" ? demoEventsEn : demoEventsEs;

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= demoEvents.length + 2) {
          return 0;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [demoEvents.length]);

  const visibleEvents = demoEvents.slice(0, currentStep);

  const visibleMessages = visibleEvents
    .filter((event) => event.message)
    .map((event) => event.message!) as Message[];

  const leadProfile = visibleEvents.reduce<LeadProfile>(
    (acc, event) => ({
      ...acc,
      ...event.updates,
    }),
    {}
  );

  const currentScore = leadProfile.score ?? 0;

  const value = useMemo(
    () => ({
      visibleMessages,
      leadProfile,
      currentScore,
      currentStep,
      dict,
    }),
    [visibleMessages, leadProfile, currentScore, currentStep, dict]
  );

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
}