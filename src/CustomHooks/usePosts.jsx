import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { headerObjData } from "../Helpers/Headers";

export default function usePosts(queryKey, isEnabled, endpount) {
  // usePosts(['allPosts'], true, posts)
  const { data, isLoading, isFetched } = useQuery({
    queryFn: getAllPost,
    queryKey: [...queryKey],
    enabled: isEnabled,
  });

  async function getAllPost() {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/${endpount}`,
        headerObjData,
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  return { data, isLoading, isFetched };
}
