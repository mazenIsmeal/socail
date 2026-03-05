import React from "react";
import Skeleton from "react-loading-skeleton";

export default function CommentsSkeleton({ count = 3 }) {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="bg-gray-100 my-5 p-2 rounded-2xl">
            <div className="flex items-center gap-2.5">
              {/* avatar */}
              <Skeleton circle width={40} height={40} />

              <div className="flex-1">
                {/* name */}
                <Skeleton width={120} height={15} />

                {/* time */}
                <Skeleton width={80} height={10} className="mt-1" />

                {/* comment content */}
                <Skeleton count={2} height={20} className="mt-2" />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
