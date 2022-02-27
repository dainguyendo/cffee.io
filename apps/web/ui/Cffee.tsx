import { motion } from "framer-motion";
import Link from "next/link";
import { Text } from "ui";

interface Props {
  layout?: boolean;
}

export const Cffee = ({ layout = false }: Props) => (
  <motion.div layoutId={layout ? "app-name" : undefined}>
    <Link href="/home">
      <a>
        <Text variant="heading" bold css={{ fontSize: "$7" }}>
          cffee
        </Text>
      </a>
    </Link>
  </motion.div>
);
