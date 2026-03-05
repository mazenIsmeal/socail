import React from "react";

export default function LeftSidebar({ setFeed }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow sticky top-[60px]">
      <h3 className="font-semibold mb-4">Menu</h3>
      <ul className="space-y-2 text-gray-600">
        <li
          className="hover:text-blue-600 cursor-pointer"
          onClick={() => setFeed("following")}
        >
          Feed
        </li>
        <li
          className="hover:text-blue-600 cursor-pointer"
          onClick={() => setFeed("me")}
        >
          My Posts
        </li>
        <li
          className="hover:text-blue-600 cursor-pointer"
          onClick={() => setFeed("all")}
        >
          Community
        </li>
        <li
          className="hover:text-blue-600 cursor-pointer"
          onClick={() => setFeed("saved")}
        >
          Saved
        </li>
      </ul>
    </div>
  );
}

// https://route-posts.routemisr.com/users/search?page=1&limit=20&q={{nameSearch}}
