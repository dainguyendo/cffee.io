import { BrewMethod, Rating } from "db";
import React from "react";
import { Box, Flex, styled, Text } from "ui";
import { Blur } from "../ui/Blur";
import { Center } from "../ui/Center";
import { FullBleedLayout } from "../ui/FullBleedLayout";
import { JournalEntryCard } from "../ui/JournalEntryCard";
import { LandingNavigation } from "../ui/LandingNavigation";
import { useInterval } from "../ui/useInterval";
import { SAMPLE_EDITOR_CONTENT } from "../utils/editor";

const descriptions = [
  "coffee",
  "brews",
  "pour overs",
  "more coffee",
  "espresso",
  "lattes",
  "cortados",
];

const Hero = styled("div", {
  minHeight: "55vh",
  display: "flex",
  fd: "column",
  justifyContent: "center",
});

const FeaturesSection = styled("section", {
  py: "$7",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "stretch",
  gap: "$4",
});

const FeatureContainer = styled(Box, {
  background: "$secondary",
  flex: "1 1 225px",
  p: "$4",
  borderRadius: "$medium",
});

export default function Web() {
  const [descriptionIdx, set] = React.useState(
    Math.floor(Math.random() * descriptions.length)
  );

  useInterval(() => {
    set(Math.floor(Math.random() * descriptions.length));
  }, 2500);

  const randomDescription = descriptions[descriptionIdx];
  return (
    <>
      <FullBleedLayout>
        <Box as="section" css={{ position: "relative" }}>
          <Box
            aria-hidden
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
              width: "100%",
              height: "100%",
            }}
          >
            <Blur />
          </Box>
          <LandingNavigation />
          <Hero>
            <Flex direction="column">
              <Text css={{ fontSize: "$6" }}>The journal for</Text>
              <Text bold css={{ color: "$primary", fontSize: "$7" }}>
                {randomDescription}
              </Text>
            </Flex>
          </Hero>
        </Box>

        <Box
          className="full-bleed"
          css={{
            py: "$6",
            display: "grid",
            placeItems: "center",
            minHeight: 200,
            background: "$background",
          }}
        >
          <Text css={{ fontSize: "$6", ta: "center" }}>Enjoy every sip</Text>
          <Text bold css={{ fontSize: "$4", ta: "center" }}>
            It&apos;s simple, it&apos;s all cffee wants to do
          </Text>
        </Box>

        <Box
          as="section"
          className="full-bleed"
          css={{
            background:
              "linear-gradient(180deg, #faede6 0%, #fbf0ea 16%, #fcf3ee 33%, #fdf6f2 50%, #fdf9f7 66%, #fefcfb 83%, #ffffff 100%)",
          }}
        >
          <Center>
            <Box css={{ py: "$8", maxWidth: 450, width: "100%" }}>
              <JournalEntryCard
                journalEntry={{
                  id: "some-fake-id",
                  updatedAt: new Date(),
                  rating: Rating.VERY_GOOD,
                  brewMethod: BrewMethod.POUR_OVER,
                  grinder: "Niche Zero",
                  grindDescription: "",
                  waterTemperatureFahrenheit: 208,
                  bean: {
                    roast: "Companion Blend",
                    roaster: "Little Wolf",
                  },
                  note: SAMPLE_EDITOR_CONTENT,
                }}
              />
            </Box>
          </Center>
        </Box>

        <FeaturesSection>
          <FeatureContainer>
            <Text
              variant="heading"
              inline={false}
              bold
              css={{ fontSize: "$4" }}
            >
              Take notes
            </Text>
            <Text>
              Tasting notes or brewing changes. Anything to make to make coffee
              in your day, that much better.
            </Text>
          </FeatureContainer>

          <FeatureContainer>
            <Text
              variant="heading"
              inline={false}
              bold
              css={{ fontSize: "$4" }}
            >
              Adapts with you
            </Text>
            <Text>
              Whether trying new beans, or trying a new brew method - When
              it&apos;s brew time, Cffee will keep up with the change.
            </Text>
          </FeatureContainer>

          <FeatureContainer>
            <Text
              variant="heading"
              inline={false}
              bold
              css={{ fontSize: "$4" }}
            >
              Brew time
            </Text>
            <Text>
              Cffee&apos;s built in timer helps you brew with precision while
              moving that information to a journal with ease.
            </Text>
          </FeatureContainer>
        </FeaturesSection>
      </FullBleedLayout>
    </>
  );
}
