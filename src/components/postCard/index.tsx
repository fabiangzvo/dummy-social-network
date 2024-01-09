import { useMemo } from "react";
import Image from "next/image";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import moment from "moment";
import {
  Card,
  Tag,
  useDisclosure,
  CardBody,
  CardFooter,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";

import Text from "@components/text";
import { Post } from "@/types/Post";
import Comments from "@components/comments";
import UserCardHeader from "@components/userCardHeader";

import styles from "./style.module.css";

interface PostCardProps extends Post {
  className?: string;
}

function PostCard(props: PostCardProps) {
  const { text, image, likes, owner, publishDate, tags, id, className } = props;

  const { isOpen, onToggle, onClose } = useDisclosure();
  const [isMd] = useMediaQuery("(max-width: 1024px)");

  const { tagList, fullName, publish } = useMemo(() => {
    const fullName = `${owner.firstName} ${owner.lastName}`;
    const publish = `Published: ${moment(publishDate).format("DD MMMM YYYY ")}`;
    const tagList = tags.map((tag, id) => (
      <Tag
        key={`${tag}-${id}`}
        colorScheme="red"
        className={styles.tagItem}
        borderRadius="full"
      >
        <Text fontSize="lg">{tag}</Text>
      </Tag>
    ));

    return { tagList, fullName, publish };
  }, [owner.firstName, owner.lastName, publishDate, tags]);

  return (
    <Card
      id={isMd ? styles.cardMdContainer : styles.cardContainer}
      className={className}
      maxW="xl"
    >
      <UserCardHeader
        fullName={fullName}
        ownerId={owner.id}
        photo={owner.picture}
        textSecondary={publish}
      />
      <CardBody>
        <Text fontSize="xl" style={{ paddingLeft: 15 }}>
          {text}
        </Text>
      </CardBody>
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
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <div className={styles.tagContainer}>{tagList}</div>
        <Button
          id="button-without-animation"
          flex="1"
          leftIcon={<FaRegHeart />}
        >
          <Text fontSize="xl">{likes}&nbsp;Likes</Text>
        </Button>
        <Button
          flex="1"
          variant="ghost"
          leftIcon={<FaRegComment />}
          onClick={onToggle}
        >
          <Text fontSize="xl">Comments</Text>
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
      />
    </Card>
  );
}

export default PostCard;