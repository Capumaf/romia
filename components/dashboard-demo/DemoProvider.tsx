"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { demoEvents } from "../../data/demoData";
import { LeadProfile, Message } from "./types";

type DemoContextType = {
  visibleMessages: Message[];
  leadProfile: LeadProfile;
  currentScore: number;
  currentStep: number;
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
}: {
  children: React.ReactNode;
}) {
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
  }, []);

  const visibleEvents = demoEvents.slice(0, currentStep);
  console.log(
  "STEP:",
  currentStep,
  "TOTAL:",
  demoEvents.length,
  "VISIBLE:",
  visibleEvents.length
);

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
    }),
    [visibleMessages, leadProfile, currentScore, currentStep]
  );

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
}