import React from 'react'
import { getHeaders } from '../../Helpers/Headers';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

export default function EditPost({post, setUpdatePostId}) {
const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      body: post.body,
      image: post.image,
    },
  });

  async function updatePost(values) {
    try {
      const formData = new FormData();
      formData.append("body", values.body);
      formData.append("image", values.image);
      const response = await axios.put(
        `https://route-posts.routemisr.com/posts/${post._id}`,
        formData,
        getHeaders(),
      );
      console.log(response);
      setUpdatePostId(null);
      queryClient.invalidateQueries(["userPost"]);
      queryClient.invalidateQueries(["allPosts"]);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  return <>
    <div>
        <form onSubmit={handleSubmit(updatePost)}>
            <textarea name="body" id="body" cols="30" rows="10" className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" {...register("body")}></textarea>
            <button  className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded">
                Update
            </button>
            <button onClick={() => setUpdatePostId(null)} className="bg-gray-500 cursor-pointer text-white px-4 py-2 rounded">
                Cancel
            </button>
        </form>
    </div>
  </>
}
