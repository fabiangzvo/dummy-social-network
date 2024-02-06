import {
  Box,
  Avatar,
  IconButton,
  CardHeader,
  useDisclosure,
} from "@chakra-ui/react";
import { SlOptionsVertical } from "react-icons/sl";

import UserInfo from "@components/userInfo";
import Text from "@components/text";
import Heading from "@components/heading";

import styles from "./style.module.css";

interface UserCardHeaderProps {
  fullName: string;
  photo: string;
  textSecondary?: string;
  ownerId?: string;
}

function UserCardHeader(props: UserCardHeaderProps) {
  const { fullName, photo, textSecondary, ownerId = "" } = props;

  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <CardHeader>
        <div className={styles.container}>
          <div className={styles.head}>
            <Avatar name={fullName} src={photo} />
            <Box>
              <Heading size="md">{fullName}</Heading>
              {textSecondary && <Text fontSize="md">{textSecondary}</Text>}
            </Box>
          </div>
          {!!ownerId && (
            <IconButton
              variant="ghost"
              aria-label="See menu"
              icon={<SlOptionsVertical />}
              onClick={onToggle}
            />
          )}
        </div>
      </CardHeader>
      <UserInfo isOpen={isOpen} onClose={onClose} userId={ownerId} />
    </>
  );
}

export default UserCardHeader;
