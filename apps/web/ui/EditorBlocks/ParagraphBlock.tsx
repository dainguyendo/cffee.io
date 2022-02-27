import { motion } from "framer-motion";

interface Props {
  attributes?: Record<string, any>;
}

export const ParagraphBlock: React.FC<Props> = ({ attributes, children }) => {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      {...attributes}
    >
      {children}
    </motion.p>
  );
};
