import { useSession } from "next-auth/react";
import { AppHeader } from "../ui/AppHeader";
import { FullBleedLayout } from "../ui/FullBleedLayout";
import { Hero } from "../ui/Hero";

export default function Web() {
  const { data: session, status } = useSession();

  return (
    <>
      <FullBleedLayout>
        <AppHeader />
        <Hero className="full-bleed" />
      </FullBleedLayout>
    </>
  );
}
