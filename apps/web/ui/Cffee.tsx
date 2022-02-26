import Link from "next/link";
import { Text } from "ui";

export const Cffee = () => (
  <Link href="/home">
    <a>
      <Text variant="heading" bold css={{ fontSize: "$7" }}>
        cffee
      </Text>
    </a>
  </Link>
);
