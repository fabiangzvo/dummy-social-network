import { SimpleGrid, Box } from "@chakra-ui/react";

import Heading from "@components/heading";
import UserOptions from "@components/userOptions";

import styles from "./style.module.css";

function Navbar() {
  return (
    <SimpleGrid columns={2} className={styles.container}>
      <Box className={styles.item}>
        <Heading size="xl">Dummy app</Heading>
      </Box>
      <Box className={styles.rightContent}>
        <UserOptions />
      </Box>
    </SimpleGrid>
  );
}

export default Navbar;
