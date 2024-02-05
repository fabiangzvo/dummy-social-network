import { forwardRef, ForwardedRef, useMemo } from "react";

import { Post } from "@/types/Post";
import PostCard from "@components/postCard";
import Loader from "@components/loader";
import NoResultsFound from "@components/noResultsFound";
import { useMediaQuery } from "@hooks/useMediaQuery";

import styles from "./style.module.css";

interface ListOfPostsProps {
  items: Array<Post>;
  loading: boolean;
}

const ListOfPosts = forwardRef(function (
  props: ListOfPostsProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { items, loading } = props;

  const isLg = useMediaQuery("(max-width: 1024px)");

  const posts = useMemo(() => {
    if (items.length < 1 && !loading) return <NoResultsFound />;

    return items.map((post) => <PostCard key={post.id} {...post} />);
  }, [items, loading]);

  return (
    <div className={isLg ? styles.lgContainer : styles.postContainer}>
      {posts}
      <div ref={ref}>{loading && <Loader />}</div>
    </div>
  );
});

ListOfPosts.displayName = "ListOfPosts";

export default ListOfPosts;
