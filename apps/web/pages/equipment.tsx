import { BrewMethod } from "db";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { Coffee } from "react-feather";
import {
  Box,
  styled,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from "ui";
import { BeanForm } from "../ui/BeanForm";
import { BrewMethodForm } from "../ui/BrewMethodForm";
import { GrinderForm } from "../ui/GrinderForm";
import { Page } from "../ui/Page";
import { SetupSummary } from "../ui/SetupSummary";

export default function Equipment() {
  const { data: session, status } = useSession();

  const name = session?.user?.name;

  return (
    <Page>
      <Box css={{ p: "$8" }}>
        <Text>Equipment</Text>

        <SetupSummary />

        <Tabs defaultValue="beans">
          <TabsList>
            <TabsTrigger value="brew-method">
              <Text>Brew method</Text>
            </TabsTrigger>
            <TabsTrigger value="grinder">
              <Text>Grinder</Text>
            </TabsTrigger>
            <TabsTrigger value="beans">
              <Text>Beans</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="brew-method">
            <Text>Feeling different? Save your current brew style!</Text>
            <BrewMethodForm />
          </TabsContent>
          <TabsContent value="grinder">
            <Text>New grinder?!</Text>
            <GrinderForm />
          </TabsContent>
          <TabsContent value="beans">
            <Text>BEAAAANNNNS WTF</Text>

            <BeanForm />
          </TabsContent>
        </Tabs>
      </Box>
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
