import { BrewMethod } from "db";

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
