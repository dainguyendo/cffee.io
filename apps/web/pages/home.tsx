import { formatDistanceToNow, parse } from "date-fns";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Box, Flex, IconButton, Text } from "ui";
import { useJournalEntries } from "../api";
import { Center } from "../ui/Center";
import { JournalEntryCard } from "../ui/JournalEntryCard";
import { LoaderBoxes } from "../ui/LoaderBoxes";
import { Page } from "../ui/Page";
import { SetupSummary } from "../ui/SetupSummary";

export default function Home() {
  const [page, setPage] = React.useState(0);
  const { data, status, isFetching, isPreviousData } = useJournalEntries(page);

  const hasMore =
    (data?.pagination?.currentPage ?? false) <
    (data?.pagination?.pageCount ?? false);

  return (
    <Page>
      <Flex
        css={{
          fd: "column",
          alignItems: "center",
          gap: "$6",
          height: "100%",
          pt: "$6",
        }}
      >
        <SetupSummary />

        <Flex css={{ alignSelf: "flex-end", gap: "$1" }}>
          <IconButton
            type="button"
            raised
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0 || isFetching}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            type="button"
            raised
            onClick={() => setPage((old) => (hasMore ? old + 1 : old))}
            disabled={isPreviousData || !hasMore || isFetching}
          >
            <ChevronRight />
          </IconButton>
        </Flex>

        {status === "loading" && (
          <Center css={{ size: 300 }}>
            <LoaderBoxes />
          </Center>
        )}

        {status === "success" &&
          data &&
          data.data &&
          Object.entries(data.data).map(([date, entriesForDate]) => {
            const parsed = parse(date, "MMddyyyy", new Date());
            const distance = formatDistanceToNow(parsed, { addSuffix: true });
            return (
              <React.Fragment key={date}>
                <Text variant="paragraph" bold css={{ alignSelf: "flex-end" }}>
                  {distance}
                </Text>
                <Box
                  css={{
                    display: "grid",
                    width: "100%",
                    gap: "$2",
                    gridTemplateColumns: "repeat(2, 1fr)",
                  }}
                >
                  {entriesForDate.map((entry) => {
                    return (
                      <JournalEntryCard key={entry.id} journalEntry={entry} />
                    );
                  })}
                </Box>
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
