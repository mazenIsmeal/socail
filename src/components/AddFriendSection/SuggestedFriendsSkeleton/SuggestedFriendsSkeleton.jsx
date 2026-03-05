import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SuggestedFriendsSkeleton() {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="border border-gray-100 p-2 my-2 rounded-xl"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Skeleton circle width={32} height={32} />
                <div>
                  <Skeleton width={80} height={10} />
                  <Skeleton width={60} height={10} />
                </div>
              </div>
              <Skeleton width={60} height={30} />
            </div>
            <Skeleton width={100} height={10} className="mt-2" />
          </div>
        ))}
    </>
  );
}
