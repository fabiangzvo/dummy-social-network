import { useCallback, useEffect, useState } from "react";
import { Albert_Sans } from "next/font/google";

import { getPosts, getPostsByTag } from "@api/post";
import { Post } from "@/types/Post";
import { FetchDataInterface } from "@/types/Paginate";
import useDataFetch from "@hooks/useDataFetch";
import Tags from "@components/tags";
import ListOfPosts from "@components/listOfPosts";
import { PaginateApiResponse } from "@/types/Paginate";

const AlbertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--albert-sans",
});

function Home() {
  const [posts, setPosts] = useState([] as Post[]);
  const [tag, setTag] = useState("");

  const fetchData = useCallback(
    async ({ page }: FetchDataInterface) => {
      let response: PaginateApiResponse<Post>;

      if (tag) {
        response = await getPostsByTag({
          page,
          tagId: tag,
        });
      } else {
        response = await getPosts({
          page,
        });
      }

      const { data, page: currentPage, total } = response;

      setPosts([...posts, ...data]);

      return { total, page: currentPage };
    },
    [posts, tag]
  );

  const { ref, loading, reset } = useDataFetch({ fetchData });

  useEffect(() => {
    if (tag) {
      reset();
      setPosts([]);
    }
  }, [tag, reset]);

  useEffect(() => {
    if (posts.length > 0) {
      document.getElementById("tag-focus")?.focus;
    }
  }, [posts.length]);

  const handleClick = useCallback<React.MouseEventHandler<HTMLSpanElement>>(
    (event) => {
      event.preventDefault();
      const value = event.currentTarget.innerText;

      if (value === "clean filter") {
        setTag("");
        reset();
        setPosts([]);

        return;
      }

      setTag(value);
    },
    [reset]
  );

  return (
    <main id="main" className={AlbertSans.className}>
      <Tags isSelectedTag={!!tag} onClick={handleClick} />
      <ListOfPosts items={posts} loading={loading} ref={ref} />
    </main>
  );
}

export default Home;
