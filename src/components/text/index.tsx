import { Text as ChakraText, TextProps } from "@chakra-ui/react";
import { Children } from "react";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--figtree",
});

interface TextPropsInterface extends TextProps {}

function Text(props: TextProps) {
  const { children, ...textProps } = props;
  return (
    <ChakraText style={figtree.style} {...textProps}>
      {children}
    </ChakraText>
  );
}

export default Text;
