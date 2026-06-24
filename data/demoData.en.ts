import { DemoEvent } from "../components/dashboard-demo/types";

export const demoEvents: DemoEvent[] = [
  {
    id: 1,
    message: {
      sender: "romia",
      text: "Hi 👋 Are you looking for a home to live in or an investment opportunity?",
      time: "23:05",
    },
  },

  {
    id: 2,
    message: {
      sender: "client",
      text: "Mainly to live in.",
      time: "23:06",
    },
  },

  {
    id: 3,
    message: {
      sender: "romia",
      text: "Perfect. Which district would you like to find your next apartment in?",
      time: "23:07",
    },
  },

  {
    id: 4,
    message: {
      sender: "client",
      text: "I'm considering around Florida.",
      time: "23:08",
    },

    updates: {
      district: "Florida.",
      score: 20,
    },
  },

  {
    id: 5,
    message: {
      sender: "romia",
      text: "Great. Do you have an approximate budget in mind?",
      time: "23:09",
    },
  },

  {
    id: 6,
    message: {
      sender: "client",
      text: "Yes, around $250,000.",
      time: "23:10",
    },

    updates: {
      budget: "$250,000",
      score: 35,
    },
  },

  {
    id: 7,
    message: {
      sender: "romia",
      text: "How many bedrooms do you need?",
      time: "23:11",
    },
  },

  {
    id: 8,
    message: {
      sender: "client",
      text: "2 bedrooms.",
      time: "23:12",
    },

    updates: {
      bedrooms: "2",
      score: 45,
    },
  },

  {
    id: 9,
    message: {
      sender: "romia",
      text: "Understood. Are you planning to move in the next few months or are you still exploring options?",
      time: "23:13",
    },
  },

  {
    id: 10,
    message: {
      sender: "client",
      text: "Yes, ideally within the next few months.",
      time: "23:14",
    },

    updates: {
      score: 70,
      leadStatus: "High Intent",
      name: "Maria González",
    },
  },
];