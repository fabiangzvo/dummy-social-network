import { forwardRef, ForwardedRef, useMemo, MouseEventHandler } from "react";
import { Tag, Button, useDisclosure } from "@chakra-ui/react";

import Loader from "@components/loader";
import Text from "@components/text";

import styles from "./style.module.css";

interface ListOfTagsProps {
  items: Array<string>;
  loading: boolean;
  page: number;
  onClick: MouseEventHandler<HTMLElement>;
  isSelectedTag?: boolean;
}

const ListOfTags = forwardRef(function (
  props: ListOfTagsProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { items, loading, page, onClick, isSelectedTag } = props;

  const { isOpen, onToggle } = useDisclosure();

  const { header, body } = useMemo(() => {
    const tags = items.map((tag) => (
      <Tag colorScheme="red" key={tag} className={styles.tag} onClick={onClick}>
        <Text fontSize="lg">{tag.replace(/^\s/, "")}</Text>
      </Tag>
    ));

    const header = tags.slice(0, 24);
    const body = tags.slice(24);

    return { header, body };
  }, [items, onClick]);

  return (
    <div id="tag-focus" className={styles.container}>
      <div className={styles.postContainer}>{header}</div>
      <div className={styles.bodyContainer}>{isOpen && body}</div>
      {!loading && (
        <Button colorScheme="blue" variant="ghost" onClick={onToggle}>
          <Text fontSize="lg">
            {isOpen ? "View less tags" : "Show more tags"}
          </Text>
        </Button>
      )}
      {isSelectedTag && (
        <Button colorScheme="blue" variant="ghost" onClick={onClick}>
          <Text fontSize="lg" onClick={onClick}>
            clean filter
          </Text>
        </Button>
      )}
      <div ref={ref}>{loading && page !== 0 && <Loader />}</div>
    </div>
  );
});

ListOfTags.displayName = "ListOfTags";

export default ListOfTags;
