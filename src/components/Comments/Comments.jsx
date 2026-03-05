import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContextProvider";
import { Dropdown, DropdownItem } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { headerObjData } from "../../Helpers/Headers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Comments({ comment, setCommentUpdate, activePostId }) {
  const { userData } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["commentsPost", activePostId]);
    },
    onError: () => {
      console.log("someThing error Pleas try agien");
    },
  });

  async function deleteComment() {
    try {
      const response = await axios.delete(
        `https://route-posts.routemisr.com/posts/${activePostId}/comments/${comment._id}`,
        headerObjData,
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div key={comment._id} className="bg-gray-100 my-5 p-2 rounded-2xl">
        <div className="flex items-center gap-2.5">
          <img
            className="size-10 rounded-full"
            src={comment.commentCreator.photo}
            alt={comment.commentCreator.name}
          />
          <div>
            <Link
              to={`userProfile/${comment.commentCreator._id}`}
              className="text-sm text-neutral-500"
            >
              {comment.commentCreator.name}
            </Link>
            <p>
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </p>
            <p className="text-xl text-neutral-500">{comment.content}</p>
            {comment.image && (
              <img
                src={comment.image}
                alt={comment.content}
                className="size-20 object-cover"
              />
            )}
          </div>
          <div>
            {userData._id === comment.commentCreator._id && (
              <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() => <BsThreeDots />}
              >
                <DropdownItem onClick={mutate}>
                  {isPending ? "deleting..." : "delete"}
                </DropdownItem>
                <DropdownItem onClick={() => setCommentUpdate(comment)}>
                  edit
                </DropdownItem>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
