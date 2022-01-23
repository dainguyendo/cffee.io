import { styled, theme } from "ui";

const Layout = styled("div", {
  overflow: "hidden",

  "& > *": {
    display: "flex",
    flexWrap: "wrap",
  },

  "& > * > *": {
    flexGrow: 1,
  },

  variants: {
    noStretch: {
      true: {
        "& > *": {
          alignItems: "flex-start",
        },
      },
    },

    wrapReverse: {
      true: {
        "& > *": {
          flexWrap: "wrap-reverse",
        },
      },
    },

    side: {
      left: {
        "& > * > :first-child": {
          flexBasis: 0,
          flexGrow: 999,
        },
      },
      right: {
        "& > * > :last-child": {
          flexBasis: 0,
          flexGrow: 999,
        },
      },
    },
  },
});

interface Props {
  side?: "left" | "right";
  contentMin?: string;
  noStretch?: boolean;
  sideWidth?: string;
  space?: keyof typeof theme.space;
  wrapReverse?: boolean;
}

export const SidebarLayout: React.FC<Props> = ({
  children,
  contentMin = "50%",
  noStretch = false,
  side = "left",
  sideWidth = "25%",
  space = "1",
  wrapReverse = false,
}) => {
  const marginCss = {
    "& > *": {
      margin: `calc($${space} / 2 * - 1)`,
    },
  };

  const sideWidthCss = {
    "& > * > *": {
      flexBasis: `${sideWidth}`,
      margin: `calc($${space} / 2)`,
    },
  };

  const minWidthCss =
    side === "left"
      ? {
          "& > * > :first-child": {
            minWidth: `calc(${contentMin} - $${space})`,
          },
        }
      : {
          "& > * > :last-child": {
            minWidth: `calc(${contentMin} - $${space})`,
          },
        };

  return (
    <Layout
      side={side}
      wrapReverse={wrapReverse}
      noStretch={noStretch}
      css={{
        ...marginCss,
        ...sideWidthCss,
        ...minWidthCss,
      }}
    >
      {children}
    </Layout>
  );
};
