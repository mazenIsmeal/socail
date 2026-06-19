import axios from "axios";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Textarea,
} from "flowbite-react";
import { useState } from "react";
import { getHeaders } from "../../Helpers/Headers";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import usePosts from "../../CustomHooks/usePosts";
import PostCard from "../PostCard/PostCard";

export default function SharePost({ openModal, setOpenModal, postId }) {
  const [values, setValues] = useState("");
  const queryClient = useQueryClient();
  const { data, isFetched } = usePosts(
    ["singlePost", postId],
    true,
    `posts/${postId}`,
  );

    const { mutate, data: shareData } = useMutation({
    mutationFn: handleShare,
    onSuccess: (shareData) => {
      queryClient.invalidateQueries(["userPost"]);
      queryClient.invalidateQueries(["allPosts"]);
      toast.success("Successfully Shared!");
      console.log(shareData, "share");
    },
    onError: () => {
      toast.error("error some thing");
    },
  });

  async function handleShare() {
     const res = await axios.post(
        `https://route-posts.routemisr.com/posts/${postId}/share`,
        {
          body: values,
        },
        getHeaders(),
      );
      setOpenModal(false);
      return res.data;
  }

  return (
    <>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Share Post</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <form className="max-w-md w-full">
              <div className="mb-2 block">
                <Label htmlFor="comment">Your message</Label>
              </div>
              <Textarea
                id="comment"
                placeholder="Leave a comment..."
                onChange={(e) => setValues(e.target.value)}
                rows={4}
                className="mb-2 resize-none w-full"
              />
            </form>
            {isFetched && <PostCard post={data.data.post} />}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={mutate}>Share</Button>
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
