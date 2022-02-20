import type { Bean, Journal, Setup } from "db";
import { useQuery } from "react-query";
import {
  BeanFormData,
  BrewMethodFormData,
  FeedbackFormData,
  GrinderFormData,
  JournalEntryData,
} from "types";
import { get, post } from "./utils/fetch";

export async function createBean(data: BeanFormData): Promise<Bean> {
  const response = await post("/api/create-bean", data);
  return response.json();
}

export async function updateBrewMethod(
  data: BrewMethodFormData
): Promise<Pick<Setup, "brewMethod">> {
  const response = await post("/api/create-update-brew-method", data);
  return response.json();
}

export async function updateSetupGrinder(
  data: GrinderFormData
): Promise<Setup> {
  const response = await post("/api/update-setup-grinder", data);
  return response.json();
}

export type UseSetupData =
  | (Setup & {
      bean: Bean | null;
    })
  | null;

export function useSetup() {
  return useQuery<UseSetupData>("use-setup", async () => {
    const response = await get("/api/get-setup");
    const data = await response.json();
    return data;
  });
}

export async function createJournalEntry(
  data: Record<string, any>
): Promise<Journal> {
  const response = await post("/api/create-journal-entry", data);
  return response.json();
}

export function useJournalEntries() {
  return useQuery<{ [key: string]: JournalEntryData[] }>(
    "use-journal-entries",
    async () => {
      const response = await get("/api/get-journal-entries");
      const data = await response.json();
      return data;
    }
  );
}

export async function postFeedback(data: FeedbackFormData) {
  const response = await post("/api/feedback", data);
  return response.json();
}
