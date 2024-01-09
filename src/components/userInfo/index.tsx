import { useEffect, useState } from "react";
import { Avatar } from "@chakra-ui/react";

import { UserFull } from "@/types/User";
import { getUserById } from "@api/user";
import UserInfoSection from "@components/userInfoSection";
import Modal from "@components/modal";
import Text from "@components/text";

import styles from "./style.module.css";
import {
  GENERAL_INFORMATION_LIST,
  LOCATION_INFORMATION_LIST,
} from "./constants";

interface UserInfoProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

function UserInfo(props: UserInfoProps) {
  const { isOpen, onClose, userId } = props;

  const [userInfo, setUserInfo] = useState<UserFull>({} as UserFull);

  useEffect(() => {
    async function fetchData() {
      if (!isOpen) return;

      const user = await getUserById(userId);

      setUserInfo(user);
    }

    fetchData();
  }, [userId, isOpen]);

  if (!userInfo) null;

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      containerClass={styles.containerBody}
    >
      <Avatar src={userInfo.picture} size="2xl" name={userInfo.firstName} />
      <Text fontSize="4xl">
        {userInfo.firstName} {userInfo.lastName}
      </Text>
      <UserInfoSection
        items={GENERAL_INFORMATION_LIST}
        title="General information"
        user={userInfo}
      />
      <UserInfoSection
        items={LOCATION_INFORMATION_LIST}
        title="Location"
        user={userInfo}
      />
    </Modal>
  );
}

export default UserInfo;
