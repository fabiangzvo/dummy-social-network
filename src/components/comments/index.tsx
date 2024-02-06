import { useCallback, useState } from "react";
import Image from "next/image";
import { SimpleGrid, Box, Divider } from "@chakra-ui/react";

import Modal from "@components/modal";
import { getCommentsByPost } from "@api/comment";
import useDataFetch from "@hooks/useDataFetch";
import { FetchDataInterface } from "@/types/Paginate";
import { CommentList } from "@/types/Comments";
import ListOfComments from "@components/listOfComments";
import UserCardHeader from "@components/userCardHeader";
import Text from "@components/text";
import Loader from "@components/loader";
import { useMediaQuery } from "@hooks/useMediaQuery";

import styles from "./style.module.css";

interface CommentsProps {
  onClose: () => void;
  isOpen: boolean;
  postId: string;
  image: string;
  description: string;
  name: string;
  photo: string;
  publishedAt: string;
}

function Comments(props: CommentsProps) {
  const {
    isOpen,
    onClose,
    postId,
    image,
    description,
    name,
    photo,
    publishedAt,
  } = props;

  const [comments, setComments] = useState([] as CommentList);
  const isLg = useMediaQuery("(max-width: 1024px)");

  const fetchData = useCallback(
    async ({ page }: FetchDataInterface) => {
      const {
        data,
        total,
        page: currentPage,
      } = await getCommentsByPost({
        postId,
        page,
      });

      setComments([...comments, ...data]);

      return { total, page: currentPage };
    },
    [comments, postId]
  );

  const { ref, loading, page } = useDataFetch({ fetchData });

  const element = loading ? <Loader /> : <ListOfComments comments={comments} />;

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="6xl">
      <SimpleGrid
        className={styles.container}
        minH={isLg ? "auto" : "50vh"}
        columns={2}
        spacing={2}
      >
        <Box>
          <Image
            className={styles.image}
            src={image}
            width={500}
            height={500}
            alt={postId}
            priority
          />
        </Box>
        <Box className={styles.section}>
          <UserCardHeader
            fullName={name}
            photo={photo}
            textSecondary={publishedAt}
          />
          <Text className={styles.description} fontSize="xl">
            {description}
          </Text>
          <Divider />
          {!isLg && element}
          <div ref={ref}>{loading && page !== 0 && <Loader />}</div>
        </Box>
      </SimpleGrid>
      {isLg && element}
    </Modal>
  );
}

export default Comments;
