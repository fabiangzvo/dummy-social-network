import { useMemo } from "react";
import { motion, Spring } from "framer-motion";
import { FaSun, FaCloudMoon } from "react-icons/fa";
import { useColorMode } from "@chakra-ui/react";
import cs from "classnames";

import styles from "./style.module.css";

const spring: Spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

interface SwitchThemeProps {
  className?: string;
}

function SwitchTheme(props: SwitchThemeProps): JSX.Element {
  const { className = "" } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  const { isDarkMode, component } = useMemo(() => {
    const isDarkMode = colorMode === "dark";

    const component = isDarkMode ? <FaCloudMoon /> : <FaSun />;

    return { isDarkMode, component };
  }, [colorMode]);

  return (
    <div
      className={cs({ [styles.switch]: true, [className]: !!className })}
      data-on={isDarkMode}
      onClick={toggleColorMode}
    >
      <motion.div className={styles.handle} layout transition={spring}>
        {component}
      </motion.div>
    </div>
  );
}

export default SwitchTheme;
