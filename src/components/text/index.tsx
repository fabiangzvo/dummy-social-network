import { Text as ChakraText, TextProps } from "@chakra-ui/react";
import { Figtree } from "next/font/google";
import cs from "classnames";

import styles from "./style.module.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--figtree",
});

interface TextComponentProps extends TextProps {
  isTitle?: boolean;
}

function Text(props: TextComponentProps) {
  const { isTitle = false, children, className = "", ...textProps } = props;

  return (
    <ChakraText
      className={cs({
        [className]: true,
        [styles.text]: !isTitle,
        [styles.title]: isTitle,
      })}
      style={figtree.style}
      {...textProps}
    >
      {children}
    </ChakraText>
  );
}

export default Text;
