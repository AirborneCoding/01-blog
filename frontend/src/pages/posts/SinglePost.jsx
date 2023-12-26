
// import { PostDetails, SimilarPosts } from "@/components";
import { useOutletContext } from "react-router-dom"
import usePostDetails from "@/hooks/posts/usePostDtails";
import { useHandleLikeMutation } from "@/redux/services/postsServices";
import { PostDetails, SimilarPosts } from "@/components";
import { Error } from "@/errors"

const SinglePost = () => {
  window.scrollTo(0, 100)
  const { user } = useOutletContext()

  const {
    useFetchSinglePostQuery,
    singlePost,
    postError, postErrorData,
    postLoader,
    // comments
    comments,
    commentsLoader,
    isCommentError,
    addCommentLoader,
    addCommentError,
    submitComment,
    // similare posts
    similarPosts,
    similarPostsError,
    similarPostsLoader
  } = usePostDetails()


  const [like] = useHandleLikeMutation()

  const handleLikePost = async (id) => {
    try {
      await like({ id })
    } catch (error) {
      console.log(error);
    }
  }

  if (postError || isCommentError || similarPostsError) {
    return <Error status={postErrorData} />
  }



  return <>
    <main className="body-container my-16 py-10 flex flex-col lg:flex-row justify-between lg:space-x-5 space-x-0 space-y-5 lg:space-y-0">
      <section className="flex-grow lg:ml-5 order-1 lg:order-1">
        <PostDetails
          user={user}
          handleLikePost={handleLikePost}
          post={singlePost}
          postError={postError}
          postLoader={postLoader}
          comments={comments}
          commentsLoader={commentsLoader}
          isCommentError={isCommentError}
          addCommentLoader={addCommentLoader}
          addCommentError={addCommentError}
          submitComment={submitComment}
        />
      </section>
      <section className="mt-8 lg:mt-0 lg:w-1/3 flex-shrink-0 order-1 lg:order-2 lg:border-l lg:pl-2">
        <SimilarPosts
          similarPosts={similarPosts}
          similarPostsError={similarPostsError}
          similarPostsLoader={similarPostsLoader}
        />
      </section>
    </main>
  </>
};

export default SinglePost;
