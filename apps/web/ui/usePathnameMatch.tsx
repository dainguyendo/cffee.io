import { useRouter } from "next/router";

export function usePathnameMatch() {
  const router = useRouter();
  const isHomeActive = router.pathname === "/home";
  const isEquipmentActive = router.pathname === "/equipment";
  const isTimerActive = router.pathname === "/timer";

  return {
    isHomeActive,
    isEquipmentActive,
    isTimerActive,
  };
}
