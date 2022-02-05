import { BrewMethod, Rating } from "db";

export const test = "fds";

export const RATING_TO_EMOJI: { [key in Rating]: string } = {
  VERY_BAD: "😢",
  BAD: "🙁",
  AVERAGE: "😐",
  GOOD: "🙂",
  VERY_GOOD: "😍",
};

export const RATING_TO_COPY: { [key in Rating]: string } = {
  VERY_BAD: "Very bad",
  BAD: "Bad",
  AVERAGE: "Average",
  GOOD: "Good",
  VERY_GOOD: "Very good",
};

export const BREW_METHOD_TO_STRING: Record<BrewMethod, string> = {
  AEROPRESS: "Aeropress",
  BIALETTI: "Bialetti",
  COLD_BREW: "Cold brew",
  ESPRESSO: "Espresso",
  FRENCH_PRESS: "French press",
  PHIN: "Phin",
  POUR_OVER: "Pour over",
  SIPHON: "Siphon",
};
