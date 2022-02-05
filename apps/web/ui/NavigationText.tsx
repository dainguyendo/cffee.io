import { CSS, styled, Text } from "ui";

const ResponsiveText = styled(Text, {
  display: "none",

  "@bp2": {
    display: "block",
  },
});

export const NavigationText: React.FC<{
  color?: CSS["color"];
  bold?: React.ComponentProps<typeof Text>["bold"];
}> = ({ children, color = "$gray600", bold }) => {
  return (
    <ResponsiveText bold={bold} css={{ color }}>
      {children}
    </ResponsiveText>
  );
};
