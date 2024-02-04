import { useMemo, MouseEventHandler, useState, useCallback } from "react";
import {
  Tag,
  Button,
  useDisclosure,
  Grid,
  GridItem,
  Tooltip,
} from "@chakra-ui/react";
import cs from "classnames";

import Loader from "@components/loader";
import Text from "@components/text";
import SearchTagInput from "@components/searchTagInput";

import styles from "./style.module.css";

interface ListOfTagsProps {
  items: Array<string>;
  loading: boolean;
  onClick: MouseEventHandler<HTMLElement>;
  isSelectedTag?: boolean;
}

function ListOfTags(props: ListOfTagsProps): JSX.Element {
  const { items, loading, onClick, isSelectedTag } = props;

  const [foundTags, setFoundTags] = useState<Array<string>>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const { isOpen, onToggle } = useDisclosure();

  const handleClick = useCallback(
    (text: string) => {
      const result = items.filter((tag) => tag.includes(text));
      setFoundTags(result);
      setIsSearched(true);
    },
    [items]
  );

  const handleCleanFilter = useCallback<MouseEventHandler<HTMLElement>>(
    (e) => {
      setSearchText("");
      setFoundTags([]);
      setIsSearched(false);

      onClick(e);
    },
    [onClick]
  );

  const tags = useMemo(() => {
    const tags = isSearched ? foundTags : items;

    return tags.slice(0, 300).map((tag) => {
      const needTooltip = tag.length > 9;

      return (
        <Tooltip key={tag} label={tag} isDisabled={!needTooltip} hasArrow>
          <Tag
            colorScheme="red"
            className={styles.tag}
            onClick={onClick}
            as={GridItem}
          >
            <Text fontSize="lg" className={styles.tagText}>
              {tag}
            </Text>
          </Tag>
        </Tooltip>
      );
    });
  }, [foundTags, isSearched, items, onClick]);

  const component = useMemo(() => {
    if (loading) return null;

    return (
      <Grid
        templateColumns="repeat(15, 1fr)"
        columnGap="10px"
        rowGap="10px"
        className={cs({
          [styles.hideTags]: !isOpen,
          [styles.containerTags]: true,
        })}
      >
        <SearchTagInput
          handleClick={handleClick}
          value={searchText}
          setter={setSearchText}
        />
        {tags}
      </Grid>
    );
  }, [handleClick, isOpen, loading, searchText, tags]);

  return (
    <div id="tag-focus" className={styles.container}>
      {component}
      {!loading && (
        <Button colorScheme="blue" variant="ghost" onClick={onToggle}>
          <Text fontSize="lg">
            {isOpen ? "View less tags" : "Show more tags"}
          </Text>
        </Button>
      )}
      {(isSelectedTag || isSearched) && (
        <Button colorScheme="blue" variant="ghost" onClick={handleCleanFilter}>
          <Text fontSize="lg">clean filter</Text>
        </Button>
      )}
    </div>
  );
}

export default ListOfTags;
