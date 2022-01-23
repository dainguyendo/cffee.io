import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { Text } from "ui";

export default function Journal() {
  const { data: session, status } = useSession();

  const name = session?.user?.name;

  return (
    <>
      <Text>Timer page</Text>
    </>
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
