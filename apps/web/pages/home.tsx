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

  const hasPages = !!data?.pagination.pageCount;
  const showNoEntries = !!(data?.pagination.total === 0);

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

        {hasPages && (
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
        )}

        {status === "loading" && (
          <Center css={{ size: 300 }}>
            <LoaderBoxes />
          </Center>
        )}

        {status === "success" && showNoEntries && (
          <Flex
            direction="column"
            css={{ ai: "center", vs: "$3", maxWidth: "60ch" }}
          >
            <Text as="h1" variant="heading" bold>
              📝 No journal entries
            </Text>
            <Flex direction="column" css={{ vs: "$2" }}>
              <Text as="p">
                Create your first entry! Future journals will appear here.
              </Text>
              <Text as="p">
                If you time your brews, use Cffee&apos;s <b>Timer</b> feature
                will help link your timing data to your journal entry.
              </Text>
              <Text as="p">
                Use Cffee&apos;s <b>Equipment</b> feature to save frequently
                used equipment for efficient journal entries.
              </Text>
            </Flex>
          </Flex>
        )}

        {status === "success" &&
          data &&
          data.page &&
          Object.entries(data.page).map(([date, entriesForDate]) => {
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
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
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
