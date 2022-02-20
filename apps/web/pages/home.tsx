import { format, parse } from "date-fns";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { Flex, Text } from "ui";
import { useJournalEntries } from "../api";
import { JournalEntryCard } from "../ui/JournalEntryCard";
import { Page } from "../ui/Page";
import { SetupSummary } from "../ui/SetupSummary";

export default function Home() {
  const { data } = useJournalEntries();
  console.log({ data });

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

        {data &&
          Object.entries(data).map(([date, entriesForDate]) => {
            const parsed = parse(date, "MMddyyyy", new Date());
            const formatted = format(parsed, "LLL do, yy");
            return (
              <React.Fragment key={date}>
                <Text variant="heading">{formatted}</Text>
                <Flex direction="column" css={{ width: "100%", gap: "$2" }}>
                  {entriesForDate.map((entry) => {
                    return (
                      <JournalEntryCard key={entry.id} journalEntry={entry} />
                    );
                  })}
                </Flex>
              </React.Fragment>
            );
          })}
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
