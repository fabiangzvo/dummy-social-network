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

import Text from "@components/text";
import NoResultsFound from "@components/noResultsFound";
import SearchTagInput from "@components/searchTagInput";
import { useMediaQuery } from "@hooks/useMediaQuery";

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
  const isLg = useMediaQuery("(max-width: 1024px)");

  const onSearchTag = useCallback(
    (text: string) => {
      const isEmpty = text === "";

      if (!isEmpty) {
        const result = items.filter((tag) => tag.includes(text));

        setFoundTags(result);
        setIsSearched(true);
      } else {
        setIsSearched(false);
        setFoundTags([]);
      }
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

    if (isSearched && foundTags.length < 1) return <NoResultsFound />;

    return tags.slice(0, 300).map((tag) => {
      const needTooltip = tag.length > 9;

      return (
        <Tooltip
          key={tag}
          label={tag}
          isDisabled={!needTooltip}
          hasArrow
          bg="secondary"
        >
          <Tag className={styles.tag} onClick={onClick} as={GridItem}>
            <Text fontSize="lg" color="white">
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
        templateColumns={isLg ? "repeat(6, 1fr)" : "repeat(15, 1fr)"}
        columnGap="10px"
        rowGap="10px"
        className={cs({
          [styles.containerTags]: true,
          [styles.hideTags]: !isLg && !isOpen,
          [styles.hideLgTags]: isLg && !isOpen,
        })}
      >
        <SearchTagInput
          isLg={isLg}
          onSearchTag={onSearchTag}
          value={searchText}
          setter={setSearchText}
        />
        {tags}
      </Grid>
    );
  }, [loading, isLg, isOpen, onSearchTag, searchText, tags]);

  return (
    <div
      id="tag-focus"
      className={cs({ [styles.container]: true, [styles.marginRight]: isLg })}
    >
      {component}
      {!loading && (
        <Button colorScheme="blue" variant="ghost" onClick={onToggle}>
          <Text fontSize="lg">
            {isOpen ? "View less tags" : "Show more tags"}
          </Text>
        </Button>
      )}
      {(isSelectedTag || isSearched) && (
        <Button variant="ghost" onClick={handleCleanFilter}>
          <Text fontSize="lg">clean filter</Text>
        </Button>
      )}
    </div>
  );
}

export default ListOfTags;
