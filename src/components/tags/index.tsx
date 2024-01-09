import { useCallback, useState, MouseEventHandler } from "react";
import { Box } from "@chakra-ui/react";

import { FetchDataInterface } from "@/types/Paginate";
import useDataFetch from "@hooks/useDataFetch";
import { getTags } from "@api/tag";
import ListOfTags from "@components/listOfTags";

import style from "./style.module.css";

interface TagsProps {
  onClick: MouseEventHandler<HTMLElement>;
  isSelectedTag?: boolean;
}

function Tags(props: TagsProps) {
  const { onClick, isSelectedTag = false } = props;

  const [tags, setTags] = useState([] as string[]);

  const fetchData = useCallback(
    async ({ page }: FetchDataInterface) => {
      const {
        data,
        total,
        page: currentPage,
      } = await getTags({
        page,
      });

      const regex = new RegExp(/null|^(\s|\t|\()\1*/g);

      const listOfTags = data.reduce(
        (tagList: Array<string>, currentValue: string) => {
          const isEmpty =
            !currentValue ||
            regex.exec(currentValue) ||
            currentValue?.match(/#|\/|[0-9]/g) ||
            currentValue.length <= 3;

          if (isEmpty) return tagList;

          return [...tagList, currentValue];
        },
        []
      );

      setTags([...tags, ...listOfTags.slice(0, 300)]);

      return { total, page: currentPage };
    },
    [tags]
  );

  const { ref, loading, page } = useDataFetch({ fetchData });

  return (
    <Box className={style.container}>
      <ListOfTags
        items={tags}
        loading={loading}
        ref={ref}
        page={page}
        onClick={onClick}
        isSelectedTag={isSelectedTag}
      />
    </Box>
  );
}

export default Tags;
