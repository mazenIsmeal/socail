import React, { useContext, useEffect } from "react";
import { Textarea, Button } from "flowbite-react";
import { FaRegImage, FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getHeaders } from "../../Helpers/Headers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Contexts/AuthContextProvider";

export default function AddComment({ activePostId, commentUpdate }) {
  const queryClient = useQueryClient();
  const { userData } = useContext(AuthContext);
  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: {
      content: "",
      image: null,
    },
  });

  useEffect(() => {
    if (commentUpdate) {
      setValue("content", commentUpdate.content);
    }
  }, [commentUpdate]);

  async function updateComment() {
    try {
      const formData = new FormData();
      formData.append("content", getValues().content);
      if (getValues().image) {
        formData.append("image", getValues().image[0]);
      }
      const response = await axios.put(
        `https://route-posts.routemisr.com/posts/${activePostId}/comments/${commentUpdate._id}`,
        formData,
        getHeaders(),
      );
      console.log(response);
      queryClient.invalidateQueries(["commentsPost", activePostId]);
      reset();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const { mutate } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["commentsPost", activePostId]);
    },
    onError: () => {
      console.log("error");
    },
  });

  async function addComment(values) {
    console.log(values);
    try {
      const formData = new FormData();
      formData.append("content", values.content);

      if (values.image) {
        formData.append("image", values.image[0]);
      }
      const response = await axios.post(
        `https://route-posts.routemisr.com/posts/${activePostId}/comments`,
        formData,
        getHeaders(),
      );
      console.log(response);
      reset();
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <div className="flex gap-3 items-start">
        {/* Avatar */}
        <img
          src={userData?.photo}
          alt="user"
          className="w-10 h-10 rounded-full"
        />

        {/* Input Area */}
        <div className="flex-1">
          <form onSubmit={handleSubmit(mutate)}>
            <div className="relative">
              <Textarea
                placeholder="Comment as mazen..."
                rows={2}
                className="resize-none rounded-2xl pr-16"
                {...register("content")}
              />

              {(userData?._id === commentUpdate?.commentCreator._id) ===
              true ? (
                <>
                  <Button
                    pill
                    size="sm"
                    className="!absolute right-3 bottom-3"
                    onClick={updateComment}
                  >
                    <IoSend className="text-lg" />
                    update
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    pill
                    size="sm"
                    type="submit"
                    className="!absolute right-3 bottom-3"
                  >
                    <IoSend className="text-lg" />
                  </Button>
                </>
              )}
            </div>

            {/* Icons Row */}
            <div className="flex gap-4 mt-2 text-gray-500 text-lg">
              <input
                type="file"
                id="imgComment"
                className="hidden"
                {...register("image")}
              />
              <label htmlFor="imgComment">
                <FaRegImage className="cursor-pointer hover:text-blue-500 transition" />
              </label>
              <FaRegSmile className="cursor-pointer hover:text-yellow-500 transition" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
