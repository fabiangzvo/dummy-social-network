import { Heading, HeadingProps } from "@chakra-ui/react";
import { Passion_One } from "next/font/google";
import cs from "classnames";

import styles from "./style.module.css";

const passionOne = Passion_One({
  subsets: ["latin"],
  variable: "--passion-one",
  weight: "400",
});

function HeadingComponent(props: HeadingProps) {
  const { children, className = "", ...headingProps } = props;

  return (
    <Heading
      className={cs({ [className]: true, [styles.heading]: true })}
      style={passionOne.style}
      {...headingProps}
    >
      {children}
    </Heading>
  );
}

export default HeadingComponent;
