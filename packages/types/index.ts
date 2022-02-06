import { Bean, BrewMethod, Journal, Rating } from "db";

export interface BeanFormData {
  roaster: string;
  roast: string;
  singleOrigin: boolean;
  state: string;
  countryCode: string;
  rating: keyof typeof Rating | null;
}

export interface BrewMethodFormData {
  brewMethod: BrewMethod;
}

export interface GrinderFormData {
  grinder: string;
}

export interface JournalEntryData {
  id: Journal["id"];
  updatedAt: Journal["updatedAt"];
  brewMethod: Journal["brewMethod"];
  rating: Journal["rating"];
  grinder: Journal["grinder"];
  grindDescription: Journal["grindDescription"];
  waterTemperatureFahrenheit: Journal["waterTemperatureFahrenheit"];
  note: any;
  bean: {
    roast: Bean["roast"];
    roaster: Bean["roaster"];
  };
}
