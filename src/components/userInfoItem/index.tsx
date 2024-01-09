import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import moment from "moment";

import { UserInfoItem } from "@/types/User";
import Text from "@components/text";

import styles from "./style.module.css";

type UserInfoItemProps = Omit<UserInfoItem, "key"> & {
  value: string;
};

function UserInfoItem(props: UserInfoItemProps) {
  const { icon, value, label, type = "text", color = "#FED7D7" } = props;

  const formatValue = useMemo(() => {
    if (type === "date") {
      return moment(value).format("DD MMMM YYYY ");
    }

    return value;
  }, [type, value]);

  return (
    <Box bg={color} rounded="lg">
      <div className={styles.item}>
        <Text className={styles.subItem} fontSize="2xl">
          {label}
        </Text>
        <Text className={styles.title} fontSize="2xl">
          {icon}
          &nbsp;
          {formatValue}
        </Text>
      </div>
    </Box>
  );
}

export default UserInfoItem;
