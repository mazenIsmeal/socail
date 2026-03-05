import React, { useContext, useEffect } from "react";
import { Image, Smile, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { headerObjData } from "../../Helpers/Headers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AuthContext } from "./../../Contexts/AuthContextProvider";

export default function AddPost({ editPost }) {
  const { userData } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: {
      body: "",
      image: null,
    },
  });

  useEffect(() => {
    if (editPost) {
      setValue("body", editPost.body);
    }
  }, [editPost]);

  async function updatePost() {
    try {
      const formData = new FormData();
      formData.append("body", getValues().body);
      formData.append("image", getValues().image);
      const response = await axios.put(
        `https://route-posts.routemisr.com/posts/${editPost._id}`,
        formData,
        headerObjData,
      );
      console.log(response);
      queryClient.invalidateQueries(["userPost"]);
      queryClient.invalidateQueries(["allPosts"]);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const { mutate } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["userPost"]);
      queryClient.invalidateQueries(["allPosts"]);
      toast.success("Successfully Create Post!");
    },
    onError: () => {
      toast.error("error Create Post!");
    },
  });

  async function addPost(values) {
    console.log(values);
    try {
      const formData = new FormData();
      formData.append("body", values.body);
      if (values.image) {
        formData.append("image", values.image[0]);
      }
      const response = await axios.post(
        "https://route-posts.routemisr.com/posts",
        formData,
        headerObjData,
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
    <div className="mt-2 bg-white rounded-2xl shadow-md p-4 max-w-2xl mx-auto">
      {/* Top Section */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={userData?.photo}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold text-gray-800">{userData?.name}</h4>
        </div>
      </div>

      {/* Textarea */}
      <form onSubmit={handleSubmit(mutate)}>
        <textarea
          placeholder="What's on your mind?"
          className="w-full bg-gray-100 rounded-xl p-4 resize-none outline-none focus:ring-2 focus:ring-blue-400 transition"
          rows="4"
          {...register("body")}
        />

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-6 text-gray-600">
            <input
              type="file"
              id="upload"
              className="hidden"
              {...register("image")}
            />
            <label
              htmlFor="upload"
              className="flex items-center gap-2 hover:text-green-500 transition"
            >
              <Image size={18} />
              <span>Photo/video</span>
            </label>
          </div>
          {editPost ? (
            <>
              <button
                onClick={updatePost}
                type="button"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl transition disabled:opacity-50"
              >
                <span>update</span>
                <Send size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl transition disabled:opacity-50"
              >
                <span>Post</span>
                <Send size={16} />
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
