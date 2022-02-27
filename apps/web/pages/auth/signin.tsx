import { InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import { Box, Button, Flex, Spacer, styled, Text, VerticalStack } from "ui";
import { Cffee } from "../../ui/Cffee";

const Page = styled("div", {
  width: "100vw",
  height: "100vh",
  display: "grid",
  gridTemplateColumns: "auto minmax(0, .5fr)",
});

const Main = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "$7",
  background: "$background",
});

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!providers) {
    return null;
  }

  return (
    <Page>
      <Main>
        <div>
          <Text as="p" bold css={{ fontSize: "$3" }}>
            Let&apos;s brew
          </Text>
          <Cffee layout />
          <VerticalStack size="$2">
            <Text>Continue with:</Text>
            <Flex direction="column" css={{ gap: "$2" }}>
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <Button
                    type="button"
                    onClick={() =>
                      signIn(provider.id, { callbackUrl: "/home" })
                    }
                  >
                    {provider.name}
                  </Button>
                </div>
              ))}
            </Flex>
          </VerticalStack>
        </div>
      </Main>
      <Box
        css={{
          background: "$gradient",
        }}
      ></Box>
    </Page>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
