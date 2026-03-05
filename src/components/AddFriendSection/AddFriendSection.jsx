import React, { useState } from "react";
import { Button, Avatar } from "flowbite-react";
import { FaUserFriends } from "react-icons/fa";
import axios from "axios";
import { headerObjData } from "../../Helpers/Headers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import SuggestedFriendsSkeleton from "./SuggestedFriendsSkeleton/SuggestedFriendsSkeleton";

export default function AddFriendSection({ isMobile = false }) {
  const queryClient = useQueryClient();
  const [showList, setShowList] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const { data, isLoading, isFetched } = useQuery({
    queryFn: getSuggestedFriends,
    queryKey: ["allFriends"],
  });

  async function getSuggestedFriends() {
    try {
      const { data } = await axios.get(
        "https://route-posts.routemisr.com/users/suggestions?limit=10",
        headerObjData,
      );
      console.log(data.data.suggestions);
      return data.data.suggestions;
    } catch (error) {
      console.log(error);
    }
  }

  function addFriend(id) {
    console.log(id);
    try {
      const response = axios.put(
        `https://route-posts.routemisr.com/users/${id}/follow`,
        {},
        headerObjData,
      );
      queryClient.invalidateQueries(["allFriends"]);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const { mutate } = useMutation({
    mutationFn: addFriend,
    onSuccess: () => {
      queryClient.invalidateQueries(["allFriends"]);
      setLoadingId(null);
    },
    onError: () => {
      setLoadingId(null);
    },
  });

  if (isMobile) {
    // نسخة الموبايل: Button + dropdown
    return (
      <div className="bg-white rounded-2xl shadow p-4 w-64 mx-auto text-center">
        <button
          onClick={() => setShowList(!showList)}
          className="bg-blue-500 text-white px-4 py-2 rounded-2xl w-full"
        >
          Suggested Friends
        </button>

        {showList && (
          <div className="mt-2 max-h-80 overflow-y-auto space-y-2">
            {isLoading && <SuggestedFriendsSkeleton />}
            {isFetched &&
              data?.map((friend) => (
                <div
                  className="border border-gray-100 p-2 rounded-xl flex items-center justify-between"
                  key={friend._id}
                >
                  <Link
                    to={`userProfile/${friend._id}`}
                    className="flex items-center gap-2"
                  >
                    <Avatar img={friend.photo} rounded />
                    <div>
                      <h5 className="text-sm">{friend.name}</h5>
                      <span className="text-xs text-gray-500">
                        {friend.username}
                      </span>
                    </div>
                  </Link>
                  <Button
                    size="xs"
                    onClick={() => {
                      setLoadingId(friend._id);
                      mutate(friend._id);
                    }}
                    disabled={loadingId === friend._id}
                  >
                    {loadingId === friend._id ? "Following..." : "Follow"}
                  </Button>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow sticky top-[60px]">
      <h3 className="font-semibold mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FaUserFriends className="text-blue-500 text-xl" />
          Suggested Friends
        </div>
        <div className="bg-gray-100 size-8 rounded-full text-center flex items-center justify-center text-neutral-500">
          {data?.length}
        </div>
      </h3>
      {isLoading && <SuggestedFriendsSkeleton />}
      {isFetched &&
        data?.map((friend) => (
          <div className="border border-gray-100 p-2 my-2" key={friend._id}>
            <div className="user flex items-center justify-between gap-2">
              <Link
                to={`userProfile/${friend._id}`}
                className="flex items-center gap-2"
              >
                <img
                  src={friend.photo}
                  alt={friend.name}
                  className="size-8 rounded-full"
                />
                <div>
                  <h5 className="text-sm">{friend.name}</h5>
                  <span className="text-sm">{friend.username}</span>
                </div>
              </Link>
              <Button
                onClick={() => {
                  setLoadingId(friend._id);
                  mutate(friend._id);
                }}
                disabled={loadingId === friend._id}
                className="cursor-pointer"
              >
                {loadingId === friend._id ? "Following..." : "Follow"}
              </Button>
            </div>
            <span className="text-sm bg-gray-100 rounded-2xl p-0.5 text-neutral-500">
              {friend.followersCount} follows
            </span>
          </div>
        ))}
    </div>
  );
}
