import { useMemo } from "react";
import { SimpleGrid, Box, Divider, AbsoluteCenter } from "@chakra-ui/react";
import _get from "lodash.get";

import { UserDataList, UserFull } from "@/types/User";
import UserInfoItem from "@components/userInfoItem";
import Text from "@components/text";
import { useMediaQuery } from "@hooks/useMediaQuery";

import styles from "./style.module.css";

interface UserInfoSectionProps {
  title?: string;
  items: UserDataList;
  user: UserFull;
}

function UserInfoSection(props: UserInfoSectionProps) {
  const { items, title, user } = props;

  const isLg = useMediaQuery("(max-width: 1024px)");

  const fields = useMemo(
    () =>
      items.map(({ key, ...item }) => {
        const value = _get(user, key);

        return <UserInfoItem key={key} {...item} value={value} isLg={isLg} />;
      }),
    [user, items, isLg]
  );

  const titleComponent = useMemo(
    () =>
      title ? (
        <Box className={styles.divider}>
          <Divider />
          <AbsoluteCenter px="4">
            <Text fontSize="2xl" className={styles.title}>
              {title}
            </Text>
          </AbsoluteCenter>
        </Box>
      ) : null,
    [title]
  );

  return (
    <>
      {titleComponent}
      <SimpleGrid
        width="100%"
        columns={isLg ? 1 : 2}
        marginTop={!title ? "3em" : "auto"}
        spacing={2}
      >
        {fields}
      </SimpleGrid>
    </>
  );
}

export default UserInfoSection;
