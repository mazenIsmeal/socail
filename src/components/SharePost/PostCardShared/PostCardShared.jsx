import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import React from "react";
import { Link } from "react-router-dom";
import PostAction from "../../PostAction/PostAction";
import PostMenu from "../../PostMenu/PostMenu";
import EditPost from './../../EditPost/EditPost';
import { PhotoProvider, PhotoView } from "react-photo-view";

export default function PostCardShared({ post, feed,updatePostId, setUpdatePostId }) {
      const result = formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: true,
      });
  return (
    <>
      <div className="border rounded-2xl p-4 bg-white">
        {/* Share Owner */}
        <div className="flex items-start gap-3">
          <PhotoProvider>
            <PhotoView src={post.user.photo}>
              <img
                src={post.user.photo}
                alt={post.user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            </PhotoView>
          </PhotoProvider>

          <Link to={`userProfile/${post.user._id}`} className="flex-1">
            <h3 className="font-semibold">{post.user.name}</h3>
            <p>{result}</p>
          </Link>
          <PostMenu post={post}  feed={feed} setUpdatePostId={setUpdatePostId}/>
        </div>

        {/* Share Caption */}
        {post.body && updatePostId === post._id ? (
                        <EditPost post={post} setUpdatePostId={setUpdatePostId} />
                      ) : (
                        <p className="mb-4">{post.body}</p>
                      )}

        {/* Original Post */}
        {post.sharedPost && (
          <div className="my-5 border rounded-2xl p-4 bg-gray-50">
            <div className="flex items-start gap-3">
            <PhotoProvider>
              <PhotoView src={post.sharedPost.user.photo}>
              <img
                src={post.sharedPost.user.photo}
                alt={post.sharedPost.user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              </PhotoView>
            </PhotoProvider>
              

              <Link to={`userProfile/${post.user._id}`} className="flex-1">
                <h4 className="font-semibold">{post.sharedPost.user.name}</h4>

                <p className="text-sm text-gray-500">
                  @{post.sharedPost.user.username}
                </p>
              </Link>

              {/* <span className="text-blue-600 text-sm font-medium">
                Original Post
              </span> */}
            </div>

            <p className="my-4 text-gray-800">{post.sharedPost.body}</p>

            {post.sharedPost.image && (
              <PhotoProvider>
                <PhotoView src={post.sharedPost.image}>
                <img
                src={post.sharedPost.image}
                alt=""
                className="w-full rounded-xl mt-4"
              />
                </PhotoView>
              </PhotoProvider>
              
            )}
          </div>
        )}
        <PostAction post={post} />
      </div>
    </>
  );
}
