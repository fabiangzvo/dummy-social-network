import { useContext, useCallback, useMemo } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useMediaQuery,
} from "@chakra-ui/react";
import { HiChevronDown } from "react-icons/hi";
import { googleLogout } from "@react-oauth/google";
import _get from "lodash.get";

import Text from "@components/text";
import { UserInfoContext } from "@context/googleUserInfo";
import { AuthContext } from "@context/AuthContext";

import styles from "./style.module.css";

function UserOptions() {
  const { user } = useContext(UserInfoContext);
  const { refreshAuthContext, logout } = useContext(AuthContext);

  const [isMd] = useMediaQuery("(max-width: 1024px)");

  const { picture } = useMemo(() => {
    if (!user) return { picture: "" };

    const picture = (_get(user, "picture.data.url", "") ||
      _get(user, "picture", "")) as string;

    return { picture };
  }, [user]);

  const handleClick = useCallback(() => {
    logout();

    googleLogout();
  }, [logout]);

  const element = (
    <div className={isMd ? styles.contentCentered : styles.content}>
      <Text className={styles.name} fontSize="xl">
        {user?.name}
      </Text>
      <Text fontSize="md">{user?.email}</Text>
    </div>
  );

  return (
    <Menu>
      <MenuButton as={"button"}>
        <div className={styles.container}>
          {!isMd && element}
          &emsp;
          <Avatar src={picture} name={user?.name} />
          &emsp;
          <HiChevronDown size="2em" />
        </div>
      </MenuButton>
      <MenuList>
        {isMd && (
          <MenuItem as="span" minH="40px">
            {element}
          </MenuItem>
        )}
        <MenuItem minH="40px" onClick={handleClick}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserOptions;
