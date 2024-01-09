import SocialNetwork from "@components/socialNetwork";
import Text from "@components/text";

import styles from "./style.module.css";

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.leftContent}>
        <Text fontSize="xl" className={styles.name}>
          Fabián Guzmán Otavo.
        </Text>
        <Text fontSize="lg" className={styles.copyRight}>
          All rights reserved © 2024
        </Text>
      </div>
      <div>
        <SocialNetwork />
      </div>
    </footer>
  );
}

export default Footer;
