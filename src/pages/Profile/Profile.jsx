import React, { useContext, useState } from "react";
import { Button, TextInput, Avatar } from "flowbite-react";
import PostCard from "./../../components/PostCard/PostCard";
import { AuthContext } from "../../Contexts/AuthContextProvider";
import usePosts from "../../CustomHooks/usePosts";
import PostCardSkeleton from "../../components/PostCard/PostCardSkeleton/PostCardSkeleton";
import AddPost from "../../components/AddPost/AddPost";
import CommentWrapper from "../../components/CommentWrapper/CommentWrapper";
import ProfileCover from "../../components/ProfileCover/ProfileCover";

export default function ProfilePage() {
  const { userData } = useContext(AuthContext);
  const { data, isLoading, isFetched } = usePosts(
    ["userPost"],
    Boolean(userData?._id),
    `users/${userData?._id}/posts`,
  );
  // const [isOpen, setIsOpen] = useState(false);
  // const handleClose = () => setIsOpen(false);
  const [activePostId, setActivePostId] = useState();
  const [editPost, setEditPost] = useState();

  console.log(data?.data?.posts.length);
  console.log(userData);

  return (
    <div className="min-h-screen bg-gray-100 my-20">
      <title>Profile</title>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <AddPost editPost={editPost} />
        {/* Profile Header */}
        {/* <div className="bg-white p-6 rounded-2xl shadow text-center">
          <img
            src={userData?.photo}
            alt={userData?.name}
            className="size-50 m-auto"
          />
          <div>
            <h2>{userData?.name}</h2>
            <p>{userData?.email}</p>
          </div>
          <Button size="xs">Change Profile Picture</Button>
        </div> */}
        {/* Profile Section */}
        <ProfileCover data={data} />
        {/* My Posts */}
        <div className="space-y-6">
          {(isLoading || Boolean(userData?._id) == false) && (
            <PostCardSkeleton />
          )}
          {data?.data?.posts?.length === 0 ? (
            <>
              <p class="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
                No posts yet. Be the first one to publish.
              </p>
            </>
          ) : (
            <>
              {isFetched &&
                data.data.posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    setActivePostId={setActivePostId}
                    isProfile
                    setEditPost={setEditPost}
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
