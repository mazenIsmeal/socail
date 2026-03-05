// import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, TextInput, Avatar } from "flowbite-react";
import PostCard from "./../../components/PostCard/PostCard";
import { AuthContext } from "../../Contexts/AuthContextProvider";
// import usePosts from "../../CustomHooks/usePosts";
import PostCardSkeleton from "../../components/PostCard/PostCardSkeleton/PostCardSkeleton";
import AddPost from "../../components/AddPost/AddPost";
import CommentWrapper from "../../components/CommentWrapper/CommentWrapper";
import ProfileCover from "../../components/ProfileCover/ProfileCover";
import axios from "axios";
import { headerObjData } from "../../Helpers/Headers";
import { useQuery } from "@tanstack/react-query";
import { PhotoProvider, PhotoView } from "react-photo-view";
import usePosts from "./../../CustomHooks/usePosts";
import { useState } from "react";

export default function UserProfile() {
  const { id } = useParams();
  console.log(id);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const [activePostId, setActivePostId] = useState();
  const {
    data: postData,
    isLoading: loadingPostData,
    isFetched,
  } = usePosts(["getPostUser"], true, `users/${id}/posts`);

  const { data, isLoading } = useQuery({
    queryFn: getUserProfile,
    queryKey: ["userProfile"],
  });

  function getUserProfile() {
    try {
      const response = axios.get(
        `https://route-posts.routemisr.com/users/${id}/profile`,
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
      <div className="min-h-screen bg-gray-100 my-20">
        <title>userProfile</title>
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          <div className="relative">
            {/* Cover */}
            {isLoading && <p>Loading..</p>}
            <div className="h-56 rounded-3xl bg-gradient-to-r from-slate-800 to-blue-400 relative cursor-pointer">
              <div className="absolute top-0 left-0 right-0">
                {data?.data?.data.user?.cover && (
                  <PhotoProvider>
                    <PhotoView src={data?.data?.data.user?.cover}>
                      <img
                        src={data?.data?.data.user?.cover}
                        alt={data?.data?.data.user?.name}
                        className="w-full h-56 object-cover"
                      />
                    </PhotoView>
                  </PhotoProvider>
                )}
              </div>
            </div>

            {/* Card */}
            <div className="bg-white rounded-3xl shadow-lg p-8 -mt-20 relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                {/* Left Side */}
                <div className="flex items-center gap-6">
                  <div className="relative w-32 h-32 group">
                    {/* Avatar Image */}
                    <PhotoProvider>
                      <PhotoView src={data?.data?.data.user?.photo}>
                        <img
                          src={data?.data?.data.user?.photo}
                          alt={data?.data?.data.user?.name}
                          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md cursor-pointer"
                        />
                      </PhotoView>
                    </PhotoProvider>

                    {/* Hover Overlay */}
                    <div className="absolute bottom-0 left-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-4">
                      {/* Zoom Icon */}

                      {/* Change Photo Icon */}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold">
                      {data?.data?.data.user?.name}
                    </h2>
                    <p className="text-gray-500">
                      @{data?.data?.data.user?.username?.toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Stats */}
              </div>

              {/* Bottom Section */}
              <div className="grid lg:grid-cols-3 gap-6 mt-8">
                {/* About */}
              </div>
            </div>
          </div>
          {/* My Posts */}
          <div className="space-y-6">
            {loadingPostData && <PostCardSkeleton />}
            {postData?.data?.posts?.length === 0 ? (
              <>
                <p class="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
                  No posts yet. Be the first one to publish.
                </p>
              </>
            ) : (
              <>
                {isFetched &&
                  postData?.data?.posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      setIsOpen={setIsOpen}
                      setActivePostId={setActivePostId}
                      isProfile
                    />
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
