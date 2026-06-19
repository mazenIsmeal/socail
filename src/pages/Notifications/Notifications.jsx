import React, { useContext, useState } from "react";
import { getHeaders } from "../../Helpers/Headers";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Contexts/AuthContextProvider";
import { Link } from "react-router-dom";

export default function Notifications() {
  const queryClient = useQueryClient();
  const [showUnread, setShowUnread] = useState(false);
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["notifications", showUnread],
    queryFn: () => getNotifications(showUnread),
  });

  async function getNotifications(showUnread) {
    try {
      // if showUnread is true, fetch only unread notifications, otherwise fetch all notifications
      const url = showUnread
    ? "https://route-posts.routemisr.com/notifications?unread=true"
    : "https://route-posts.routemisr.com/notifications";
      const response = await axios.get(
        url,
        getHeaders(),
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // Count unread notifications from the AuthContext
  const { unreadCount } = useContext(AuthContext);

  async function markAsRead(notificationId) {
    try {
      const response = await axios.patch(
        `https://route-posts.routemisr.com/notifications/${notificationId}/read`,
        null,
        getHeaders(),
      );
      console.log(response.data);
      // update the notifications query to reflect the changes
      queryClient.invalidateQueries(["notifications"]);
    } catch (error) {
      console.log(error);
    }
  }

  async function markAllAsRead() {
    try {
      const response = await axios.patch("https://route-posts.routemisr.com/notifications/read-all", null, getHeaders());
      console.log(response.data);
      // update the notifications query to reflect the changes
      queryClient.invalidateQueries(["notifications"]);
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl mt-20">
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                Notifications
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Realtime updates for likes, comments, shares, and follows.
              </p>
            </div>
              <button onClick={markAllAsRead} className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={15}
                height={15}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check-check"
                aria-hidden="true"
              >
                <path d="M18 6 7 17l-5-5" />
                <path d="m22 10-7.5 7.5L13 16" />
              </svg>
              Mark all as read
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:items-center">
            <button
              onClick={() => setShowUnread(false)}
              type="button"
              className={showUnread ? 'rounded-full px-4 py-1.5 text-sm font-bold transition bg-slate-100 text-white' : 'rounded-full px-4 py-1.5 text-sm font-bold transition bg-[#1877f2] text-white'}
            >
              All
            </button>
            <button
              onClick={() => setShowUnread(true)}
              type="button"
              className={showUnread ? 'rounded-full px-4 py-1.5 text-sm font-bold transition bg-[#1877f2] text-white' : 'rounded-full px-4 py-1.5 text-sm font-bold transition bg-slate-100 text-white'}
            >
              Unread
              {unreadCount?.data?.unreadCount > 0 && (
                <span className="rounded-full px-2 py-0.5 text-xs bg-white text-[#1877f2]">
                  {unreadCount?.data?.unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="space-y-2 p-3 sm:p-4">
          {isLoading && <p className="text-center font-bold">Loading..</p>}
          {isFetched &&
            data?.data?.notifications.map((item) => (
              <article
                key={item._id}
                className="group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-[#dbeafe] bg-[#edf4ff]"
              >
                <div className="relative shrink-0">
                  <button type="button" className="block cursor-pointer">
                    <img
                      alt={item.actor.name}
                      className="h-11 w-11 rounded-full object-cover"
                      src={item.actor.photo}
                    />
                  </button>
                  <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white text-[#1877f2]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={15}
                      height={15}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-message-circle"
                      aria-hidden="true"
                    >
                      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                    </svg>
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    to={`userProfile/${item.actor._id}`}
                    className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2"
                  >
                    <p className="text-sm leading-6 text-slate-800">
                      <button
                        type="button"
                        className="font-extrabold hover:text-[#1877f2] hover:underline"
                      >
                        {item.actor.name}
                      </button>{" "}
                      {(item.type === "like" && "liked your post.") ||
                        (item.type === "comment" &&
                          "commented on your post.") ||
                        (item.type === "follow" && "started following you.")}
                    </p>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-xs font-semibold text-slate-500">
                        7d
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-dot text-[#1877f2]"
                        aria-hidden="true"
                      >
                        <circle cx="12.1" cy="12.1" r={1} />
                      </svg>
                    </div>
                  </Link>
                  <p className="mt-0.5 text-sm text-slate-600">
                    {item.entity.body}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    {item.isRead ? (
                      <>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={13}
                              height={13}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-check"
                              aria-hidden="true"
                            >
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                            Read
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => markAsRead(item._id)}
                          className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-bold text-[#1877f2] ring-1 ring-[#dbeafe] transition hover:bg-[#e7f3ff]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={13}
                            height={13}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-check"
                            aria-hidden="true"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          Mark as read
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </article>
            ))}
        </div>
      </section>
    </>
  );
}
