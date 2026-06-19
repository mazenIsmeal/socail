import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { getHeaders } from "../../Helpers/Headers";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaShare } from "react-icons/fa";
import SharePost from "../SharePost/SharePost";
import CommentWrapper from "../CommentWrapper/CommentWrapper";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PostAction({ feed, post }) {
    // const [openModal, setOpenModal] = useState(false);
  const [openModalShare, setOpenModalShare] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const queryClient = useQueryClient();

    function handleComment() {
    setShowComments(!showComments);
  }

    // like post
  async function likePost() {
    try {
      const res = await axios.put(
        `https://route-posts.routemisr.com/posts/${post._id}/like`,
        {},
        getHeaders(),
      );
      queryClient.invalidateQueries(["userPost"]);
      queryClient.invalidateQueries(["allPosts"]);

      console.log(res);

      return res;
    } catch (error) {
      console.log(error);
    }
  }


 const likeMutation = useMutation({
  mutationFn: likePost,

  onMutate: async () => {
    const previousPosts = queryClient.getQueryData([
      "feedPost",
      feed,
    ]);

    console.log("previousPosts", previousPosts);

    return { previousPosts };
  },

  setQueryData: (
  ["feedPost", feed],
  (oldData) => ({
    ...oldData,
    posts: oldData.posts.map((p) =>
      p._id === post._id
        ? {
            ...p,
            likesCount: p.likesCount + 1,
          }
        : p
    ),
  })
),

  onError: (err, variables, context) => {
    console.log("context", context);
    console.log("context.previousPosts", context?.previousPosts);
  },
});

  return (
    <>
    <div className="flex items-end justify-between gap-2 text-sm text-neutral-500">
          <div>
            <p
              className="cursor-pointer hover:underline"
            >
              {post.likesCount} likes
            </p>
          </div>
          <div className="flex gap-2.5">
            <p>{post.commentsCount} comment</p>
            <p>{post.sharesCount} shares</p>
            <Link to={`singlePost/${post._id}`} className="text-primary-500">
              view details
            </Link>
          </div>
        </div>
      {/* Actions */}
      <div className="flex justify-between text-gray-600 border-t pt-3">
        <button
          onClick={() => likeMutation.mutate()}
          className={`flex items-center gap-2 cursor-pointer ${
            post.likesCount === 1 ? "text-blue-600" : "hover:text-blue-600"
          }`}
        >
          <AiOutlineLike />
          Like ({post.likesCount})
        </button>

        <button
          onClick={handleComment}
          className="flex items-center gap-2 hover:text-green-600 cursor-pointer"
        >
          <FaRegComment /> Comment
        </button>

        <button
          onClick={() => setOpenModalShare(true)}
          className="flex items-center gap-2 hover:text-purple-600 cursor-pointer"
        >
          <FaShare /> Share
        </button>
      </div>
      <SharePost
        openModal={openModalShare}
        setOpenModal={setOpenModalShare}
        postId={post._id}
      />
      {showComments && (
        <div className="mt-4 border-t pt-4">
          <CommentWrapper activePostId={post._id} />
        </div>
      )}
    </>
  );
}
