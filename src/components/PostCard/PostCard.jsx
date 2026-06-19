// import React, { useContext, useState } from "react";
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
// import axios from "axios";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthContextProvider";
import { PhotoProvider, PhotoView } from "react-photo-view";
import CommentWrapper from "../CommentWrapper/CommentWrapper";
import SharePost from "../SharePost/SharePost";
import PostAction from "../PostAction/PostAction";
import PostMenu from "../PostMenu/PostMenu";
import { useState } from "react";
import EditPost from "../EditPost/EditPost";

export default function PostCard({ post, feed, updatePostId, setUpdatePostId }) {
  // const queryClient = useQueryClient();
  // const { userData, getLoggedData } = useContext(AuthContext);
  
  const [save, setSave] = useState(post.bookmarked || false);





  const result = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });




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
          <PostMenu post={post} setUpdatePostId={setUpdatePostId} feed={feed} />

        </div>

        {/* Content */}
        {updatePostId === post._id ? (
                <EditPost post={post} setUpdatePostId={setUpdatePostId} />
              ) : (
                <p className="mb-4">{post.body}</p>
              )}
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
       <PostAction feed={feed} post={post} />
      </div>
    </>
  );
}
