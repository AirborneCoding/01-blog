import { Link } from "react-router-dom";
import { FaThumbsUp, FaComment, FaEye } from '@/assets/icons';
import Header from "./Header";
import img from "/default.png"
import Comments from "./Comments";
import AddComment from "./AddComment";
import { formatDate } from "@/utils";
import { Loading } from "@/helpers";

const PostDetails = (props) => {
  window.scroll(0, 100)
  const {
    user,
    handleLikePost,
    post,
    postError,
    postLoader,
    comments,
    commentsLoader,
    isCommentError,
    addCommentLoader,
    addCommentError,
    submitComment,

  } = props



  const isLiked = post?.likes.includes(user?.id);
  const formatedDate = formatDate(post?.createdAt)
  return (
    <article>
      {/* HEADER */}
      <Header
        user={post?.user}
        formatedDate={formatedDate}
        category={post?.category}
      />

      {/* CONTENT */}
      <div className="">
        <h4 className="my-4">
          {post?.title}
        </h4>
        <img
          src={post?.image?.url || img}
          alt={post?.title}
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>

      <div className="flex space-x-2 justify-between my-3">
        <div className="flex space-x-2">

          {
            user
              ? <button
                className="inline-flex"
                onClick={() => {
                  handleLikePost(post?._id, "like")
                }}
              >
                <FaThumbsUp className={`mr-0.5 ${isLiked ? "text-blue-700" : "text-gray-500"}`}
                />
                {post?.likes?.length || 0}
              </button>
              : <Link to="/login" className="inline-flex">
                <FaThumbsUp className={`mr-0.5 ${isLiked ? "text-blue-700" : "text-gray-500"}`}
                />
                {post?.likes?.length || 0}
              </Link>
          }
          <div className="flex items-center space-x-2">
            <FaComment /> <span>{comments?.length || 0}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FaEye /> <span>{post?.viewsCount || 0}</span>
        </div>
      </div>

      <hr className="text-black" />

      <div
        className="mt-3 leading-7"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      >
      </div>

      {/* COMMENTS */}
      <section>
        <AddComment
          user={user}
          comments={comments}
          submitComment={submitComment}
          addCommentLoader={addCommentLoader}
        />

        {
          comments?.length > 0
            ? (
              <Comments
                comments={comments}
              />
            )
            : (
              <div className="text-center mt-5 bg-gray-100 w-fit mx-auto px-3">
                Add first comment
              </div>
            )

        }
      </section>


    </article>
  );
};

export default PostDetails;
