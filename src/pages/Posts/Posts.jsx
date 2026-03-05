import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import PostCard from "../../components/PostCard/PostCard";
import AddFriendSection from "../../components/AddFriendSection/AddFriendSection";
import AddPost from "../../components/AddPost/AddPost";
import PostCardSkeleton from "../../components/PostCard/PostCardSkeleton/PostCardSkeleton";
import { useState } from "react";
import axios from "axios";
import { headerObjData } from "../../Helpers/Headers";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";

export default function Posts() {
  const [editPost, setEditPost] = useState();
  const [feed, setFeed] = useState("following");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["feedPost", feed],
      queryFn: getFeedPost,
      getNextPageParam: (lastPage) => {
        return lastPage.pagination?.nextPage ?? undefined;
      },
    });

  const allPosts = data?.pages?.flatMap((page) => page.posts) ?? [];

  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    const currentRef = observerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  // async function getFeedPost({ pageParam = 1 }) {
  //   try {
  //     if (feed === "saved") {
  //       const response = await axios.get(
  //         "https://route-posts.routemisr.com/users/bookmarks",
  //         headerObjData,
  //       );

  //       return {
  //         ...response,
  //         data: {
  //           ...response.data,
  //           data: {
  //             posts: response.data.data.bookmarks,
  //           },
  //         },
  //       };
  //     }

  //     const response = await axios.get(
  //       `https://route-posts.routemisr.com/posts/feed?only=${feed}&page=${pageParam}&limit=10`,
  //       headerObjData,
  //     );

  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function getFeedPost({ pageParam = 1, queryKey }) {
    const [, feedType] = queryKey;

    if (feedType === "saved") {
      const response = await axios.get(
        "https://route-posts.routemisr.com/users/bookmarks",
        headerObjData,
      );

      return {
        posts: response.data.data.bookmarks,
        pagination: response.data.meta.pagination,
      };
    }

    const response = await axios.get(
      `https://route-posts.routemisr.com/posts/feed?only=${feedType}&page=${pageParam}&limit=10`,
      headerObjData,
    );

    return {
      posts: response.data.data.posts,
      pagination: response.data.meta.pagination,
    };
  }

  return (
    <>
      <div>
        <title>Posts</title>
        <div className="min-h-screen bg-gray-100 my-20">
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-4">
            {/* Left Sidebar */}
            <div className="col-span-3 hidden lg:block">
              <LeftSidebar setFeed={setFeed} />
            </div>

            {/* Posts Section */}
            <div className="col-span-12 lg:col-span-6 space-y-6">
              <div className="lg:hidden mb-4">
                <LeftSidebar setFeed={setFeed} />
              </div>
              <AddPost editPost={editPost} />
              {isLoading && <PostCardSkeleton />}
              {!isLoading && allPosts.length === 0 && (
                <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-500">
                  No data yet
                </div>
              )}

              {allPosts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  feed={feed}
                  setEditPost={setEditPost}
                />
              ))}
              <div ref={observerRef} className="h-10">
                {isFetchingNextPage && <PostCardSkeleton />}
              </div>
            </div>

            {/* Add Friend Section */}
            <div className="col-span-3 hidden lg:block">
              <AddFriendSection />
            </div>
            <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
              <AddFriendSection isMobile />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
