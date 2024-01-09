import { Spinner } from "@chakra-ui/react";

import styles from "./style.module.css";

function Loader() {
  return (
    <div className={styles.container}>
      <Spinner size="xl" />
    </div>
  );
}

export default Loader;
