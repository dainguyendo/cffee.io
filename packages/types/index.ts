import { BrewMethod, Rating } from "db";

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
