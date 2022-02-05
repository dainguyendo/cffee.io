import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useJournalEntries } from "../api";
import { JournalEntriesTable } from "../ui/JournalEntriesTable";
import { Page } from "../ui/Page";
import { SetupSummary } from "../ui/SetupSummary";

export default function Home() {
  const { data } = useJournalEntries();

  return (
    <Page>
      <SetupSummary />

      <JournalEntriesTable data={data ?? []} />
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
