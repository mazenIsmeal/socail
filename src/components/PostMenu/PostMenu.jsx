import axios from "axios";
import { Dropdown, DropdownItem } from "flowbite-react";
import React, { useContext, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { getHeaders } from "../../Helpers/Headers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Contexts/AuthContextProvider";
import toast from "react-hot-toast";
import EditPost from "../EditPost/EditPost";

export default function PostMenu({ post, feed, setUpdatePostId }) {
  const queryClient = useQueryClient();
  const [save, setSave] = useState(post.bookmarked || false);
  const { userData, getLoggedData } = useContext(AuthContext);
  //save post
  async function savePost() {
    try {
      const res = await axios.put(
        `https://route-posts.routemisr.com/posts/${post._id}/bookmark`,
        {},
        getHeaders(),
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

  // Delete Post
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

  async function deletePost() {
    try {
      const respone = await axios.delete(
        `https://route-posts.routemisr.com/posts/${post._id}`,
        getHeaders(),
      );
      console.log(respone, "delete");

      return respone;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
            <DropdownItem onClick={() => setUpdatePostId(post._id)}>
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
    </>
  );
}
