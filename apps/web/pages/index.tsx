import { AppHeader } from "../ui/AppHeader";
import { FullBleedLayout } from "../ui/FullBleedLayout";
import { Hero } from "../ui/Hero";

export default function Web() {
  return (
    <>
      <FullBleedLayout>
        <AppHeader />
        <Hero className="full-bleed" />
      </FullBleedLayout>
    </>
  );
}
