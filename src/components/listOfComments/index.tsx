import { useMemo } from "react";
import moment from "moment";
import { List } from "@chakra-ui/react";

import { CommentList } from "@/types/Comments";
import CommentItem from "@components/commentItem";
import Text from "@components/text";

import styles from "./style.module.css";

interface ListOfComments {
  comments: CommentList;
}

function CommentList(props: ListOfComments) {
  const { comments } = props;

  const commentList = useMemo(
    () =>
      comments.map((comment) => {
        const { id, message, owner, publishDate } = comment;

        const fullName = `${owner.firstName} ${owner.lastName}`;

        return (
          <CommentItem
            key={id}
            id={id}
            fullName={fullName}
            ownerId={owner.id}
            photo={owner.picture}
            message={message}
            publishText={`Published: ${moment(publishDate).format(
              "DD MMMM YYYY "
            )}`}
          />
        );
      }),
    [comments]
  );

  if (commentList.length <= 0)
    return (
      <Text fontSize="xl" className={styles.noContent} isTitle>
        No comments for this post
      </Text>
    );

  return (
    <List className={styles.list} spacing={3}>
      {commentList}
    </List>
  );
}

export default CommentList;
