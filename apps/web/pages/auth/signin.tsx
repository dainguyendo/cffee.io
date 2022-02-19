import { InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import { Box, Button, Flex, Spacer, styled, Text } from "ui";

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
          <Text bold css={{ fontSize: "$3", color: "$gray400" }}>
            Let&apos;s brew
          </Text>
          <Text as="h1" bold css={{ fontSize: "$7" }}>
            cffee
          </Text>
          <Spacer direction="vertical" size="4" />
          <Flex direction="column" css={{ gap: "$2" }}>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <Button
                  type="button"
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: location.origin + "/home",
                    })
                  }
                >
                  Sign in with {provider.name}
                </Button>
              </div>
            ))}
          </Flex>
        </div>
      </Main>
      <Box
        css={{
          background:
            "linear-gradient(62deg, #f37286 0%, #ef81ae 16%, #ec90cc 33%, #ea9ee2 50%, #d6b5e8 66%, #d0c5e8 83%, #d2d2e9 100%)",
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
