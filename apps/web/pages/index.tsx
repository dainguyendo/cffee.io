import { AppHeader } from "../ui/AppHeader";
import { FullBleedLayout } from "../ui/FullBleedLayout";
import { Hero } from "../ui/Hero";

export default function Web() {
  return (
    <FullBleedLayout css={{ height: "100vh", background: "$background" }}>
      <AppHeader />
      <Hero className="full-bleed" />
    </FullBleedLayout>
  );
}
