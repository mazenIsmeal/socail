import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PostCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Skeleton circle width={40} height={40} />
        <div className="flex-1">
          <Skeleton width={120} height={15} />
          <Skeleton width={80} height={12} />
        </div>
      </div>

      {/* Text */}
      <Skeleton count={3} />

      {/* Image */}
      <Skeleton height={200} className="rounded-xl" />

      {/* Actions */}
      <div className="flex justify-between pt-3">
        <Skeleton width={80} />
        <Skeleton width={80} />
        <Skeleton width={80} />
      </div>
    </div>
  );
}
