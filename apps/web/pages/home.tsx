import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Box, Flex } from "ui";
import { useJournalEntries } from "../api";
import { Center } from "../ui/Center";
import { JournalEntriesTable } from "../ui/JournalEntriesTable";
import { Page } from "../ui/Page";
import { SetupSummary } from "../ui/SetupSummary";

export default function Home() {
  const { data } = useJournalEntries();

  return (
    <Page>
      <Flex
        css={{
          fd: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "$6",
          height: "100%",
        }}
      >
        <SetupSummary />

        <JournalEntriesTable data={data ?? []} />
      </Flex>
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
