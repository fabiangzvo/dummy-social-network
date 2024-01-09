import { SimpleGrid, Box, Heading } from "@chakra-ui/react";
import { Passion_One } from "next/font/google";

import UserOptions from "@components/userOptions";

import styles from "./style.module.css";

const passionOne = Passion_One({
  subsets: ["latin"],
  variable: "--passion-one",
  weight: "400",
});

function Navbar() {
  return (
    <SimpleGrid columns={2} className={styles.container}>
      <Box className={styles.item}>
        <Heading style={passionOne.style} size="xl">
          Dummy app
        </Heading>
      </Box>
      <Box className={styles.rightContent}>
        <UserOptions />
      </Box>
    </SimpleGrid>
  );
}

export default Navbar;
