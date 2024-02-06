import { Box, ListItem } from "@chakra-ui/react";

import UserCardHeader from "@components/userCardHeader";
import Text from "@components/text";

import styles from "./style.module.css";

interface CommentItemProps {
  id: string;
  fullName: string;
  ownerId: string;
  photo: string;
  message: string;
  publishText: string;
}

function CommentItem(props: CommentItemProps) {
  const { id, fullName, ownerId, photo, message, publishText } = props;
  return (
    <ListItem id={styles.container} key={id}>
      <UserCardHeader
        fullName={fullName}
        ownerId={ownerId}
        photo={photo}
        textSecondary={publishText}
      />
      <Box className={styles.containerComment}>
        <Text fontSize="xl" className={styles.comment} isTitle>
          {message}
        </Text>
      </Box>
    </ListItem>
  );
}

export default CommentItem;
