import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import moment from "moment";
import cs from "classnames";

import { UserInfoItem } from "@/types/User";
import Text from "@components/text";

import styles from "./style.module.css";

type UserInfoItemProps = Omit<UserInfoItem, "key"> & {
  value: string;
  isLg: boolean;
};

function UserInfoItem(props: UserInfoItemProps) {
  const {
    icon,
    value,
    label,
    type = "text",
    bg = "transparent",
    size = "medium",
    isLg = false,
  } = props;

  const { formatValue, isWhiteColor } = useMemo(() => {
    const isWhiteColor = size === "full" && bg !== "transparent";
    let formatValue: string = value;

    if (type === "date") {
      formatValue = moment(value).format("DD MMMM YYYY ");
    }

    return { formatValue, isWhiteColor };
  }, [bg, size, type, value]);

  return (
    <Box
      bg={bg}
      rounded="lg"
      id={cs({
        [styles.fullItem]: size === "full" && !isLg,
        [styles.border]: size !== "full",
      })}
    >
      <div className={styles.item}>
        <Text
          className={styles.subItem}
          fontSize="2xl"
          id={cs({
            [styles.whiteColor]: size === "full" && bg !== "transparent",
          })}
        >
          {label}
        </Text>
        <Text
          className={styles.title}
          fontSize="2xl"
          id={cs({
            [styles.whiteColor]: isWhiteColor,
          })}
        >
          {icon}
          &nbsp;
          {formatValue}
        </Text>
      </div>
    </Box>
  );
}

export default UserInfoItem;
