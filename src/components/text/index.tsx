import { Text as ChakraText, TextProps } from "@chakra-ui/react";
import { Figtree } from "next/font/google";
import cs from "classnames";

import styles from "./style.module.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--figtree",
});

interface TextComponentProps extends TextProps {
  isSecondary?: boolean;
}

function Text(props: TextComponentProps) {
  const { isSecondary = false, children, className = "", ...textProps } = props;

  return (
    <ChakraText
      className={cs({
        [className]: !!className,
        [styles.text]: !isSecondary,
        [styles.paragraph]: isSecondary,
      })}
      style={figtree.style}
      {...textProps}
    >
      {children}
    </ChakraText>
  );
}

export default Text;
