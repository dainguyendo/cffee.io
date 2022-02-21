import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { Button, Flex, Separator, Text, VerticalStack } from "ui";
import { DeleteAccountDialog } from "../ui/DeleteAccountDialog";
import { Page } from "../ui/Page";
import { UserAvatar } from "../ui/UserAvatar";

export default function Profile() {
  const { data } = useSession();
  const user = data?.user;

  return (
    <Page>
      <section>
        <VerticalStack size="$4">
          <Text as="h1" variant="heading">
            Profile
          </Text>

          <Flex css={{ alignItems: "baseline", gap: "$2" }}>
            <div>
              <UserAvatar size="large" />
            </div>
            <Flex direction="column">
              <Text bold css={{ fontSize: "$3" }}>
                {user?.name}
              </Text>
              <Text>{user?.email}</Text>
            </Flex>
          </Flex>
        </VerticalStack>
      </section>

      <Separator css={{ backgroundColor: "$palepurple", my: "$6" }} />

      <section>
        <VerticalStack size="$4">
          <Text as="h1" variant="heading">
            Delete all my data
          </Text>
          <VerticalStack size="$2">
            <Text>🥺 Cffee no more?</Text>
            <DeleteAccountDialog>
              <Button
                type="button"
                variant="secondary"
                css={{ width: "fit-content" }}
              >
                Delete my account
              </Button>
            </DeleteAccountDialog>
          </VerticalStack>
        </VerticalStack>
      </section>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: await getSession(context),
    },
  };
};
