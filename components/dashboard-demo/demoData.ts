import { DemoEvent } from "./types";

export const demoEvents: DemoEvent[] = [
  {
    id: 1,
    message: {
      sender: "romia",
      text: "Hola 👋 ¿Estás buscando una vivienda para vivir o una oportunidad de inversión?",
      time: "23:05",
    },
  },

  {
    id: 2,
    message: {
      sender: "client",
      text: "Principalmente para vivir.",
      time: "23:06",
    },
  },

  {
    id: 3,
    message: {
      sender: "romia",
      text: "Perfecto. ¿En qué distrito te gustaría encontrar tu próximo departamento?",
      time: "23:07",
    
    },
  },

  {
    id: 4,
    message: {
      sender: "client",
      text: "Estoy evaluando Miraflores y Surco.",
      time: "23:08",
    },

    updates: {
      district: "Miraflores / Surco",
      score: 20,
    },
  },

  {
    id: 5,
    message: {
      sender: "romia",
      text: "Excelente. ¿Tienes algún presupuesto aproximado?",
      time: "23:09",
    },
  },

  {
    id: 6,
    message: {
      sender: "client",
      text: "Sí, alrededor de S/250,000.",
      time: "23:10",
    },

    updates: {
      budget: "S/250,000",
      score: 35,
    },
  },

  {
    id: 7,
    message: {
      sender: "romia",
      text: "¿Cuántos dormitorios necesitas?",
      time: "23:11",
    },
  },

  {
    id: 8,
    message: {
      sender: "client",
      text: "2 dormitorios.",
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
      text: "Entendido. ¿Planeas mudarte durante los próximos meses o todavía estás evaluando opciones?",
      time: "23:13",
    },
  },

  {
    id: 10,
    message: {
      sender: "client",
      text: "Sí, idealmente durante los próximos meses.",
      time: "23:14",
    },
    

     updates: {
     score: 70,
     leadStatus: "Alta intención ",
     name: "María González",
    },
  },
];