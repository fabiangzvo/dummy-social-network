import SocialNetwork from "@components/socialNetwork";
import Text from "@components/text";
import { useMediaQuery } from "@hooks/useMediaQuery";

import styles from "./style.module.css";

function Footer() {
  const isLg = useMediaQuery("(max-width: 1024px)");
  const isMd = useMediaQuery("(max-width: 768px)");

  return (
    <footer className={isMd ? styles.mdContainer : styles.container}>
      <div className={styles.leftContent} style={{ order: isMd ? 2 : 1 }}>
        <Text
          fontSize={isLg ? "lg" : "xl"}
          className={styles.fontColor}
          fontWeight={900}
        >
          Dummy app
        </Text>
        <Text fontSize={isLg ? "sm" : "lg"} className={styles.fontColor}>
          All rights reserved © 2024
        </Text>
      </div>
      <div style={{ order: isMd ? 1 : 2 }}>
        <Text
          fontSize={isLg ? "sm" : "lg"}
          className={styles.fontColor}
          fontWeight="bold"
        >
          Follow me:&nbsp;
        </Text>
        <SocialNetwork />
      </div>
    </footer>
  );
}

export default Footer;
