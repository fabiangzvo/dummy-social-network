import { useState, MouseEventHandler, useEffect } from "react";
import { Box } from "@chakra-ui/react";

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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getInitialData() {
      setLoading(true);
      const { data } = await getTags({});

      const regex = new RegExp(/null|^(\s|\t|\()\1*/g);

      const listOfTags = data.reduce(
        (tagList: Array<string>, currentValue: string) => {
          const isEmpty =
            !currentValue ||
            regex.exec(currentValue) ||
            currentValue?.match(/#|\/|[0-9]/g) ||
            currentValue.length <= 3;

          if (isEmpty) return tagList;

          const tag = currentValue.replaceAll(/[\s]{2,}/g, "");

          return [...tagList, tag];
        },
        []
      );

      setTags(listOfTags);

      setLoading(false);
    }

    getInitialData();
  }, []);

  return (
    <Box className={style.container}>
      <ListOfTags
        items={tags}
        loading={loading}
        onClick={onClick}
        isSelectedTag={isSelectedTag}
      />
    </Box>
  );
}

export default Tags;
