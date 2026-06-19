import React, { useState } from "react";
import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import axios from "axios";
import { getHeaders } from "../../Helpers/Headers";
import { useQuery } from "@tanstack/react-query";
import CommentsSkeleton from "../CommentsSkeleton/CommentsSkeleton";
import Comments from "../Comments/Comments";
import AddComment from "../AddComment/AddComment";
// handleClose, isOpen,
export default function CommentWrapper({ activePostId }) {
  console.log(activePostId);

  const { data, isLoading, isFetched } = useQuery({
    queryFn: getCommentsPost,
    queryKey: ["commentsPost", activePostId],
    enabled: Boolean(activePostId),
  });

  const [commentUpdate, setCommentUpdate] = useState();

  async function getCommentsPost() {
    try {
      const response = await axios.get(
        `https://route-posts.routemisr.com/posts/${activePostId}/comments?page=1&limit=10`,
        getHeaders(),
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* <Drawer
        open={isOpen}
        onClose={handleClose}
        position="top"
        className="overflow-auto"
      >
        <DrawerHeader title="comments" />
        {isLoading && <CommentsSkeleton count={4} />}
        <DrawerItems>
          {data?.data?.data?.comments?.length === 0 ? (
            <>
              <p className="text-center bg-gray-100 rounded-2xl">
                no comment yet
              </p>
            </>
          ) : (
            <>
              {isFetched &&
                data.data.data.comments?.map((comment) => (
                  <>
                    <Comments
                      comment={comment}
                      setCommentUpdate={setCommentUpdate}
                      activePostId={activePostId}
                    />
                  </>
                ))}
            </>
          )}
          <AddComment
            activePostId={activePostId}
            commentUpdate={commentUpdate}
          />
        </DrawerItems>
      </Drawer> */}
      <div className="">
        {isLoading && <CommentsSkeleton count={4} />}

        {data?.data?.data?.comments?.length === 0 ? (
          <p className="text-center bg-gray-100 rounded-2xl p-2">
            no comment yet
          </p>
        ) : (
          isFetched &&
          data.data.data.comments?.map((comment) => (
            <Comments
              key={comment._id}
              comment={comment}
              setCommentUpdate={setCommentUpdate}
              activePostId={activePostId}
            />
          ))
        )}

        <AddComment activePostId={activePostId} commentUpdate={commentUpdate} />
      </div>
    </>
  );
}
