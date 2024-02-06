import { useMemo } from "react";
import Image from "next/image";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import moment from "moment";
import {
  Card,
  Tag,
  useDisclosure,
  CardBody,
  IconButton,
  CardFooter,
  Button,
} from "@chakra-ui/react";

import Text from "@components/text";
import { Post } from "@/types/Post";
import Comments from "@components/comments";
import { useMediaQuery } from "@hooks/useMediaQuery";
import UserCardHeader from "@components/userCardHeader";
import UserInfo from "@components/userInfo";

import styles from "./style.module.css";

interface PostCardProps extends Post {
  className?: string;
}

function PostCard(props: PostCardProps) {
  const { text, image, likes, owner, publishDate, tags, id, className } = props;

  const { isOpen, onToggle, onClose } = useDisclosure();
  const {
    isOpen: isUserOpen,
    onToggle: onToggleUser,
    onClose: onUserClose,
  } = useDisclosure();
  const isLg = useMediaQuery("(max-width: 1024px)");

  const { tagList, fullName, publish } = useMemo(() => {
    const fullName = `${owner.firstName} ${owner.lastName}`;
    const publish = `Published: ${moment(publishDate).format("DD MMMM YYYY ")}`;
    console.log({ publishDate, publish });
    const tagList = tags.map((tag, id) => (
      <Tag
        key={`${tag}-${id}`}
        colorScheme="red"
        className={styles.tagItem}
        borderRadius="full"
      >
        <Text fontSize="lg" color="white">
          {tag}
        </Text>
      </Tag>
    ));

    return { tagList, fullName, publish };
  }, [owner.firstName, owner.lastName, publishDate, tags]);

  return (
    <Card
      id={isLg ? styles.cardLgContainer : styles.cardContainer}
      className={className}
      maxW="xl"
    >
      <UserCardHeader
        fullName={fullName}
        ownerId={owner.id}
        photo={owner.picture}
        textSecondary={publish}
      />
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={image}
          width={400}
          height={500}
          alt={text}
          priority
        />
      </div>
      <div className={styles.tagContainer}>{tagList}</div>
      <Text fontSize="xl" style={{ paddingLeft: 15 }} isTitle>
        {text}
      </Text>
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button
          id="button-without-animation"
          flex="1"
          leftIcon={<FaRegHeart />}
        >
          <Text fontSize="xl" isTitle>
            {likes}&nbsp;Likes
          </Text>
        </Button>
        <Button
          flex="1"
          variant="ghost"
          leftIcon={<FaRegComment />}
          onClick={onToggle}
        >
          <Text fontSize="xl" isTitle>
            Comments
          </Text>
        </Button>
      </CardFooter>
      <Comments
        isOpen={isOpen}
        onClose={onClose}
        postId={id}
        image={image}
        description={text}
        name={fullName}
        photo={owner.picture}
        publishedAt={publish}
      />
      <UserInfo isOpen={isUserOpen} onClose={onUserClose} userId={owner.id} />
    </Card>
  );
}

export default PostCard;
