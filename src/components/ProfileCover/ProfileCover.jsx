import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContextProvider";
import { FaCamera } from "react-icons/fa";
import { FiMaximize2 } from "react-icons/fi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getHeaders } from "../../Helpers/Headers";
import { useQueryClient } from "@tanstack/react-query";
import { PhotoProvider, PhotoView } from "react-photo-view";

export default function ProfileCover({ data }) {
  const { userData, getLoggedData } = useContext(AuthContext);
  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      photo: null,
    },
  });

  // change cover
  const { register: registerCover, handleSubmit: handleSubmitCover } = useForm({
    mode: "onChange",
    defaultValues: {
      cover: null,
    },
  });

  const queryClient = useQueryClient();

  async function editProfileImg(values) {
    console.log(values);
    try {
      const formData = new FormData();
      formData.append("photo", values.photo[0]);
      const response = await axios.put(
        `https://route-posts.routemisr.com/users/upload-photo`,
        formData,
        getHeaders(),
      );
      await getLoggedData();
      queryClient.invalidateQueries(["userPost"]);
      queryClient.invalidateQueries(["allPosts"]);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  console.log(userData);

  async function addCover(values) {
    console.log(values);
    try {
      const formData = new FormData();
      formData.append("cover", values.cover[0]);
      const response = await axios.put(
        "https://route-posts.routemisr.com/users/upload-cover",
        formData,
        getHeaders(),
      );
      await getLoggedData();
      queryClient.invalidateQueries(["userPost"]);
      queryClient.invalidateQueries(["allPosts"]);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="relative">
        {/* Cover */}
        <div className="h-56 rounded-3xl bg-gradient-to-r from-slate-800 to-blue-400 relative cursor-pointer">
          <form
            className="absolute top-8 right-8"
            onChange={handleSubmitCover(addCover)}
          >
            <input
              type="file"
              id="cover"
              {...registerCover("cover")}
              className="hidden"
            />
            <label
              htmlFor="cover"
              class="pointer-events-auto cursor-pointer inline-flex items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
            >
              Cover
            </label>
          </form>
          <PhotoProvider>
            <PhotoView src={userData?.cover}>
              {userData?.cover && (
                <img
                  src={userData?.cover}
                  alt={userData?.name}
                  className="w-full object-cover"
                />
              )}
            </PhotoView>
          </PhotoProvider>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 -mt-20 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Left Side */}
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32 group">
                {/* Avatar Image */}
                <PhotoProvider>
                  <PhotoView src={userData?.photo}>
                    <img
                      src={userData?.photo}
                      alt={userData?.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md cursor-pointer"
                    />
                  </PhotoView>
                </PhotoProvider>

                {/* Hover Overlay */}
                <div className="absolute bottom-0 left-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-4">
                  {/* Zoom Icon */}

                  {/* Change Photo Icon */}
                  <form
                    onChange={handleSubmit(editProfileImg)}
                    className="bg-blue-500 p-2 size-10 rounded-full cursor-pointer hover:scale-110 transition"
                  >
                    <label className="">
                      <FaCamera className="text-white text-lg" />
                      <input
                        type="file"
                        className="hidden"
                        {...register("photo")}
                      />
                    </label>
                  </form>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold">{userData?.name}</h2>
                <p className="text-gray-500">
                  @{userData?.name?.toLowerCase()}
                </p>

                <span className="inline-block mt-3 px-4 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
                  Route Posts member
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
              <div className="bg-gray-100 p-5 rounded-2xl text-center">
                <p className="text-sm text-gray-500">FOLLOWERS</p>
                <p className="text-3xl font-bold">{userData?.followersCount}</p>
              </div>

              <div className="bg-gray-100 p-5 rounded-2xl text-center">
                <p className="text-sm text-gray-500">FOLLOWING</p>
                <p className="text-3xl font-bold">{userData?.followingCount}</p>
              </div>

              <div className="bg-gray-100 p-5 rounded-2xl text-center">
                <p className="text-sm text-gray-500">BOOKMARKS</p>
                <p className="text-3xl font-bold">{userData?.bookmarksCount}</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {/* About */}
            <div className="lg:col-span-2 bg-gray-50 p-6 rounded-2xl border">
              <h4 className="font-semibold mb-4">About</h4>
              <p className="text-gray-600">{userData?.email}</p>
              <p className="text-gray-600 mt-2">Active on Route Posts</p>
            </div>

            {/* Right Boxes */}
            <div className="space-y-4">
              <div className="bg-blue-50 p-6 rounded-2xl border">
                <p className="text-sm text-blue-700 font-semibold">MY POSTS</p>
                <p className="text-3xl font-bold">
                  {data?.data?.posts?.length || 0}
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-2xl border">
                <p className="text-sm text-blue-700 font-semibold">
                  SAVED POSTS
                </p>
                <p className="text-3xl font-bold">{userData?.bookmarksCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
