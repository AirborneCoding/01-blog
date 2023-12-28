import React from "react";
import { FaThumbsUp, MdDelete, MdOutlineQuickreply } from "../../../assets/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDeleteCommentMutation } from "../../../redux/services/commentsServices"
import { useSelector } from "react-redux"

const Comments = ({ comments }) => {
  const { user } = useSelector(state => state.auth)


  const [deleteComment] = useDeleteCommentMutation()

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment({ id: commentId });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // console.log(user);
  return <div className="mt-8" >
    <h3 className="text-xl font-semibold">All Comments:</h3>
    <hr className="mb-4" />
    {
      comments?.slice().reverse().map((comment) => {
        const createdDate = moment(comment?.createdAt).startOf().fromNow()

        return <div key={comment._id}>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Link to={`/profile/${comment?.user?.username}`}>
                  <img src={comment?.user?.avatar?.url} loading="lazy" />
                </Link>
              </div>
            </div>
            <div className="chat-header">
              <Link to={`/author/${comment?.user?._id}`} className="hover:underline"> {comment?.user?.username}</Link>
              <time className="text-xs opacity-50 ml-1.5">{createdDate}</time>
            </div>
            <div className="chat-bubble bg-gray-300">{comment?.text}</div>
          </div>
          <div className="flex space-x-2 mt-4">
            <span><FaThumbsUp size={15} className="text-blue-700" /> {comment?.likes?.length}  </span>
            {
              user?.name === comment?.user?.username && (
                <span onClick={() => handleDeleteComment(comment._id)} ><MdDelete size={15} className="text-red-500 cursor-pointer" /> </span>
              )
            }
          </div>
        </div>
      })
    }
  </div>
};

export default Comments;
