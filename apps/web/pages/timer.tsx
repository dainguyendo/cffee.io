import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { Page } from "../ui/Page";
import { Stopwatch } from "../ui/Stopwatch";

export default function Timer() {
  return (
    <Page>
      <Stopwatch />
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
