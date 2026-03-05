import React, { useContext, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { formatDistanceToNow } from "./../../../node_modules/date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";
import axios from "axios";
import { headerObjData } from "../../Helpers/Headers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthContextProvider";
import { PhotoProvider, PhotoView } from "react-photo-view";
import CommentWrapper from "../CommentWrapper/CommentWrapper";

export default function PostCard({ post, setEditPost, feed }) {
  const queryClient = useQueryClient();
  const { userData, getLoggedData } = useContext(AuthContext);
  const [showComments, setShowComments] = useState(false);
  const [save, setSave] = useState(post.bookmarked || false);

  // state like
  // const [likesCount, setLikesCount] = useState(post.likesCount);
  // const [liked, setLiked] = useState(post.isLiked || false);
  // const [likesUsers, setLikesUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // console.log(post);

  const { mutate, isPending } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["userPost"]);
      queryClient.invalidateQueries(["allPosts"]);
      toast.success("Successfully Delete!");
    },
    onError: () => {
      alert("error some thing");
    },
  });

  function handleComment() {
    setShowComments(!showComments);
  }

  // Delete Post
  async function deletePost() {
    try {
      const respone = await axios.delete(
        `https://route-posts.routemisr.com/posts/${post._id}`,
        headerObjData,
      );
      console.log(respone, "delete");

      return respone;
    } catch (error) {
      console.log(error);
    }
  }

  const result = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  //save post
  async function savePost() {
    try {
      const res = await axios.put(
        `https://route-posts.routemisr.com/posts/${post._id}/bookmark`,
        {},
        headerObjData,
      );
      console.log(res);
      queryClient.invalidateQueries(["feedPost", feed]);
      setSave((prev) => !prev);
      await getLoggedData();
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  // like post
  async function likePost() {
    try {
      const res = await axios.put(
        `https://route-posts.routemisr.com/posts/${post._id}/like`,
        {},
        headerObjData,
      );
      queryClient.invalidateQueries(["userPost"]);
      queryClient.invalidateQueries(["allPosts"]);

      console.log(res);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
  // const likeMutation = useMutation({
  //   mutationFn: likePost,

  //   onMutate: async () => {
  //     setLiked((prev) => !prev);
  //   },

  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["allPosts"]);
  //   },

  //   onError: () => {
  //     console.log("error");
  //   },
  // });
  return (
    <>
      <div className="bg-white rounded-2xl shadow p-5 relative">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div
            className="flex items-center  gap-3 mb-4 cursor-pointer"
            onClick={() => console.log(post.user._id)}
          >
            <PhotoProvider>
              <PhotoView src={post.user.photo}>
                <img
                  src={post.user.photo}
                  className="size-10 rounded-full object-cover"
                  alt={post.user.name}
                />
              </PhotoView>
            </PhotoProvider>

            <Link to={`userProfile/${post.user._id}`}>
              <h3 className="font-semibold">{post.user.name}</h3>
              <p>{result}</p>
            </Link>
          </div>
          <div>
            <Dropdown
              label=""
              dismissOnClick={false}
              renderTrigger={() => <BsThreeDots />}
            >
              <DropdownItem onClick={savePost}>
                {save ? "Unsave" : "Save"}
              </DropdownItem>
              {userData._id === post.user._id && (
                <DropdownItem onClick={() => setEditPost(post)}>
                  edit
                </DropdownItem>
              )}

              {userData._id === post.user._id && (
                <DropdownItem onClick={mutate}>
                  {isPending ? "Deleting" : "Delete"}
                </DropdownItem>
              )}
            </Dropdown>
          </div>
        </div>

        {/* Content */}
        <p className="mb-4">{post.body}</p>
        {save && (
          <span className="bg-[#E7F3FF] text-blue-500 text-sm px-3 py-1 rounded-lg mb-3 block w-fit">
            Saved
          </span>
        )}
        {post.image && (
          <PhotoProvider>
            <PhotoView src={post.image}>
              <img
                src={post.image}
                alt={post.body}
                className="rounded-xl mb-4 w-full"
              />
            </PhotoView>
          </PhotoProvider>
        )}
        <div className="flex items-end justify-between gap-2 text-sm text-neutral-500">
          <div>
            <p
              className="cursor-pointer hover:underline"
              onClick={() => setOpenModal(true)}
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
            onClick={likePost}
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

          <button className="flex items-center gap-2 hover:text-purple-600 cursor-pointer">
            <FaShare /> Share
          </button>
        </div>
        {showComments && (
          <div className="mt-4 border-t pt-4">
            <CommentWrapper activePostId={post._id} />
          </div>
        )}
      </div>
      {/* <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>People who liked this post</ModalHeader>
        <ModalBody>
          <div className="space-y-3">
            {likesUsers?.length > 0 ? (
              likesUsers.map((user) => (
                <div key={user._id} className="flex items-center gap-3">
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{user.name}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No likes yet</p>
            )}
          </div>
        </ModalBody>
      </Modal> */}
    </>
  );
}
