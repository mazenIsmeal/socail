import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import usePosts from "../../CustomHooks/usePosts";
import PostCardSkeleton from "../../components/PostCard/PostCardSkeleton/PostCardSkeleton";
import PostCard from "../../components/PostCard/PostCard";
import CommentWrapper from "../../components/CommentWrapper/CommentWrapper";

export default function SinglePost() {
  const [activePostId, setActivePostId] = useState();
  const { id } = useParams();
  const { data, isLoading, isFetched } = usePosts(
    ["singlePost", id],
    true,
    `posts/${id}`,
  );
  console.log(data);
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 bg-gray-100">
      <div>
        <Link to="/">Back</Link>
      </div>
      {isLoading && <PostCardSkeleton />}
      {isFetched && (
        <PostCard post={data.data.post} setActivePostId={setActivePostId} />
      )}
    </div>
  );
}
